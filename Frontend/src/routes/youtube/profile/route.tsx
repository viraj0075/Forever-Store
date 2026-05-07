import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/youtube/profile')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='flex items-center justify-center gap-2 flex-col mt-3'>
            <p>SOMETHING SOMETHING</p>
            <Outlet />
        </div>)
}
