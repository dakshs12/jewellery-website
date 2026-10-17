"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Agentation = dynamic(
  () => import("agentation").then((mod) => mod.Agentation),
  { ssr: false }
);

export default function AgentationDev() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setMounted(true);
    }
  }, []);

  if (!mounted || pathname?.startsWith("/studio")) return null;

  return <Agentation endpoint="http://localhost:4747" />;
}
