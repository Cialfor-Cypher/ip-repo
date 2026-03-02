import React from 'react';
import '../styles/index.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Cialfor Intellectual Property',
  description: 'Cialfor Intellectual Property',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fpatentvaul7132back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.11" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.1" /></body>
    </html>
  );
}
