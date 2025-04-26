import React from "react";
import Hero from "./components/Hero";
// import Explore from "./components/Explore";
// import FollowUp from "./components/FollowUp";
import Discover from "./components/Discover";
// import Navbar from "./components/Navbar";
import DirectAdmission from "./components/DirectAdmission";
import WhyUs from "./components/WhyUs";
import Book from "./components/Book";
import WhyHIT from "./components/WhyHIT";

const page = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Hero />
      {/* <Explore /> */}
      {/* <FollowUp /> */}
      <DirectAdmission />
      <WhyUs />
      <Book />
      <WhyHIT />
      <Discover />
    </div>
  );
};

export default page;
