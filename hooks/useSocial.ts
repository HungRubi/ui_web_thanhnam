'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSocial } from '@/store/socialSlice';

export const useSocial = (autoFetch: boolean = true) => {
	const dispatch = useAppDispatch();
	const { social, loading, error } = useAppSelector(state => state.social);

	useEffect(() => {
		if (autoFetch) {
			dispatch(getSocial());
		}
	}, [autoFetch, dispatch]);

	const refetch = () => {
		dispatch(getSocial());
	};

	return {
		social,
		loading,
		error,
		refetch,
	};
};
