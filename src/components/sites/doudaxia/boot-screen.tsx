"use client";

import { useEffect } from "react";
import { AUTH_KEY } from "@/lib/sites/doudaxia/catalog";

export function BootScreen({ title }: { title: string }) {
  useEffect(() => {
    const authed = document.cookie.split("; ").some((item) => item === `${AUTH_KEY}=1`);
    const timer = window.setTimeout(() => {
      window.location.assign(authed ? "/order-list" : "/login");
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <div className="dx-boot">
      <p>{title}</p>
    </div>
  );
}
