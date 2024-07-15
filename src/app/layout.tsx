import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import {ThemeProvider} from "@/components/theme-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Amazing todos",
    description: "Try out all the fancy features of our todo app!",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${inter.className}`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <div className="container h-screen flex flex-col">
                <Navigation/>
                {children}
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
