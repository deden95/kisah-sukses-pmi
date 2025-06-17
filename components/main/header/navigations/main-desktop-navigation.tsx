import { LoginMenu } from "@/components/login";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MainDesktopNavigationMenu } from "./menu";

const MainDesktopNavigation = () => {
  return (
    <>
      <nav className="mx-auto hidden max-w-7xl items-center justify-between px-6 py-4 md:flex bg-white border-b border-gray-100">
        {/* PMI Header Logo Section */}
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex items-center space-x-6">   
            {/* Logo PMI Lampung */}
            <div className="flex items-center space-x-3">
              <Image
                src="/images/LogoPMI.png"
                alt="PMI Lampung Logo"
                width={200}
                height={60}
                className="rounded-full"
                priority
              />
       
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center">
          <div className="flex flex-1 gap-x-6">
            <MainDesktopNavigationMenu />
          </div>
        </div>

        {/* Login Menu */}
        <div className="flex flex-1 justify-end">
          <LoginMenu />
        </div>
      </nav>
    </>
  );
};

export default MainDesktopNavigation;
