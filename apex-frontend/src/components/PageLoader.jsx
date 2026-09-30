"use client";

import { FadeLoader } from "react-spinners";

export default function PageLoader({ loading }) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <FadeLoader color="#36d7b7" />
    </div>
  );
}