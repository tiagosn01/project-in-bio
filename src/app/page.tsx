import { getUserSession } from "@/lib/auth";
import FAQ from "../components/landing-page/faq";
import Header from "../components/landing-page/header";
import Hero from "../components/landing-page/hero";
import Pricing from "../components/landing-page/pricing";
import VideoExplanation from "../components/landing-page/video-explanation";
import { getProfileId } from "@/server/profile/profile-data";

export default async function Home() {
  const session = await getUserSession();

  let profileId;

  if (session) {
    profileId = await getProfileId(session?.user?.id as string);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Hero />
      <Header session={session} profileId={profileId} />

      <VideoExplanation />
      <Pricing />
      <FAQ />
    </div>
  );
}
