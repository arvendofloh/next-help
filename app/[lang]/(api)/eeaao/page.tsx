import { headers } from "next/headers";
import { getReleaseNotes, getFaqs, getPages, getTutorials } from "@/lib/api";
import { getDictionary } from "@/lib/getDictionary";
import { createSlug } from "@/lib/utils";
import Release from "@/components/release/release";
import {
  ReleaseNote,
  FAQ,
  Category,
  Page,
  TutorialCategory,
  Tutorial,
} from "@/types";
import TurndownService from "turndown";

type Params = Promise<{ lang: string }>;

const DynamicPage = async ({ params }: { params: Params }) => {
  const { renderToString } = await import("react-dom/server");
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const releaseNotes = (await getReleaseNotes(lang))?.slice(
    0,
    3
  ) as ReleaseNote[];
  const categories = (await getFaqs(lang)) as Category[];
  const pages = (await getPages(lang)) as Page[];
  const tutorialCategories = (await getTutorials(lang)) as TutorialCategory[];
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

  console.log(releaseNotes);

  const headersList = await headers();
  const host = headersList.get("X-Forwarded-Host");
  const proto = headersList.get("X-Forwarded-Proto");
  const baseUrl = `${proto}://${host}/${lang}`;

  const html = renderToString(
    <>
      <h1 className="mb-4">{dictionary.navigation.links.tutorials}</h1>
      {tutorialCategories.map((category: TutorialCategory) => {
        return (
          <div key={`tutorial-category-${category.id}`} className="my-6">
            {category.tutorials.map((tutorial: Tutorial) => {
              return (
                <div key={`tutorial-${tutorial.id}`}>
                  <h3>{tutorial.title}</h3>
                  <p>{tutorial.description}</p>
                  <br />
                  {dictionary.general.source}
                  <a href={tutorial.link}>{tutorial.link}</a>
                </div>
              );
            })}
          </div>
        );
      })}
      <h1 className="mb-4">{dictionary.navigation.links.releasenotes}</h1>
      {releaseNotes.map((release: ReleaseNote) => {
        const link = `${baseUrl}/release/${release.title}`;
        return (
          <>
            <Release
              release={release as ReleaseNote}
              key={release.id}
              locale={lang}
              noWhiteSpace={true}
            />
            <br />
            {dictionary.general.source}
            <a href={link}>{link}</a>
          </>
        );
      })}
      <h1 className="my-4">{dictionary.navigation.links.faq}</h1>
      {categories &&
        categories.map((category: Category) => {
          return (
            <div key={`cat-${category.id}`} className="my-6">
              <h3>{category.title}</h3>
              <ul>
                {category.faqs.map((faq: FAQ) => (
                  <li key={faq.id} className="my-4">
                    <h4>{faq.title}</h4>
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
                    <div>
                      {dictionary.general.source}
                      <a
                        href={`${baseUrl}/faq#${createSlug(faq.title)}`}
                      >{`${baseUrl}/faq#${createSlug(faq.title)}`}</a>
                    </div>
                  </li>
                ))}
              </ul>
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
