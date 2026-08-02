"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// ─── Shared dissolve constants ────────────────────────────────────────────────
// Keep these in sync with the slideshow's internal crossfade timing.
// One place to change both when the pacing is tuned.
export const DISSOLVE_DURATION_MS = 1250;
export const DISSOLVE_EASING = "ease-in-out";
// ─────────────────────────────────────────────────────────────────────────────

interface HeroLayerProps {
  imageSrc: string;
  imageAlt: string;
  videoSrc: string;
}

/**
 * Renders a full-bleed container with:
 *  - the video playing underneath from the moment the browser says it's ready
 *  - the still image on top, fully opaque at first
 *  - a CSS opacity dissolve once `canplaythrough` fires
 *
 * If the video never becomes playable the image stays opaque permanently
 * (no partial/interrupted fade per the AGENTS.md spec).
 */
function HeroLayer({ imageSrc, imageAlt, videoSrc }: HeroLayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // null  = waiting | true  = start dissolve | false = video failed, keep image
  const [videoState, setVideoState] = useState<true | false | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let settled = false;

    const markReady = () => {
      if (settled) return;
      settled = true;
      setVideoState(true);
    };

    const markFailed = () => {
      if (settled) return;
      settled = true;
      setVideoState(false);
    };

    video.addEventListener("canplaythrough", markReady);
    video.addEventListener("error", markFailed);

    // Play is called here so the video is already running before the dissolve.
    // autoPlay is also on the element as a declarative fallback.
    video.play().catch(markFailed);

    return () => {
      video.removeEventListener("canplaythrough", markReady);
      video.removeEventListener("error", markFailed);
    };
  }, []);

  // Image stays fully visible until videoState is explicitly `true`.
  // If it's `false` (failed) we never change opacity at all — no transition.
  const imageOpacity = videoState === true ? 0 : 1;
  const imageTransition =
    videoState === true
      ? `opacity ${DISSOLVE_DURATION_MS}ms ${DISSOLVE_EASING}`
      : "none";

  return (
    <div className="absolute inset-0">
      {/* ── Video layer — z-0, underneath, playing before dissolve starts ─── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* ── Still image layer — z-10, on top, fades to transparent ────────── */}
      <div
        className="absolute inset-0 z-10"
        style={{ opacity: imageOpacity, transition: imageTransition }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          loading="eager"
          preload
        />
      </div>
    </div>
  );
}

/**
 * Full-bleed hero background.
 * Mobile  (< md): portrait 9:16 video + matching still
 * Desktop (≥ md): landscape 16:9 video + matching still
 */
export default function HeroBackground() {
  return (
    <div className="relative w-screen h-dvh min-h-screen bg-black overflow-hidden">
      {/* Mobile: portrait */}
      <div className="block md:hidden absolute inset-0">
        <HeroLayer
          imageSrc="/girraffe_kilimanjaro_mobile.avif"
          imageAlt="Giraffe silhouette at Kilimanjaro — mobile"
          videoSrc="/mobile-final.mp4"
        />
      </div>

      {/* Desktop: landscape */}
      <div className="hidden md:block absolute inset-0">
        <HeroLayer
          imageSrc="/girraffe_kilimanjaro.avif"
          imageAlt="Giraffe silhouette at Kilimanjaro — desktop"
          videoSrc="/desktop-final.mp4"
        />
      </div>
    </div>
  );
}
