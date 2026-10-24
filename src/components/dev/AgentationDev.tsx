"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { useCartStore } from "@/store/useCartStore";

const Agentation = dynamic(
  () => import("agentation").then((mod) => mod.Agentation),
  { ssr: false }
);

export default function AgentationDev() {
  if (process.env.NODE_ENV === "production") return null;

  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isCartOpen = useCartStore((state) => state.isOpen);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setMounted(true);
    }
  }, []);

  if (!mounted || pathname?.startsWith("/studio") || isCartOpen) return null;

  return <Agentation endpoint="http://localhost:4747" />;
}
