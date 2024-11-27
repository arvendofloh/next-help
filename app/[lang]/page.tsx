import PaddingContainer from "@/components/layout/padding-container";
import { getDictionary } from "@/lib/getDictionary";
import Link from "next/link";

type Params = Promise<{ lang: string }>;

const HomePage = async ({ params }: { params: Params }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <PaddingContainer>
      <main className="home flex flex-col justify-center mx-auto items-center gap-8 mb-10">
        <h1
          className="text-4xl text-center md:text-6xl md:mt-4 lg:text-6xl lg:mt-16"
          dangerouslySetInnerHTML={{ __html: dictionary.homepage.titleHtml }}
        ></h1>
        <h3
          className="text-center font-extralight md:text-4xl"
          dangerouslySetInnerHTML={{ __html: dictionary.homepage.subtitle }}
        ></h3>
        <video
          className="h-full w-full rounded-lg md:max-w-lg lg:max-w-3xl md:my-8"
          controls
          muted
          autoPlay
          loop
        >
          <source src={dictionary.homepage.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Link href={`/${lang}/tutorials`}>
          {dictionary.homepage.viewAllTutorials}
        </Link>
      </main>
    </PaddingContainer>
  );
};

export default HomePage;
