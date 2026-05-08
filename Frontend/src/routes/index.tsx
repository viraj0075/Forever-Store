import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import Subscribe from "../components/Subscribe";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="flex flex-col">
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <Subscribe />
    </div>
  ),
});
