"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

const Hero = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleApplyNow = () => {
    if (status === "unauthenticated") {
      signIn("google"); // Triggers Google Sign-In
    } else if (session?.user?.id) {
      router.push(`/dashboard/${session.user.id}`);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/img/hit.png"
        alt="Haldia Institute of Technology"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/img/logo.svg"
            alt="HIT Logo"
            width={420}
            height={220}
            className="mx-auto"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleApplyNow}
            className="flex justify-between bg-yellow-500 w-52 hover:bg-[#C28C19AD] text-black px-8 py-4 text-lg rounded-full"
          >
            APPLY NOW
            <Image
              src={"/img/arrow.svg"}
              alt="arrow"
              width={20}
              height={20}
              className="mr-2"
            />
          </Button>

          <Link href="/enquiry">
            <Button className="flex justify-centre bg-yellow-500 w-52 hover:bg-[#C28C19AD] text-black px-8 py-4 text-lg rounded-full">
              ENQUIRY NOW
              <Image
                src={"/img/arrow.svg"}
                alt="arrow"
                width={20}
                height={20}
                className="mr-2"
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
