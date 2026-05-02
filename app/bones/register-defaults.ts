'use client';

import type { ResponsiveBones } from 'boneyard-js';
import { configureBoneyard, registerBones } from 'boneyard-js/react';

/**
 * Xương mặc định cho toàn app (pixel gần đúng layout coupon site).
 * Sau này chạy `npx boneyard-js build` (dev server bật) để thay bằng snapshot DOM chính xác.
 */
const appShell: ResponsiveBones = {
	breakpoints: {
		375: {
			name: 'app-shell',
			viewportWidth: 375,
			width: 375,
			height: 640,
			bones: [
				[16, 16, 200, 40, 8],
				[230, 16, 129, 40, 8],
				[16, 72, 343, 44, 8],
				[16, 128, 343, 140, 8],
				[16, 284, 343, 14, 4],
				[16, 308, 343, 14, 4],
				[16, 332, 343, 14, 4],
				[16, 358, 160, 120, 8],
				[184, 358, 175, 90, 8],
				[16, 492, 343, 48, 8],
			],
		},
		768: {
			name: 'app-shell',
			viewportWidth: 768,
			width: 768,
			height: 720,
			bones: [
				[24, 24, 320, 48, 8],
				[424, 24, 320, 48, 8],
				[24, 88, 720, 52, 8],
				[24, 152, 720, 160, 8],
				[24, 328, 720, 16, 4],
				[24, 356, 720, 16, 4],
				[24, 388, 348, 200, 8],
				[384, 388, 360, 200, 8],
				[24, 604, 720, 56, 8],
			],
		},
		1280: {
			name: 'app-shell',
			viewportWidth: 1280,
			width: 1280,
			height: 820,
			bones: [
				[32, 32, 420, 52, 8],
				[828, 32, 420, 52, 8],
				[32, 100, 1216, 56, 8],
				[32, 172, 1216, 200, 8],
				[32, 388, 1216, 18, 4],
				[32, 418, 1216, 18, 4],
				[32, 452, 592, 240, 8],
				[640, 452, 608, 240, 8],
				[32, 712, 1216, 64, 8],
			],
		},
	},
};

configureBoneyard({
	animate: 'shimmer',
	stagger: 80,
	transition: 280,
	color: '#e5e5e5',
	darkColor: '#2a2a2a',
	shimmerColor: '#f0f0f0',
	darkShimmerColor: '#333333',
	speed: '2s',
	shimmerAngle: 110,
});

registerBones({ 'app-shell': appShell });
