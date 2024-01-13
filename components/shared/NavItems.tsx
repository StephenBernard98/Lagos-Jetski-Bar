"use client";
import navLinks from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className="text-black font-extrabold md:text-white md:flex flex-col items-center gap-7 md:flex-row justify-between w-full">
      {navLinks.map((links) => {
        const isActive = pathname === links.route;
        return (
          <div key={links.label}>
            <li
              className={`${
                isActive &&
                "bg-slate-900 text-white md:bg-white rounded w-max md:text-black px-4 py-2"
              } mx-4 my-10 md:my-0 leading-relaxed h-full`}
            >
              <Link href={links.route}>{links.label}</Link>
            </li>
          </div>
        );
      })}
    </ul>
  );
};

export default NavItems;
