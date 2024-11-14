import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import PaddingContainer from "@/components/layout/padding-container";
import Release from "@/components/release/release";
import { ReleaseNote } from "@/types";

const getReleaseVersion = async (version: string, locale: string) => {
  try {
    const releasenote = (await directus.request(
      readItems("releasenotes", {
        filter: { title: { _eq: version } },
        fields: ["*", "translations.*"],
        limit: 1,
      })
    )) as ReleaseNote[];

    if (locale === "en") {
      return releasenote[0];
    } else {
      if (
        !releasenote[0].translations ||
        releasenote[0].translations.length === 0
      ) {
        return releasenote[0];
      } else {
        const noteTranslations = releasenote[0].translations.find(
          (translation: { languages_code: string }) =>
            translation.languages_code === locale
        );
        return {
          ...releasenote[0],
          content: noteTranslations
            ? noteTranslations.content
            : releasenote[0].content,
        };
      }
    }
  } catch (error) {
    console.error(error);
  }
};

type Params = Promise<{ lang: string; version: string }>;

const DynamicPage = async ({ params }: { params: Params }) => {
  const { lang, version } = await params;
  const release = (await getReleaseVersion(version, lang)) as ReleaseNote;

  return (
    <PaddingContainer>
      <main className="h-auto space-y-5 bg-slate-50 text-foreground px-10 pt-2 pb-8 page-style absolute top-0 left-0 right-0 bottom-0">
        <Release release={release} locale={lang} />
      </main>
    </PaddingContainer>
  );
};

export default DynamicPage;
