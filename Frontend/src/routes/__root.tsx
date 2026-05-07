import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex justify-center items-center gap-4 mt-3">
        <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/">Navbar</Link>
        <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/contact">Contact Us</Link>
        <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/about">About Us</Link>
      </div>
      <Outlet />
      <div className="text-center mt-4">Copyright</div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
});
