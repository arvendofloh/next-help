import Link from "next/link";
import PaddingContainer from "../layout/padding-container";
import { getDictionary } from "@/lib/getDictionary";
import NavLink from "./navLink";

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
        <nav className="main-nav">
          <ul className="flex items-center gap-4">
            <li>
              <NavLink href={`/${locale}/tutorials`}>
                {dictionary.navigation.links.tutorials}
              </NavLink>
            </li>
            <li>
              <NavLink href={`/${locale}/release-notes`}>
                {dictionary.navigation.links.releasenotes}
              </NavLink>
            </li>
            <li>
              <NavLink href={`/${locale}/faq`}>
                {dictionary.navigation.links.faq}
              </NavLink>
            </li>
            <li>
              <Link
                href={`mailto:express-support@im-c.com`}
                className="relative"
              >
                {dictionary.navigation.links.contact}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </PaddingContainer>
  );
};

export default Navigation;
