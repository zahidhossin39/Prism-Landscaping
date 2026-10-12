"use client";

import React from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Evelyn Hayes",
    role: "Head of Landscaping",
    image: "/assets/team-1.png",
  },
  {
    name: "Arthur Morales",
    role: "Senior Horticulturist",
    image: "/assets/team-2.png",
  },
  {
    name: "Naomi Williams",
    role: "Certified Arborist",
    image: "/assets/team-3.jpg",
  },
  {
    name: "Jamal Crawford",
    role: "Regional Sales Director",
    image: "/assets/team-4.jpg",
  },
];

export default function AboutTeamSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1204px] mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1f1f1f] leading-tight font-normal">
            Meet Our{" "}
            <span className="font-serif italic font-semibold text-[#274839]">
              Expert Team
            </span>
          </h2>
        </div>

        {/* 4-Card Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="group flex flex-col">
              {/* Member Photo Frame with 8px border radius matching Framer */}
              <div className="relative aspect-[1/1.18] w-full rounded-lg overflow-hidden shadow-xs border border-[#dedbc8] bg-[#e5e3d7]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Name & Title with horizontal indicator line matching Framer */}
              <div className="mt-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-[1.5px] bg-[#1f1f1f] flex-shrink-0" />
                  <h3 className="text-base font-semibold text-[#1f1f1f] tracking-tight">
                    {member.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#606060] pl-[30px] mt-0.5">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
