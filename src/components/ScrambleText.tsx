"use client";

import { useEffect, useState } from "react";

interface ScrambleTextProps {
  text: string;
  trigger?: any;
}

export default function ScrambleText({ text, trigger }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setDisplayText(text);
      return;
    }

    let active = true;
    const start = performance.now();
    const baseDuration = 500; // ms for the first digit to lock in
    const staggerTime = 80;   // ms stagger per digit
    const updateInterval = 40; // ms between scramble cycles (~25fps scramble updates)

    // Build map of digit indices in the text
    const charArray = text.split("");
    const digitIndices: number[] = [];
    charArray.forEach((char, idx) => {
      if (/\d/.test(char)) {
        digitIndices.push(idx);
      }
    });

    if (digitIndices.length === 0) {
      setDisplayText(text);
      return;
    }

    let intervalId: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = now - start;

      // Determine text output character by character
      const currentChars = charArray.map((targetChar, idx) => {
        // If it's not a digit, it does not scramble
        if (!/\d/.test(targetChar)) {
          return targetChar;
        }

        // Find the index of this digit among all digits.
        const digitSeqIndex = digitIndices.indexOf(idx);

        // Lock-in threshold for this digit sequence index
        const lockTime = baseDuration + digitSeqIndex * staggerTime;

        if (elapsed >= lockTime) {
          return targetChar;
        } else {
          // Scramble: generate a random digit character
          return Math.floor(Math.random() * 10).toString();
        }
      });

      setDisplayText(currentChars.join(""));

      // Complete when the last digit has locked in
      const lastLockTime = baseDuration + (digitIndices.length - 1) * staggerTime;
      if (elapsed >= lastLockTime) {
        setDisplayText(text); // Ensure precise settlement
        if (intervalId) clearInterval(intervalId);
      }
    };

    // Run first frame
    animate();

    // Set up rapid cycling interval
    intervalId = window.setInterval(() => {
      if (active) animate();
    }, updateInterval);

    return () => {
      active = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, trigger]);

  return <span>{displayText}</span>;
}
