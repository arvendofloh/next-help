/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import { getPage } from "@/lib/api";
import { getDictionary } from "@/lib/getDictionary";
import { notFound } from "next/navigation";
import PageContainer from "@/components/layout/page-container";
import PaddingContainer from "@/components/layout/padding-container";
import PrintButton from "@/components/layout/print-btn";

type Params = Promise<{ lang: string; slug: string }>;

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
  const { lang, slug } = await params;
  const page = await getPage(slug, lang);

  if (page !== undefined) {
    return {
      title: `${page.title} - imc Express help center`,
    };
  }

  return {
    title: "imc Express help center",
  };
};

const DynamicPage = async ({ params }: { params: Params }) => {
  const { lang, slug } = await params;
  const page = await getPage(slug, lang);
  const dictionary = await getDictionary(lang);

  if (page === undefined) {
    return notFound();
  }

  if (page.isPrint === true) {
    const updated = page.date_updated
      ? new Date(page.date_updated)
      : new Date();

    return (
      <PageContainer>
        <div className="flex justify-center print:hidden">
          <PrintButton>{dictionary.labels.printPage}</PrintButton>
        </div>
        <div className="text-black cover print:block print:text-black bg-white ">
          <div className="mt-20 relative">
            <img
              src="https://imcgmbh.s3.eu-central-1.amazonaws.com/scheer-document-title-image.jpg"
              alt={page.title}
            />
            <div className="absolute lastUpdated">
              {dictionary.labels.lastUpdated +
                updated.toLocaleDateString("de-DE")}
            </div>
          </div>
          <h1 className="document-title leading-relaxed text-6xl font-bold ">
            {page.title}
          </h1>
        </div>
        <main className="h-auto space-y-5  text-foreground px-16 pt-5 pb-8 page-style bg-white print:p-0 print:text-black">
          <h1>{page.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: page.content }}
            className="overflow-x-auto"
          ></div>
        </main>
      </PageContainer>
    );
  }

  return (
    <PaddingContainer>
      <div className="hidden h-screen relative cover print:block print:text-black print:bg-white ">
        <div className="bg-orange absolute left-1/4 top-44 right-0 bottom-1/3"></div>
        <h1 className="w-9/12 leading-relaxed text-6xl left-20 font-bold absolute top-1/4">
          {page.title}
        </h1>
      </div>
      <main className="h-auto space-y-5 bg-slate-50 text-foreground px-10 pt-2 pb-8 page-style print:bg-white print:p-0 print:text-black">
        <h1>{page.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: page.content }}
          className="overflow-x-auto"
        ></div>
      </main>
    </PaddingContainer>
  );
};

export default DynamicPage;
