import "./globals.css";

// Metadata for the application
export const metadata = {
  title: "NextStore - Modern Ecommerce",
  description:
    "A Next.js ecommerce app with login, dashboard, and product browsing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
