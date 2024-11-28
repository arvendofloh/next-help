export const metadata = {
  title: "imc Express help center",
  description: "Everything everywhere all at one",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
