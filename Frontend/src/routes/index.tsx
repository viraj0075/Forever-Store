import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="flex flex-col justify-center items-center gap-4">
      <p>Home Page</p>
    </div>
  ),
});
