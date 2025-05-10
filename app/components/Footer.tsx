import { Copyright } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-white/20 text-center text-sm md:text-md text-[#110072] py-4 px-2">
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <Copyright size={14} />
          <span className="text-[#110072]">2025</span>
        </div>
        <span className="text-[#110072]">namankan.in</span>
        <span className="text-[#110072]">All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
