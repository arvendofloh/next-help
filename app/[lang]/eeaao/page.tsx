import { getReleaseNotes, getFaqs, getPages } from "@/lib/api";
import { getDictionary } from "@/lib/getDictionary";
import PaddingContainer from "@/components/layout/padding-container";
import ReleaseList from "@/components/release/release-list";
import { ReleaseNote, FAQ, Category, Page } from "@/types";

type Params = Promise<{ lang: string }>;

const DynamicPage = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const releaseNotes = (await getReleaseNotes(lang)) as ReleaseNote[];
  const categories = (await getFaqs(lang)) as Category[];
  const pages = (await getPages(lang)) as Page[];

  return (
    <PaddingContainer>
      <h1 className="mb-4">{dictionary.navigation.links.releasenotes}</h1>
      <ReleaseList releaseNotes={releaseNotes} locale={lang} />
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
    </PaddingContainer>
  );
};

export default DynamicPage;
