"use client";

export default function Home() {
  return (
    <div className="relative w-screen h-screen min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Mobile background video: Portrait aspect ratio (block md:hidden) */}
      <div className="block md:hidden w-full h-full">
        <video
          className="w-full h-full object-cover"
          src="/arcade_expeditions_portrait.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* PC background video: Landscape aspect ratio (hidden md:block) */}
      <div className="hidden md:block w-full h-full">
        <video
          className="w-full h-full object-cover"
          src="/arcade_expeditions_landscape.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  );
}
