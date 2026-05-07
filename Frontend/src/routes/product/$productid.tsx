import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/$productid')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/product/$productid"!</div>
}
