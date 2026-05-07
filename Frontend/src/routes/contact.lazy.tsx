import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/contact")({
  component: () => {
    const navigate = useNavigate();
    return (
      <div className="flex flex-col justify-center items-center gap-2">
        <p>Contact Page</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate({ to: "/about" })}>Go to About Page</button>
      </div>
    );
  },
});
