import SkeletonLoader from "@/components/ui/SkeletonLoader";

const loading = () => {
    return (
        <>
            <section className="mt-32 mx-auto px-4 sm:px-6 lg:px-8 max-h-screen overflow-hidden">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-5 grid-rows-5 gap-8">
                    {/* Sidebar */}
                    <SkeletonLoader className="h-[500px] sidebar-grid-area rounded-lg bg-gray-100/70" />

                    {/* Main Content */}
                    <div className="main-content-grid-area px-4 sm:px-6 lg:px-8">

                        <div className="">
                            {/* Breadcrumb */}
                            <SkeletonLoader className="h-6 w-28 mb-4 rounded-lg bg-gray-100/70" />
                        </div>

                        {/* Products */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {[...Array(8)].map((_, i) => (<SkeletonLoader key={_} className="w-full h-[440px] rounded-xl bg-gray-100" />))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default loading