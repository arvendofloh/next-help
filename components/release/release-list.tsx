import PaddingContainer from "@/components/layout/padding-container";
import Release from "@/components/release/release";
import { ReleaseNote } from "@/types";

interface ReleaseNoteProps {
  releaseNotes: ReleaseNote[];
  locale: string;
}

const ReleaseList = ({ releaseNotes, locale }: ReleaseNoteProps) => {
  return (
    <PaddingContainer>
      <main className="h-auto space-y-5">
        {releaseNotes.map((release: ReleaseNote, i: number) => (
          <Release release={release as ReleaseNote} key={i} locale={locale} />
        ))}
      </main>
    </PaddingContainer>
  );
};

export default ReleaseList;
