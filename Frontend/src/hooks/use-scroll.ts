import { useEffect, useState } from "react"
import type { UseScrollProps } from "./Types/scrollTypes"

export const useScroll = ({ threshold = 20 }: UseScrollProps) => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > threshold);
        }
        window.addEventListener('scroll',
            handleScroll
        )
        return () => window.removeEventListener('scroll',
            handleScroll
        )
    }, [threshold])

    return scrolled
}