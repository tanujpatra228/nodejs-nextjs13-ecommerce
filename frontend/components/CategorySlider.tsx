"use client"
import Image from 'next/image';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/a11y';

const CategorySlider = () => {
    const sliderImages: SliderImages[] = [
        {
            category: 'DENIM JEANS',
            img: 'http://www.m4mformen.com/images/category/category15914403312.jpg',
            alt: 'DENIM JEANS',
        },
        {
            category: 'Trousers',
            img: 'http://www.m4mformen.com/images/category/default.jpg',
            alt: 'Trousers',
        },
        {
            category: 'Accessories',
            img: 'http://www.m4mformen.com/images/category/category15914402983.jpg',
            alt: 'Accessories',
        },
        {
            category: 'Shirts',
            img: 'http://www.m4mformen.com/images/category/category15914402824.jpg',
            alt: 'Shirts',
        },
        {
            category: 'Sandos',
            img: 'http://www.m4mformen.com/images/category/category15914402306.jpg',
            alt: 'Sandos',
        },
        {
            category: 'Boxer Shorts',
            img: 'http://www.m4mformen.com/images/category/category15914401518.jpg',
            alt: 'Boxer Shorts',
        },
    ];
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation={true}
                pagination={{
                    dynamicBullets: true,
                }}
                loop={true}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                    },
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {
                    sliderImages.map((slide) => (
                        <SwiperSlide key={slide.img}>
                            <div className='relative h-[305px] w-[460px] overflow-hidden'>
                                <Image
                                    src={slide.img}
                                    alt={slide.alt}
                                    width={460}
                                    height={305}
                                />
                                <div className='absolute top-0 bottom-0 left-0 right-0 z-10 flex justify-center items-center bg-black/30'>
                                    <h2 className='text-white text-lg font-semibold uppercase'>{slide.category}</h2>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default CategorySlider;