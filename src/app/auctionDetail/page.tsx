import AuctionDetailPage from "@/components/AppComponents/CarDetail";
import { Car } from "lucide-react";
import React from "react";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading auction details...</div>}>
        <AuctionDetailPage />
      </Suspense>
    </div>
  );
};

export default page;
