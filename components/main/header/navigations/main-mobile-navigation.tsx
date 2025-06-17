"use client";

import { LoginMenu } from "@/components/login";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { MainMobileMenuButton, MainMobileNavigationMenu } from "./menu";

const MainMobileNavigation = () => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <nav className="mx-auto flex max-w-7xl 
		  items-center justify-between bg-white px-4 py-3 md:hidden">
            {/* PMI Logo for Mobile */}
            <div className="flex flex-1 justify-start">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/LogoPMI.png"
                  alt="PMI Lampung Logo"
                  width={200}
                  height={60}
                  className="rounded-full"
                  priority
                />        
              </Link>
            </div>

            {/* Login */}
            <div className="flex items-center space-x-2">
              <LoginMenu />
              {/* Mobile Menu Button */}
              {/* <MainMobileMenuButton open={open} /> */}
            </div>
          </nav>

          {/* Mobile Navigation */}
          <MainMobileNavigationMenu fragment={Fragment} />
        </>
      )}
    </Disclosure>
  );
};

export default MainMobileNavigation;
