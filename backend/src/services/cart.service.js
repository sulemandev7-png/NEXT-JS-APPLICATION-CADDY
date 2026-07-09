import { randomUUID } from "node:crypto";

const carts = new Map();

function createEmptyCart(userId) {
  return {
    id: randomUUID(),
    userId,
    products: [],
    totalProducts: 0,
    totalQuantity: 0,
    total: 0,
    discountedTotal: 0,
  };
}

function recalculateCart(cart) {
  const totalProducts = cart.products.length;
  const totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.products.reduce((sum, item) => sum + item.total, 0);
  const discountedTotal = cart.products.reduce(
    (sum, item) => sum + (item.discountedTotal || item.total),
    0,
  );

  return {
    ...cart,
    totalProducts,
    totalQuantity,
    total,
    discountedTotal,
  };
}

export function getCart(userId) {
  if (!carts.has(String(userId))) {
    carts.set(String(userId), createEmptyCart(String(userId)));
  }

  return carts.get(String(userId));
}

export function setCart(userId, cart) {
  const normalized = recalculateCart({
    ...createEmptyCart(String(userId)),
    ...cart,
    userId: String(userId),
  });

  carts.set(String(userId), normalized);
  return normalized;
}

export function addItemToCart(userId, item) {
  const currentCart = getCart(userId);
  const existingItemIndex = currentCart.products.findIndex((product) => product.id === item.id);

  if (existingItemIndex >= 0) {
    currentCart.products[existingItemIndex] = {
      ...currentCart.products[existingItemIndex],
      quantity: currentCart.products[existingItemIndex].quantity + item.quantity,
      total: (currentCart.products[existingItemIndex].quantity + item.quantity) * item.price,
      discountedTotal:
        (currentCart.products[existingItemIndex].quantity + item.quantity) *
        (item.discountedPrice || item.price),
    };
  } else {
    currentCart.products.push({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
      discountedTotal: (item.discountedPrice || item.price) * item.quantity,
      discountPercentage: item.discountPercentage || 0,
      thumbnail: item.thumbnail,
    });
  }

  const updated = recalculateCart(currentCart);
  carts.set(String(userId), updated);
  return updated;
}

export function updateCartItem(userId, itemId, quantity) {
  const currentCart = getCart(userId);
  const productIndex = currentCart.products.findIndex((product) => product.id === itemId);

  if (productIndex === -1) {
    return currentCart;
  }

  currentCart.products[productIndex] = {
    ...currentCart.products[productIndex],
    quantity,
    total: currentCart.products[productIndex].price * quantity,
    discountedTotal:
      (currentCart.products[productIndex].discountedPrice ||
        currentCart.products[productIndex].price) * quantity,
  };

  const updated = recalculateCart(currentCart);
  carts.set(String(userId), updated);
  return updated;
}

export function clearCart(userId) {
  const empty = createEmptyCart(String(userId));
  carts.set(String(userId), empty);
  return empty;
}
