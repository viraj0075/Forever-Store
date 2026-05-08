import { createFileRoute } from '@tanstack/react-router'
import ProductWithFilter from '../../components/ProductWithFilter'

export const Route = createFileRoute('/product/')({
  component: Product,
})

function Product() {
  return <ProductWithFilter />
}
