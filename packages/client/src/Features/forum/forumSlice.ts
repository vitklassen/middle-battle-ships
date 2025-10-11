import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  ForumState, TComment, TTopic, TTopicPreview,
} from './types';
import forumApi from '../../api/forumApi';
import {
  mapComment, mapGetTopicResponse, mapGetTopicsResponse, mapTopic,
} from './mappers';
import { AddCommentRequest, CreateTopicRequest, GetTopicRequest } from '../../api/types';

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
    addComment: (state, action: PayloadAction<TComment>) => {
      if (state.currentTopic) {
        state.currentTopic = {
          ...state.currentTopic,
          comments: [...state.currentTopic.comments, action.payload],
          commentCount: state.currentTopic.commentCount + 1,
        };
      }
    },
  },
});

export const {
  setTopics, addTopic, setTopic, addComment,
} = forumSlice.actions;

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

export const createComment = async (request: AddCommentRequest, cookie?: string) => {
  const comment = await forumApi.addComment(request, cookie);
  return mapComment(comment);
};

export const forumReducer = forumSlice.reducer;
