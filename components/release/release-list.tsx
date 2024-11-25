import Release from "@/components/release/release";
import { ReleaseNote } from "@/types";

interface ReleaseNoteProps {
  releaseNotes: ReleaseNote[];
  locale: string;
}

const ReleaseList = ({ releaseNotes, locale }: ReleaseNoteProps) => {
  return (
    <main className="h-auto">
      {releaseNotes.map((release: ReleaseNote, i: number) => (
        <Release release={release as ReleaseNote} key={i} locale={locale} />
      ))}
    </main>
  );
};

export default ReleaseList;
