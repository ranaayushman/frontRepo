import { Button } from "@/components/ui/button";
import React from "react";

const Book = () => {
  return (
    <section className="bg-[#FAF9F6] py-10 sm:py-16 md:py-20 px-4 sm:px-8 md:px-16 lg:px-20">
      <div className="flex items-center justify-center flex-col text-center max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
          Book Your Admission Now!
        </h2>
        <Button className="bg-[#C28C19] hover:bg-yellow-600 text-[#FAF9F6] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg lg:text-xl h-auto w-full sm:w-4/5 md:w-3/4 lg:w-1/2 mt-4 sm:mt-6 md:mt-8">
          Seats Filling Fast - Book Your Admission Now!
        </Button>
      </div>
    </section>
  );
};

export default Book;
