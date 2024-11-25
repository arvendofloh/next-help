import { getReleaseVersion } from "@/lib/api";
import PaddingContainer from "@/components/layout/padding-container";
import Release from "@/components/release/release";
import { ReleaseNote } from "@/types";

type Params = Promise<{ lang: string; version: string }>;

const DynamicPage = async ({ params }: { params: Params }) => {
  const { lang, version } = await params;
  const release = (await getReleaseVersion(version, lang)) as ReleaseNote;

  return (
    <PaddingContainer>
      <main className="h-auto space-y-5 bg-slate-50 text-foreground px-10 pt-4 pb-8 page-style absolute top-0 left-0 right-0 bottom-0 overflow-scroll">
        <Release release={release} locale={lang} noWhiteSpace={true} />
      </main>
    </PaddingContainer>
  );
};

export default DynamicPage;
