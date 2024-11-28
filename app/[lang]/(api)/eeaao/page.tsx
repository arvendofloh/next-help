import { getReleaseNotes, getFaqs, getPages } from "@/lib/api";
import { getDictionary } from "@/lib/getDictionary";
import Release from "@/components/release/release";
import { ReleaseNote, FAQ, Category, Page } from "@/types";
import TurndownService from "turndown";

type Params = Promise<{ lang: string }>;

const DynamicPage = async ({ params }: { params: Params }) => {
  const { renderToString } = await import("react-dom/server");
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const releaseNotes = (await getReleaseNotes(lang)) as ReleaseNote[];
  const categories = (await getFaqs(lang)) as Category[];
  const pages = (await getPages(lang)) as Page[];
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

  const html = renderToString(
    <>
      <h1 className="mb-4">{dictionary.navigation.links.releasenotes}</h1>
      {releaseNotes.map((release: ReleaseNote, i: number) => (
        <Release
          release={release as ReleaseNote}
          key={i}
          locale={lang}
          noWhiteSpace={true}
        />
      ))}
      <h1 className="my-4">{dictionary.navigation.links.faq}</h1>
      {categories &&
        categories.map((category: Category) => (
          <div key={category.id} className="my-6">
            <h3>{category.title}</h3>
            <ul>
              {category.faqs.map((faq: FAQ) => (
                <li key={faq.id} className="my-4">
                  <h4>{faq.title}</h4>
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      {pages &&
        pages.map((page: Page) => (
          <div key={page.id} className="my-6">
            <h3>{page.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
          </div>
        ))}
    </>
  )
    .trim()
    .replaceAll(/\s+/g, " ");

  return <pre>{turndownService.turndown(html)}</pre>;
};

export default DynamicPage;
