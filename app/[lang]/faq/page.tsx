import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import PaddingContainer from "@/components/layout/padding-container";
import { Category, FAQ } from "@/types";
import Faqs from "@/components/faq/faqs";
import { getDictionary } from "@/lib/getDictionary";

type Params = Promise<{ lang: string }>;

const getFaqs = async (locale: string) => {
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

const FaqPage = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const categories = await getFaqs(lang);

  return (
    <PaddingContainer>
      <main className="space-y-5">
        <Faqs
          categories={categories as Category[]}
          tocHeader={dictionary.labels.toc}
        />
      </main>
    </PaddingContainer>
  );
};

export default FaqPage;
