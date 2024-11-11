import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import ReleaseList from "@/components/release/release-list";
import { ReleaseNote } from "@/types";

type Params = Promise<{ lang: string }>;

const getReleaseNotes = async (locale: string) => {
  try {
    const releasenotes = await directus.request(
      readItems("releasenotes", {
        fields: ["*", "translations.*"],
        sort: "-releasedate",
      })
    );

    if (locale === "en") {
      return releasenotes;
    } else {
      const localizedReleaseNotes = releasenotes.map((note) => {
        if (!note.translations || note.translations.length === 0) {
          return note;
        } else {
          const noteTranslations = note.translations.find(
            (translation: { languages_code: string }) =>
              translation.languages_code === locale
          );
          return {
            ...note,
            content: noteTranslations.content,
          };
        }
      });
      return localizedReleaseNotes;
    }
  } catch (error) {
    console.error(error);
  }
};

const Release = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const notes = await getReleaseNotes(lang);

  return <ReleaseList releaseNotes={notes as ReleaseNote[]} locale={lang} />;
};

export default Release;
