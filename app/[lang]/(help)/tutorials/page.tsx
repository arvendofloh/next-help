import { getTutorials } from "@/lib/api";
import PaddingContainer from "@/components/layout/padding-container";
import { Tutorial } from "@/types";
import TutorialCard from "@/components/tutorial/tutorialcard";

type Params = Promise<{ lang: string }>;

const TutorialsPage = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const tutorials = await getTutorials(lang);

  return (
    <PaddingContainer>
      <main className="space-y-5">
        {tutorials &&
          tutorials.map((category) => (
            <div key={category.id}>
              <h3 className="mb-4">{category.title}</h3>
              <div className="cardscontainer mb-12 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {category.tutorials.map((tutorial: Tutorial) => (
                  <TutorialCard key={tutorial.id} tutorial={tutorial} />
                ))}
              </div>
            </div>
          ))}
      </main>
    </PaddingContainer>
  );
};

export default TutorialsPage;
