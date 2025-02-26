import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Meta, ReleaseNote, FAQ, Tutorial, Page } from "@/types";

export const getMeta = async () => {
  try {
    const meta = (await directus.request(
      readItems("meta", { fields: ["title, description"], limit: 1 })
    )) as Meta[];
    return meta;
  } catch (error) {
    console.error(error);
  }

  return undefined;
};

export const getPage = async (slug: string, locale: string) => {
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

export const getPages = async (locale: string) => {
  try {
    const pages = await directus.request(
      readItems("pages", {
        fields: ["*", "translations.*"],
        filter: {
          _and: [
            {
              hideFromAI: {
                _neq: true,
              },
              status: { _eq: "published" },
            },
          ],
        },
      })
    );

    if (locale === "en") {
      return pages;
    } else {
      const localizedPages = pages.map((page) => {
        if (!page.translations || page.translations.length === 0) {
          return page;
        } else {
          const pageTranslation = page.translations.find(
            (translation: { languages_code: string }) =>
              translation.languages_code === locale
          );
          return {
            ...page,
            title: pageTranslation.title,
            content: pageTranslation.content,
          };
        }
      });
      return localizedPages;
    }
  } catch (error) {
    console.error(error);
  }
  return undefined;
};

export const getFaqs = async (locale: string) => {
  try {
    const categories = await directus.request(
      readItems("category", {
        fields: ["*", "faqs.*", "faqs.translations.*", "translations.*"],
        sort: "sort",
        sortOrder: "ASC",
      })
    );

    if (locale === "en") {
      return categories;
    } else {
      const localizedFaqs = categories.map((category) => {
        if (!category.translations || category.translations.length === 0) {
          return category;
        } else {
          const categoryTranslations = category.translations.find(
            (translation: { languages_code: string }) =>
              translation.languages_code === locale
          );

          const faqs = category.faqs.map((faq: FAQ) => {
            if (!faq.translations) {
              return faq;
            } else {
              const faqTranslations = faq.translations.find(
                (translation) => translation.languages_code === locale
              );
              return {
                ...faq,
                title: faqTranslations?.title || faq.title,
                answer: faqTranslations?.answer || faq.answer,
              };
            }
          });
          return {
            ...category,
            title: categoryTranslations.title,
            faqs,
          };
        }
      });
      return localizedFaqs;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getReleaseVersion = async (version: string, locale: string) => {
  try {
    const releasenote = (await directus.request(
      readItems("releasenotes", {
        filter: {
          _and: [{ title: { _eq: version }, status: { _eq: "published" } }],
        },
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

export const getReleaseNotes = async (locale: string) => {
  try {
    const releasenotes = await directus.request(
      readItems("releasenotes", {
        filter: { status: { _eq: "published" } },
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

export const getTutorials = async (locale: string) => {
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
