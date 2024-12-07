import { getPage } from "@/lib/api";
import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/padding-container";

type Params = Promise<{ lang: string; slug: string }>;

const DynamicPage = async ({ params }: { params: Params }) => {
  const { lang, slug } = await params;
  const page = await getPage(slug, lang);

  if (page === undefined) {
    return notFound();
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
