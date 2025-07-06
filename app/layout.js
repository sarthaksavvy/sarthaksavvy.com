import Header from "./components/Header";
import FloatingChatWidget from "./components/FloatingChatWidget";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-black text-white w-full">
          <Header />
          {children}
          <FloatingChatWidget />
        </div>
      </body>
    </html>
  );
}
