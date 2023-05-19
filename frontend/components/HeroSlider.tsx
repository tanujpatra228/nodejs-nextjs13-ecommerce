"use client"
import Image from 'next/image';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/a11y';

const HeroSlider = () => {
    const sliderImages: string[] = [
        '/banners/banner4.png',
        '/banners/banner1.png',
        '/banners/banner2.png',
        '/banners/banner3.png',
    ];
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                loop={true}
            >
                {
                    sliderImages.map((image) => (
                        <SwiperSlide key={image}>
                            <div>
                                <Image
                                    src={image}
                                    width={1920}
                                    height={570}
                                    className='h-[570px] w-full object-fill object-bottom'
                                    alt="banner"
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default HeroSlider;