"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userCart, setUserCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }

    const userData = JSON.parse(stored);
    setUser(userData);

    // Fetch user's cart data from DummyJSON
    fetch(`https://dummyjson.com/carts/user/${userData.id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserCart(data.carts?.[0] || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  // Logout handler
  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-400 text-lg">
            Loading dashboard...
          </div>
        </main>
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center gap-4">
            {user.image && (
              <Image
                src={user.image}
                alt={user.firstName}
                width={64}
                height={64}
                className="rounded-full border-2 border-white/30"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {user.firstName}!
              </h1>
              <p className="text-indigo-100">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Account Status"
            value="Active"
            icon="✓"
            color="green"
          />
          <StatCard
            title="Cart Items"
            value={userCart?.totalProducts || 0}
            icon="🛒"
            color="blue"
          />
          <StatCard
            title="Cart Total"
            value={`$${userCart?.total || 0}`}
            icon="💰"
            color="purple"
          />
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow label="Full Name" value={`${user.firstName} ${user.lastName}`} />
            <InfoRow label="Username" value={user.username} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Gender" value={user.gender} />
          </div>
        </div>

        {/* Cart Preview */}
        {userCart && userCart.products?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Your Cart
            </h2>
            <div className="space-y-3">
              {userCart.products.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ${item.total}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
              <span className="font-semibold text-gray-700">Total</span>
              <span className="font-bold text-lg text-indigo-600">
                ${userCart.total}
              </span>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

// Reusable stat card component
function StatCard({ title, value, icon, color }) {
  const colorMap = {
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <span
          className={`text-2xl w-12 h-12 flex items-center justify-center rounded-full ${colorMap[color]}`}
        >
          {icon}
        </span>
      </div>
    </div>
  );
}

// Reusable info row
function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
