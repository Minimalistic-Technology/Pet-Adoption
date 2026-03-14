"use client";

import "./globals.css";
import { AuthProvider } from "./Context/AuthContext";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import { FavoritesProvider } from "./Context/FavoritesContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* usePathname() (from Next.js) gives you the current URL path.

    For example:

    If user is on http://localhost:3000/login → pathname = "/login"
 */
  const pathname = usePathname();

  //  defines pages where navabr will not be visisble
  const hideNavbar = ["/Login", "/Signup","/Admin"];

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <FavoritesProvider>
            {/* If pathname = "/login", then hideNavbarRoutes.includes("/login") →
          true. after ! it becomes false. */}
            {!hideNavbar.includes(pathname) && <Navbar />}
            {children}
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
