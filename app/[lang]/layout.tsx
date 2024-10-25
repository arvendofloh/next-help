import "./globals.css";
import { Roboto } from "next/font/google";
import Navigation from "@/components/navigation/navigation";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

const getMeta = async () => {
  return directus.request(readItems("meta"));
};

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
        <Navigation locale={lang} />
        <div className="pt-10">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
