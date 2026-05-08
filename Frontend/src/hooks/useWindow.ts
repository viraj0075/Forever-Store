import { useLayoutEffect, useState } from "react";

export const useWindow = () => {
    const [width, setWidth] = useState<number>(0);
    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const updateWidth = (): void => setWidth(window.innerWidth);
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, [])
    return width;
}