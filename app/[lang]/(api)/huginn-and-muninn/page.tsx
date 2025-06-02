import { headers } from "next/headers";
import { getInternals, getPages } from "@/lib/api";
import { getDictionary } from "@/lib/getDictionary";
import { Internal, Page } from "@/types";
import TurndownService from "turndown";

type Params = Promise<{ lang: string }>;

const DynamicPage = async ({ params }: { params: Params }) => {
  const { renderToString } = await import("react-dom/server");
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  const pages = (await getPages(lang, true)) as Page[];
  const internals = (await getInternals()) as Internal[];
  const turndownService = new TurndownService({
    headingStyle: "setext",
    hr: "* * *",
    bulletListMarker: "*",
    codeBlockStyle: "indented",
    fence: "```",
    emDelimiter: "_",
    strongDelimiter: "**",
    linkStyle: "inlined",
    linkReferenceStyle: "full",
    br: "\n\n",
  });

  const headersList = await headers();
  const host = headersList.get("X-Forwarded-Host");
  const proto = headersList.get("X-Forwarded-Proto");
  const baseUrl = `${proto}://${host}/${lang}`;

  const html = renderToString(
    <>
      {/* <h1 className="mb-4">{dictionary.navigation.links.internal}</h1> */}
      {internals &&
        internals.map((internal: Internal) => {
          const editLink = `https://help-admin.imc-express.cloud/admin/content/internals/${internal.id}`;
          console.log(internal);
          return (
            <div key={`internal-${internal.id}`} className="my-6">
              <div dangerouslySetInnerHTML={{ __html: internal.text }}></div>
              <div>
                {dictionary.general.edit}
                <a href={editLink}>{editLink}</a>
              </div>
            </div>
          );
        })}
      {pages &&
        pages.map((page: Page) => {
          const link = `${baseUrl}/${page.slug}`;
          return (
            <div key={`page-${page.id}`} className="my-6">
              <h3>{page.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
              <div>
                {dictionary.general.source}
                <a href={link}>{link}</a>
              </div>
            </div>
          );
        })}
    </>
  )
    .trim()
    .replaceAll(/\s+/g, " ");

  return <pre>{turndownService.turndown(html)}</pre>;
};

export default DynamicPage;
