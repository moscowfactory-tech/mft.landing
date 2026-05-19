import { Component } from "@/components/ui/etheral-shadow";

export function DemoOne() {
  return (
    <div className="flex w-full h-screen justify-center items-center bg-black">
      <Component
        color="rgba(128, 128, 128, 1)"
        animation={{ scale: 100, speed: 90 }}
        noise={{ opacity: 1, scale: 1.2 }}
        sizing="fill"
      />
    </div>
  );
}

