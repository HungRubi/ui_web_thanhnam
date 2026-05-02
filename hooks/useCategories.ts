'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCategories } from '@/store/categorySlice';

/**
 * Hook để lấy và sử dụng categories
 * @param autoFetch - Tự động fetch khi component mount (default: true)
 * @param searchQuery - Query để search categories (optional)
 * @returns { categories, searchCategories, loading, error, refetch, searchType, totalPage }
 */
export const useCategories = (autoFetch: boolean = true, searchQuery?: string) => {
	const dispatch = useAppDispatch();
	const { categories, searchCategories, loading, error, searchType, totalPage } = useAppSelector(
		state => state.category
	);

	useEffect(() => {
		if (autoFetch) {
			dispatch(getCategories(searchQuery));
		}
	}, [autoFetch, searchQuery, dispatch]);

	const refetch = (query?: string) => {
		dispatch(getCategories(query));
	};

	// Trả về categories phù hợp dựa trên searchType
	const displayCategories = searchType ? searchCategories : categories;

	return {
		categories: displayCategories,
		searchCategories,
		loading,
		error,
		refetch,
		searchType,
		totalPage,
	};
};
