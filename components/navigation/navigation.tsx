import Link from "next/link";
import { headers } from "next/headers";
import PaddingContainer from "../layout/padding-container";
import { getDictionary } from "@/lib/getDictionary";
import classNames from "classnames";

const Navigation = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname");

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
              <Link
                href={`/${locale}/tutorials`}
                className={classNames("relative", {
                  active: pathname === `/${locale}/tutorials`,
                })}
              >
                {dictionary.navigation.links.tutorials}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/release-notes`}
                className={classNames("relative", {
                  active: pathname === `/${locale}/release-notes`,
                })}
              >
                {dictionary.navigation.links.releasenotes}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/faq`}
                className={classNames("relative", {
                  active: pathname === `/${locale}/faq`,
                })}
              >
                {dictionary.navigation.links.faq}
              </Link>
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
