"use client";
import { Tutorial } from "@/types";

interface TutorialCardProps {
  tutorial: Tutorial;
}

const TutorialCard = ({ tutorial }: TutorialCardProps) => {
  return (
    <div
      className="tutorialcard group relative flex aspect-square bg-cover bg-no-repeat bg-center rounded-2xl cursor-pointer shadow-lg overflow-hidden"
      key={tutorial.id}
      onClick={() => window.open(tutorial.link, "_blank")}
      style={{ backgroundImage: `url(${tutorial.imagelink})` }}
    >
      <div className="z-10 tutorialcardtitle bg-white text-foreground absolute bottom-0 left-0 right-0 h-14 flex justify-center items-center ease-in-out duration-300 group-hover:h-24 group-hover:rounded-md">
        <span className="tutorialcarttext px-1 text-center">
          {tutorial.title}
        </span>
      </div>
    </div>
  );
};

export default TutorialCard;
