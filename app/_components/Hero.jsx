import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <section className="bg-gray-300 lg:grid lg:h-screen lg:place-content-center dark:bg-gray-900 flex items-center flex-col">
      <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
            Manage Your Expence,
            <strong className="text-indigo-600">Control & Save </strong>
            your Money
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
            Start Creating your budget and save ton of money.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <a
              className="inline-block rounded border border-yellow-600 bg-yellow-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-yellow-700"
              href="/sign-up"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      <Image
        src={"/dashboard.webp"}
        alt="Dashboard Image"
        width={900}
        height={700}
        className="-mt-12 rounded-xl border-2"
      />
    </section>
  );
}

export default Hero;
