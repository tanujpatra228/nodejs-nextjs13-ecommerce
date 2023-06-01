import { HTMLAttributes } from "react";

const SkeletonLoader = ({ className }: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={`bg-gray-200 animate-pulse ${className}`} />
    )
};

export default SkeletonLoader;
