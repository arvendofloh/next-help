import Link from "next/link";
import PaddingContainer from "../layout/padding-container";
import { getDictionary } from "@/lib/getDictionary";

const Navigation = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);
  return (
    <PaddingContainer>
      <div className="py-6 flex items-center justify-between">
        <Link href="/">
          <div
            className="bg-logo-white bg-no-repeat bg-contain"
            style={{ width: 92 + "px", height: 40 + "px" }}
          ></div>
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link href={`/${locale}/tutorials`}>Tutorials</Link>
            </li>
            <li>
              <Link href={`/${locale}/release-notes`}>What&apos;s new</Link>
            </li>
            <li>
              <Link href={`/${locale}/faq`}>FAQ</Link>
            </li>
            <li>
              <a href={`mailto:express-support@im-c.com`}>
                {dictionary.navigation.links.contact}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </PaddingContainer>
  );
};

export default Navigation;
