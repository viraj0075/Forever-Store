import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="flex flex-col justify-center items-center gap-4">
      <Hero />
      <LatestCollection />
      <BestSeller />
    </div>
  ),
});
