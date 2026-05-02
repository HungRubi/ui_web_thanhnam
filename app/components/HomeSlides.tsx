'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useWidgets } from '@/hooks/useWidgets';
import { resolveImageUrl } from '@/utils/image';

export default function HomeSlides() {
	const { widgets } = useWidgets();

	const slides = widgets
		.filter(w => w.hienthi === 'Yes')
		.sort((a, b) => (a.stt || 99999) - (b.stt || 99999))
		.map(w => ({
			src: resolveImageUrl(w.image, { fallback: '/slides/1.png' }),
			alt: w.name,
			href: w.link || '/',
			description: w.description,
		}));

	if (!slides.length) return null;

	return (
		<div className='w-full mt-6'>
			<Swiper
				modules={[Pagination, Autoplay]}
				slidesPerView={1}
				loop={true}
				pagination={{ clickable: true }}
				autoplay={{ delay: 4000 }}
			>
				{slides.map((slide, idx) => (
					<SwiperSlide key={idx}>
						<Link href={slide.href} target='_blank' rel='noopener noreferrer'>
							<Image
								src={slide.src || '/slides/1.png'}
								alt={slide.alt}
								width={3000}
								height={1500}
								className='w-full h-auto object-contain pb-10'
							/>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
