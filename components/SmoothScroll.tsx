"use client";

import { useEffect } from "react";
import { setupSmoothScroll } from "@/utils/gsapAnimations";

export default function SmoothScroll() {
  useEffect(function () {
    return setupSmoothScroll();
  }, []);

  return null;
}
