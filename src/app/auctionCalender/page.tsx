// // import UpcomingAuctions from "@/src/components/AppComponents/UpcomingAuctions";
// import UpcomingAuctions from "@/components/AppComponents/UpcomingAuctions";
// import React from "react";
// // import AuctionCalenderHero from "@/src/components/AppComponents/AuctionCalendarHero";
// import AuctionCalenderHero from "@/components/AppComponents/AuctionCalendarHero";

// const page = () => {
//   return (
//     <div>
//       <AuctionCalenderHero />
//       <UpcomingAuctions />
//     </div>
//   );
// };

// export default page;
import React, { Suspense } from "react";
import UpcomingAuctions from "@/components/AppComponents/UpcomingAuctions";
import AuctionCalenderHero from "@/components/AppComponents/AuctionCalendarHero";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading page...</div>}>
        <AuctionCalenderHero />
        <UpcomingAuctions />
      </Suspense>
    </div>
  );
};

export default page;
