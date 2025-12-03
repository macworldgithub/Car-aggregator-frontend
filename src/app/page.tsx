"use client";

import AdvancedSearch from "../components/AppComponents/AdvancedSearch";
import CollectorHub from "../components/AppComponents/CollectorHub";
import Featured from "../components/AppComponents/Featured";
import HomeBanner from "../components/AppComponents/HomeBanner";
import UpcomingAuctions from "../components/AppComponents/UpcomingAuctions";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <Featured />
      <UpcomingAuctions />
      <AdvancedSearch />
      <CollectorHub />
    </>
  );
}
