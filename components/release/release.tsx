import { ReleaseNote } from "@/types";

interface ReleaseNoteProps {
  release: ReleaseNote;
  locale: string;
}

const Release = ({ release, locale }: ReleaseNoteProps) => {
  const dateString = new Date(release.releasedate);

  return (
    <div className="release border-t-2 border-t-white/20 border-dashed pt-6 mt-10">
      <h2 className="mb-7">
        {dateString.toLocaleString(locale, { month: "long" })}{" "}
        {dateString.getFullYear()}, Version {release.title}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: release.content }}></div>
    </div>
  );
};

export default Release;
