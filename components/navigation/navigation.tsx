import Link from "next/link";
import PaddingContainer from "../layout/padding-container";
import { getDictionary } from "@/lib/getDictionary";
import NavLink from "./navLink";
import MailLink from "./mailLink";

const Navigation = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);

  return (
    <PaddingContainer>
      <nav className="py-6 flex items-center justify-between flex-wrap print:hidden print:py-0">
        <Link href="/">
          <div
            className="bg-logo-white bg-no-repeat bg-contain"
            style={{ width: 92 + "px", height: 40 + "px" }}
          ></div>
        </Link>
        <label htmlFor="menu-toggle" className="cursor-pointer lg:hidden block">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />
        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full gap-4 main-nav"
          id="menu"
        >
          <ul className="text-xl text-center items-center gap-x-5 pt-4 md:gap-x-4 lg:text-lg lg:flex lg:pt-0">
            <li className="my-4 md:my-0">
              <NavLink href={`/${locale}/tutorials`}>
                {dictionary.navigation.links.tutorials}
              </NavLink>
            </li>
            <li className="my-4 md:my-0">
              <NavLink href={`/${locale}/release-notes`}>
                {dictionary.navigation.links.releasenotes}
              </NavLink>
            </li>
            <li className="my-4 md:my-0">
              <NavLink href={`/${locale}/faq`}>
                {dictionary.navigation.links.faq}
              </NavLink>
            </li>
            <li className="my-4 md:my-0">
              <MailLink mailto="mailto:express-support@im-c.com">
                {dictionary.navigation.links.contact}
              </MailLink>
            </li>
          </ul>
        </div>
      </nav>
    </PaddingContainer>
  );
};

export default Navigation;
