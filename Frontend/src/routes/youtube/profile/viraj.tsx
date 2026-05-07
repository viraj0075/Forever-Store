import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/youtube/profile/viraj')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex flex-col justify-center items-center gap-2 mt-3">
            <p>Hello "/youtube/profile/viraj"!</p>
            <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/contact">Go to Contact Page</Link>
            <Link className="bg-blue-500 text-white px-4 py-2 rounded" to="/about">Go to About Page</Link>
        </div>
    )
}
