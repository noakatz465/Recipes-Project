'use client'
// _app.js או _app.tsx
// import '../styles/globals.css'; // ודא שהנתיב נכון

import Header from "../components/Header";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/> 
        {children}
      </body>
    </html>
  );
}
