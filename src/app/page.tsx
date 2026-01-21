"use client";

import AdvancedSearch from "../components/AppComponents/AdvancedSearch";
import CollectorHub from "../components/AppComponents/CollectorHub";
import Featured from "../components/AppComponents/Featured";
import HomeBanner from "../components/AppComponents/HomeBanner";
import UpcomingAuctions from "../components/AppComponents/UpcomingAuctions";
import { Suspense } from "react";
export default function Home() {
  return (
    <>
      <HomeBanner />
      <Suspense fallback={<div>Loading content...</div>}>
        <Featured />
        <UpcomingAuctions />
        {/* <AdvancedSearch /> */}
        <CollectorHub />
      </Suspense>
    </>
  );
}
