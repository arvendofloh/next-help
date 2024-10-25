import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/padding-container";

async function getPage(slug: string) {
  return directus.request(readItems("pages", { filter: { slug } }));
}

const DynamicPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const page = await getPage(slug);

  if (page.length === 0) {
    return notFound();
  }
  return (
    <PaddingContainer>
      <main className="h-auto space-y-5">
        <h1>{page[0].title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page[0].content }}></div>
      </main>
    </PaddingContainer>
  );
};

export default DynamicPage;
