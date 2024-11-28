import { getReleaseNotes } from "@/lib/api";
import ReleaseList from "@/components/release/release-list";
import { ReleaseNote } from "@/types";

type Params = Promise<{ lang: string }>;

const Release = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const notes = await getReleaseNotes(lang);

  return <ReleaseList releaseNotes={notes as ReleaseNote[]} locale={lang} />;
};

export default Release;
