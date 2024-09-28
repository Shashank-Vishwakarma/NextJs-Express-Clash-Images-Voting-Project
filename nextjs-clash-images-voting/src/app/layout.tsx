import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { authContext } from "@/context/AuthContext";
import { AuthContextProvider } from "@/context/AuthContextProvider";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Clash",
    description: "Get audience voting on image clashes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <AuthContextProvider>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <Toaster />
                    {children}
                </body>
            </AuthContextProvider>
        </html>
    );
}
