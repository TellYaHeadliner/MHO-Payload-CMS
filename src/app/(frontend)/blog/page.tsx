

import Navbar from '@/components/navbar'

const url = 'https://www.myhealingosh-gallery.com/'


const Blog = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-3 md:px-5 pb-4">
                <div className="overflow-hidden md:min-h-screen">
                    <div className="grid md:min-h-screen lg:grid-cols-2">
                        <div className="mx-auto max-w-[85rem] px-5 2xl:px-0 flex flex-col items-center justify-center h-full order-2 lg:order-1">
                            <div className="font-receipt-body text-receipt-body text-vibrant-yellow mb-4 uppercase tracking-widest">
                                Featured Editorial // 001
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog;
