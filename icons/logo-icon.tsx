import Image from "next/image";
import { FC } from "react";

interface LogoIconProps {
  className?: string;
}

const LogoIcon: FC<LogoIconProps> = ({ className = "" }) => {
  return (
    <Image
      src="/images/LogoPMI.png"
      alt="PMI Lampung Logo"
      width={48}
      height={48}
      className={`rounded-full ${className}`}
      priority
    />
  );
};

export default LogoIcon;
