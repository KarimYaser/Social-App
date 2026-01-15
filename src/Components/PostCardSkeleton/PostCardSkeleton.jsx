export default function PostCardSkeleton() {
    return (
        <>
            <div className="post-card bg-white shadow-lg rounded-2xl p-8 my-6 animate-pulse">
                {/* Header skeleton */}
                <header className='post-card-header flex justify-between items-center'>
                    <div className="flex items-center gap-4">
                        {/* Avatar skeleton */}
                        <div className="avatar-image rounded-full w-10 h-10 bg-gray-300"></div>
                        {/* User info skeleton */}
                        <div className="post-card-user-info space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-32"></div>
                            <div className="h-3 bg-gray-200 rounded w-20"></div>
                        </div>
                    </div>
                    {/* Menu button skeleton */}
                    <div className="h-5 w-5 bg-gray-300 rounded"></div>
                </header>

                {/* Post content skeleton */}
                <figure className="post-info mt-4 space-y-4">
                    {/* Caption skeleton - 3 lines */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                    </div>
                    {/* Image skeleton */}
                    <div className='-mx-8 mt-4 rounded-lg overflow-hidden'>
                        <div className="w-full h-80 bg-gray-300"></div>
                    </div>
                </figure>

                {/* Reactions skeleton */}
                <div className="reactions mt-4">
                    <div className="flex items-center justify-between">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </div>
                </div>

                {/* Action buttons skeleton */}
                <div className="action-btns -mx-8 flex justify-between items-center mt-4 pt-2 border-t border-b border-gray-200">
                    <div className="h-10 bg-gray-200 rounded-md w-1/3 mx-1"></div>
                    <div className="h-10 bg-gray-200 rounded-md w-1/3 mx-1"></div>
                    <div className="h-10 bg-gray-200 rounded-md w-1/3 mx-1"></div>
                </div>

                {/* Comments skeleton */}
                <section className="comments flex flex-col gap-4 mt-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                            <div className="h-8 w-8 bg-gray-300 rounded-full flex-shrink-0"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-3 bg-gray-300 rounded w-24"></div>
                                <div className="h-3 bg-gray-300 rounded w-full"></div>
                                <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    )
}