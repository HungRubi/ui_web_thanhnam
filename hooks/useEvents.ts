"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getEventById, getEvents } from "@/store/eventSlice";

export const useEvents = (autoFetch: boolean = true, searchQuery?: string) => {
  const dispatch = useAppDispatch();
  const { events, searchEvents, loading, error, searchType } = useAppSelector(
    (state) => state.event
  );

  useEffect(() => {
    if (autoFetch) {
      dispatch(getEvents(searchQuery));
    }
  }, [autoFetch, searchQuery, dispatch]);

  const refetch = (query?: string) => {
    dispatch(getEvents(query));
  };

  const displayEvents = searchType ? searchEvents : events;

  return {
    events: displayEvents,
    searchEvents,
    loading,
    error,
    refetch,
    searchType,
  };
};

export const useEventById = (id?: string, autoFetch: boolean = true) => {
  const dispatch = useAppDispatch();
  const { currentEvent, loading, error } = useAppSelector((state) => state.event);

  useEffect(() => {
    if (autoFetch && id) {
      dispatch(getEventById(id));
    }
  }, [autoFetch, id, dispatch]);

  const refetch = () => {
    if (id) {
      dispatch(getEventById(id));
    }
  };
  
  return {
    event: currentEvent,
    loading,
    error,
    refetch,
  };
};


