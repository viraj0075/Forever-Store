import { createFileRoute } from '@tanstack/react-router'
import LatestCollection from '../components/LatestCollection'

export const Route = createFileRoute('/collection')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <LatestCollection />
    </>
  )
}
