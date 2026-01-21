// import AdvancedSearch from "@/src/components/AppComponents/AdvancedSearch";
import AdvancedSearch from "@/components/AppComponents/AdvancedSearch";
// import Featured from "@/src/components/AppComponents/Featured";
import Featured from "@/components/AppComponents/Featured";
import React from "react";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading search...</div>}>
        <AdvancedSearch />
      </Suspense>

      <Featured />
    </div>
  );
};

export default page;
