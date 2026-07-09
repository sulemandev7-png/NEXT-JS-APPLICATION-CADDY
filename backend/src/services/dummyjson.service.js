import { httpClient } from "../utils/httpClient.js";

function cleanProduct(product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    stock: product.stock,
    brand: product.brand,
    category: product.category,
    thumbnail: product.thumbnail,
    images: product.images,
  };
}

function cleanUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    image: user.image,
    token: user.token,
  };
}

function cleanCart(cart) {
  return {
    id: cart.id,
    userId: cart.userId,
    total: cart.total,
    discountedTotal: cart.discountedTotal,
    totalProducts: cart.totalProducts,
    totalQuantity: cart.totalQuantity,
    products: (cart.products || []).map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      total: item.total,
      discountPercentage: item.discountPercentage,
      discountedTotal: item.discountedTotal,
      thumbnail: item.thumbnail,
    })),
  };
}

export async function fetchProducts({ search, category, limit = 12, skip = 0 }) {
  let url = `/products?limit=${limit}&skip=${skip}`;

  if (search) {
    url = `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else if (category) {
    url = `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  }

  const { data } = await httpClient.get(url);
  return {
    products: (data.products || []).map(cleanProduct),
    total: data.total || 0,
    skip: data.skip || skip,
    limit: data.limit || limit,
  };
}

export async function fetchProductById(id) {
  const { data } = await httpClient.get(`/products/${id}`);
  return cleanProduct(data);
}

export async function fetchCategories() {
  const { data } = await httpClient.get("/products/category-list");
  return data;
}

export async function loginUser({ username, password }) {
  const { data } = await httpClient.post("/auth/login", {
    username,
    password,
  });
  return cleanUser(data);
}

export async function fetchUserCart(userId) {
  const { data } = await httpClient.get(`/carts/user/${userId}`);
  return cleanCart(data.carts?.[0] || { id: null, userId, products: [] });
}
