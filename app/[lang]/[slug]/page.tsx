import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/padding-container";
import { Page } from "@/types";

const getPage = async (slug: string, locale: string) => {
  try {
    const page = (await directus.request(
      readItems("pages", {
        fields: ["*", "translations.*"],
        filter: { slug },
        limit: 1,
      })
    )) as Page[];

    if (locale === "en") {
      return page[0];
    } else {
      if (!page[0].translations || page[0].translations.length === 0) {
        return page[0];
      } else {
        const pageTranslations = page[0].translations.find(
          (translation: { languages_code: string }) =>
            translation.languages_code === locale
        );
        return {
          ...page[0],
          title: pageTranslations ? pageTranslations.title : page[0].title,
          content: pageTranslations
            ? pageTranslations.content
            : page[0].content,
        };
      }
    }
  } catch (error) {
    console.error(error);
  }
  return undefined;
};

type Params = Promise<{ lang: string; slug: string }>;

const DynamicPage = async ({ params }: { params: Params }) => {
  const { lang, slug } = await params;
  const page = await getPage(slug, lang);

  if (page === undefined) {
    return notFound();
  }
  return (
    <PaddingContainer>
      <main className="h-auto space-y-5 bg-slate-50 text-foreground px-10 pt-2 pb-8 page-style">
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
      </main>
    </PaddingContainer>
  );
};

export default DynamicPage;
