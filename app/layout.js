import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-black text-white w-full">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
