import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ForumState, TTopic, TTopicPreview } from './types';
import forumApi from '../../api/forumApi';
import { mapGetTopicResponse, mapGetTopicsResponse, mapTopic } from './mappers';
import { CreateTopicRequest, GetTopicRequest } from '../../api/types';

const initialState: ForumState = {};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    setTopics: (state, action: PayloadAction<TTopicPreview[]>) => {
      state.topics = action.payload;
    },
    addTopic: (state, action: PayloadAction<TTopicPreview>) => {
      state.topics = state.topics ? [...state.topics, action.payload] : undefined;
    },
    setTopic: (state, action: PayloadAction<TTopic>) => {
      state.currentTopic = action.payload;
    },
    resetTopic: (state) => {
      state.currentTopic = null;
    },
  },
});

export const { setTopics, addTopic, setTopic } = forumSlice.actions;

export const getTopics = async (cookie?: string) => {
  const topics = await forumApi.getTopics(cookie);
  return mapGetTopicsResponse(topics);
};

export const createTopic = async (request: CreateTopicRequest, cookie?: string) => {
  const topic = await forumApi.createTopic(request, cookie);
  return mapTopic(topic);
};

export const getTopic = async (request: GetTopicRequest, cookie?: string) => {
  const topic = await forumApi.getTopic(request, cookie);
  return mapGetTopicResponse(topic);
};

export const forumReducer = forumSlice.reducer;
