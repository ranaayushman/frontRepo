import React from "react";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Instagram,
  AtSign,
  Copyright,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Discover = () => {
  const socialLinks = [
    {
      icon: Phone,
      url: "tel:+919123916285",
    },
    {
      icon: Mail,
      url: "mailto:directadmissionbengal@gmail.com",
    },
    {
      icon: Instagram,
      url: "https://www.instagram.com/namankan_bengal/",
    },
  ];

  return (
    <footer className="w-full bg-[#110072] text-white py-16">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-evenly items-start">
          {/* Left - Logo & Contact */}
          <div>
            <Image
              src="/img/primary_logo_white.png"
              alt="Namankan Logo"
              width={280}
              height={60}
              className="mb-4 w-auto h-auto"
            />
            {/* <p className="text-lg text-white/70 mb-3">your way to college</p> */}
            <h2
              className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text mb-4"
              style={{
                WebkitTextStroke: "1px #ffffff",
                color: "transparent",
              }}
            >
              namankan.in
            </h2>
            <p className="text-white/90 mb-2">Haldia, West Bengal, India</p>
            <div className="flex items-center gap-2 text-white/90">
              <AtSign size={18} />
              <span>directadmissionbengal@gmail.com</span>
            </div>
          </div>

          {/* Right - Services */}
          <div>
            <h3 className="text-2xl font-bold mb-4">OUR CORE SERVICES</h3>
            <ul className="space-y-1 text-white/80 mb-6 text-lg">
              <li>1. Expert Counselling.</li>
              <li>2. Direct Admission</li>
              <li>3. Admission Through JEE Mains/WBJEE</li>
            </ul>

            <h3 className="text-2xl font-bold mb-4">Top Colleges We Cover</h3>
            <ul className="space-y-1 text-white/80 mb-6 text-lg">
              <li>1. Haldia Institute of Technology, W.B.</li>
              <li>2. Heritage Institute of Technology, W.B.</li>
              <li>3. IEM, Kolkata</li>
            </ul>

            <Button className="bg-[#FFAE00] text-black font-bold h-12 w-1/2 px-8 hover:bg-[#e6a700] rounded-md">
              APPLY NOW
            </Button>

            <div className="flex gap-4 mt-10">
              {socialLinks.map(({ icon: Icon, url }, i) => (
                <Link
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-10 h-10 flex items-center justify-center border border-white/60 rounded-full hover:bg-white/10">
                    <Icon size={20} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        {/* <div className="border-t border-white/20 mt-16 pt-4 text-center text-sm text-white/60 flex items-center justify-center gap-1">
          <Copyright size={14} />
          <span className="text-[#94a3b8]">2025 copyright</span>
          <span className="text-white">namankan.in</span>
          <span className="text-[#94a3b8]">all rights reserved</span>
        </div> */}
      </div>
    </footer>
  );
};

export default Discover;
