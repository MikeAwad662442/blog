// src/Middleware.ts watch this Layout
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ClerkProvider>
      {/* <AdminNavbar /> */}
      {children}
    </ClerkProvider>
  );
};

export default layout;
