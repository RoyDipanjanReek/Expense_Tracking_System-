import React from "react";
import PricingCard from "./_components/PricingCard";

function page() {
  return (
    <div className="m-5">
      <div >
        <h2 className="font-bold text-3xl md:text-5xl gap-5">
          Billing & Subscription
        </h2>
        <p className="text-gray-500 mt-4">
          Upgrade to enable unlimitedtracking, enhanced security controls, and
          additional features.
        </p>
      </div>
      <div className="mt-5 bg-gray-500 w-fit text-xl rounded-sm px-2 gap-4">
        <button className="bg-gray-500 hover:bg-white hover:text-black text-white px-3 rounded-sm">Account</button>
        <button className="bg-gray-500 hover:bg-white hover:text-black text-white px-3 rounded-sm">Plans</button>
        <button className="bg-gray-500 hover:bg-white hover:text-black text-white px-3 rounded-sm">Billing</button>
      </div>
      <div className="mt-10">
      <PricingCard />
      </div>
    </div>
  );
}

export default page;
