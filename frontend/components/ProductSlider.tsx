"use client"
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
    title: string;
    products: Product[] | null;
};

const ProductSlider = ({ title = "On Sale", products }: Props) => {
    if (!products) return null;

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={4}
                navigation={true}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 0,
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 4,
                    }
                }}
            >
                {products.length > 0 && products.map((product) => (
                    <SwiperSlide key={product._id} className="p-3">
                        <ProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default ProductSlider;