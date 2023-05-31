import React from "react";
import dynamic from "next/dynamic";

const MapDynamic = dynamic(() => import("../components/Map"), { ssr: false });

const Page = () => {
  return <MapDynamic />;
};

export default Page;
