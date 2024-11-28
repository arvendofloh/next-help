import "./globals.css";
import { Roboto } from "next/font/google";
import { getMeta } from "@/lib/api";
import Navigation from "@/components/navigation/navigation";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = await getMeta();

type Params = Promise<{ lang: string }>;

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) => {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className={roboto.className}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Navigation locale={lang} />
        <div className="pt-5 md:pt-10">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
