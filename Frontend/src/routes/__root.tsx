import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
      <div className="text-center mt-4">Copyright</div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});
