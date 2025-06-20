import './globals.css';

export const metadata = {
  title: 'Postify',
  description: 'Professional blog platform built with Next.js and PostgreSQL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
