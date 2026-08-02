import HeroBackground from "./components/HeroBackground";
import { HeroCopy } from "@/components/HeroCopy";

export default function Home() {
  return (
    <div className="relative">
      <HeroBackground />
      <HeroCopy />
    </div>
  );
}
