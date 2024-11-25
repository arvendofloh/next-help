import { ReleaseNote } from "@/types";
import classNames from "classnames";

interface ReleaseNoteProps {
  release: ReleaseNote;
  locale: string;
  noWhiteSpace?: boolean;
}

const Release = ({ release, locale, noWhiteSpace }: ReleaseNoteProps) => {
  const dateString = new Date(release.releasedate);

  return (
    <div
      className={classNames("release", {
        "release border-t-2 border-t-white/20 border-dashed pt-6 mt-10":
          noWhiteSpace === false,
      })}
    >
      <h2 className="mb-7">
        {dateString.toLocaleString(locale, { month: "long" })}{" "}
        {dateString.getFullYear()}, Version {release.title}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: release.content }}></div>
    </div>
  );
};

export default Release;
