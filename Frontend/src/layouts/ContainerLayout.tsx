interface ContainerLayoutProps {
    children: React.ReactNode
}

const ContainerLayout = ({ children }: ContainerLayoutProps) => {
    return (
        <div className="px-2 sm:px-6 lg:px-8 max-w-[1500px] mx-auto">{children}</div>
    )
}

export default ContainerLayout