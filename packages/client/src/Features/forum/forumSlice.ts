import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ForumState, TTopic } from './types';
import forumApi from '../../api/forumApi';
import { mapGetTopicsResponse, mapTopic } from './mappers';
import { CreateTopicRequest } from '../../api/types';

const initialState: ForumState = {};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setTopics: (state, action: PayloadAction<TTopic[]>) => {
      state.topics = action.payload;
    },
    addTopic: (state, action: PayloadAction<TTopic>) => {
      state.topics = state.topics ? [...state.topics, action.payload] : undefined;
    },
  },
});

export const { setTopics, addTopic } = forumSlice.actions;

export const getTopics = async (cookie?: string) => {
  const topics = await forumApi.getTopics(cookie);
  return mapGetTopicsResponse(topics);
};

export const createTopic = async (request: CreateTopicRequest, cookie?: string) => {
  const topic = await forumApi.createTopic(request, cookie);
  return mapTopic(topic);
};

export const forumReducer = forumSlice.reducer;
