import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  ForumState, Reaction, TComment, TTopic, TTopicPreview,
} from './types';
import forumApi from '../../api/forumApi';
import {
  mapComment, mapGetTopicResponse, mapGetTopicsResponse, mapTopic,
} from './mappers';
import {
  AddCommentRequest, AddReactionRequest, CreateTopicRequest, GetTopicRequest,
} from '../../api/types';

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
        };
      }
    },
    setComment: (state, action: PayloadAction<TComment>) => {
      if (state.currentTopic) {
        const index = state.currentTopic.comments.findIndex((comment) => comment.id === action.payload.id);
        state.currentTopic = {
          ...state.currentTopic,
          comments: [...state.currentTopic.comments.slice(0, index), action.payload, ...state.currentTopic.comments.slice(index + 1)],
        };
      }
    },
  },
});

export const {
  setTopics, addTopic, setTopic, resetTopic, addComment, setComment,
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

export const addReaction = async (request: AddReactionRequest, cookie?: string) => forumApi.addReaction(request, cookie);

export const deleteReaction = async (request: AddReactionRequest, cookie?: string) => forumApi.deleteReaction(request, cookie);

export const forumReducer = forumSlice.reducer;
