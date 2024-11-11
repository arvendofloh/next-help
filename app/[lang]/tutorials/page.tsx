import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import PaddingContainer from "@/components/layout/padding-container";
import { Tutorial } from "@/types";
import TutorialCard from "@/components/tutorial/tutorialcard";

type Params = Promise<{ lang: string }>;

const getTutorials = async (locale: string) => {
  try {
    const tutorials = await directus.request(
      readItems("tutorial_category", {
        fields: [
          "*",
          "tutorials.*",
          "tutorials.translations.*",
          "translations.*",
        ],
        sort: "sort",
        sortOrder: "ASC",
      })
    );

    if (locale === "en") {
      return tutorials;
    } else {
      const localizedTutorials = tutorials.map((category) => {
        if (!category.translations || category.translations.length === 0) {
          return category;
        } else {
          const categoryTranslations = category.translations.find(
            (translation: { languages_code: string }) =>
              translation.languages_code === locale
          );

          const tutorials = category.tutorials.map((tutorial: Tutorial) => {
            if (!tutorial.translations) {
              return tutorial;
            } else {
              const tutorialTranslations = tutorial.translations.find(
                (translation) => translation.languages_code === locale
              );
              return {
                ...tutorial,
                title: tutorialTranslations?.title || tutorial.title,
                link: tutorialTranslations?.link || tutorial.link,
              };
            }
          });
          return {
            ...category,
            title: categoryTranslations.title,
            tutorials,
          };
        }
      });
      return localizedTutorials;
    }
  } catch (error) {
    console.error(error);
  }
};

const TutorialsPage = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const tutorials = await getTutorials(lang);

  return (
    <PaddingContainer>
      <main className="space-y-5">
        {tutorials &&
          tutorials.map((category) => (
            <div key={category.id}>
              <h3>{category.title}</h3>
              <div className="cardscontainer mb-12 w-full grid grid-cols-6 gap-3">
                {category.tutorials.map((tutorial: Tutorial) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
              </div>
            </div>
          ))}
      </main>
    </PaddingContainer>
  );
};

export default TutorialsPage;
