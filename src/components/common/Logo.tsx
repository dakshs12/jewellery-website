import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

export interface LogoProps
  extends Omit<ComponentPropsWithoutRef<typeof Image>, "src" | "alt"> {
  className?: string;
  priority?: boolean;
}

export default function Logo({
  className = "",
  priority = true,
  ...props
}: LogoProps) {
  return (
    <Image
      src="/2.png"
      alt="Anayas Jewels"
      width={1280}
      height={650}
      priority={priority}
      className={`object-contain ${className}`}
      {...props}
    />
  );
}
