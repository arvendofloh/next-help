import { getFaqs } from "@/lib/api";
import PaddingContainer from "@/components/layout/padding-container";
import { Category } from "@/types";
import Faqs from "@/components/faq/faqs";
import { getDictionary } from "@/lib/getDictionary";

type Params = Promise<{ lang: string }>;

const FaqPage = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const categories = await getFaqs(lang);

  let sortedCategories: Category[] = [];

  if (categories !== undefined) {
    sortedCategories = (categories as Category[]).sort(
      (a: Category, b: Category) => {
        return a.title.localeCompare(b.title);
      }
    );
  }

  return (
    <PaddingContainer>
      <main className="space-y-5">
        <Faqs categories={sortedCategories} tocHeader={dictionary.labels.toc} />
      </main>
    </PaddingContainer>
  );
};

export default FaqPage;
