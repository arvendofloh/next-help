import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "./i18n.config";

/* GET LOCALE HANDLER */
const getLocale = (request: NextRequest): string | undefined => {
  // negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  // use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // @ts-ignore locals are readonly
  const locales: string[] = i18n.locales;
  return matchLocale(languages, locales, i18n.defaultLocale);
};

/* MIDDLEWARE */
const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  // Check if there is ansy supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
};

export default middleware;

/* MATCHER */
export const config = {
  // Matcher ignoring `/_next` and `/api/` routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
