import PaddingContainer from "@/components/layout/padding-container";
import Release from "@/components/release/release";
import { DUMMY_RELEASE_NOTES } from "../../DUMMY_DATA";

const ReleaseList = async () => {
  return (
    <PaddingContainer>
      <main className="h-auto space-y-5">
        {DUMMY_RELEASE_NOTES.map((release, i) => (
          <Release release={release} key={i} />
        ))}
      </main>
    </PaddingContainer>
  );
};

export default ReleaseList;
