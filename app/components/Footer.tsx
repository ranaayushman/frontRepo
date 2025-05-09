import { Copyright } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="border-t border-white/20 text-center text-md text-[#110072] flex items-center justify-center gap-1">
      <Copyright size={14} />
      <span className="text-[#110072]">2025 copyright</span>
      <span className="text-[#110072]">namankan.in</span>
      <span className="text-[#110072]">all rights reserved</span>
    </div>
  );
};

export default Footer;
