import Skeleton from "react-loading-skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="w-full gap-4 overflow-hidden">
      <Skeleton width={274} height={316} borderRadius={0} />

      <div className="mt-3 flex flex-col gap-2">
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={150} />
      </div>
    </div >
  );
};

export default ProductCardSkeleton;