const AuthLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <main className="flex h-screen w-screen relative bg-radial-gradient1 items-center justify-center">
            <div className="text-5xl drop-shadow-md cursor-default absolute top-4 left-1/2 transform -translate-x-1/2">
                <span className="text-white">W</span>
                <span className="text-rose-500 font-extrabold">.</span>
            </div>
            {children}

        </main>


    )
}

export default AuthLayout