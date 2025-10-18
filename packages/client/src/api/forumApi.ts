import apiInstance from './fetch';
import {
  AddCommentRequest,
  AddReactionRequest,
  Comment,
  CreateTopicRequest, DeleteCommentRequest, EditTopicRequest, GetTopicRequest, GetTopicResponse, GetTopicsResponse, Topic,
} from './types';

export class ForumApi {
  getTopics(cookie?: string) {
    return apiInstance.get<GetTopicsResponse>('/api/topics', {
      headers: { cookie },
    });
  }

  createTopic(request: CreateTopicRequest, cookie?: string) {
    return apiInstance.post<Topic>('/api/topics', {
      data: request,
      headers: { cookie },
    });
  }

  editTopic(request: EditTopicRequest, cookie?: string) {
    return apiInstance.patch(`/api/topics/${request.topicId}`, {
      data: { title: request.title, content: request.content },
      headers: { cookie },
    });
  }

  deleteTopic(id: number, cookie?: string) {
    return apiInstance.delete(`/api/topics/${id}`, {
      headers: { cookie },
    });
  }

  getTopic(request: GetTopicRequest, cookie?: string) {
    return apiInstance.get<GetTopicResponse>(`/api/topics/${request.id}`, {
      headers: { cookie },
    });
  }

  addComment(request: AddCommentRequest, cookie?: string) {
    return apiInstance.post<Comment>(`/api/topics/${request.topicId}/comment`, {
      data: { comment_id: request.commentId, content: request.content },
      headers: {
        cookie,
      },
    });
  }

  deleteComment(request: DeleteCommentRequest, cookie?: string) {
    return apiInstance.delete(`/api/topics/${request.topicId}/comment/${request.commentId}`, {
      headers: { cookie },
    });
  }

  addReaction(request: AddReactionRequest, cookie?: string) {
    return apiInstance.post('/api/reactions', {
      data: request,
      headers: {
        cookie,
      },
    });
  }

  deleteReaction(request: AddReactionRequest, cookie?: string) {
    return apiInstance.delete('/api/reactions', {
      data: request,
      headers: {
        cookie,
      },
    });
  }
}

const forumApi = new ForumApi();

export default forumApi;
