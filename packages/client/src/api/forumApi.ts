import apiInstance from './fetch';
import {
  AddCommentRequest,
  AddReactionRequest,
  Comment,
  CreateTopicRequest, GetTopicRequest, GetTopicResponse, GetTopicsResponse, Topic,
} from './types';

export class ForumApi {
  getTopics(cookie?: string) {
    return apiInstance.get<GetTopicsResponse>('/topics', {
      headers: { cookie },
    });
  }

  createTopic(request: CreateTopicRequest, cookie?: string) {
    return apiInstance.post<Topic>('/topics', {
      data: request,
      headers: { cookie },
    });
  }

  getTopic(request: GetTopicRequest, cookie?: string) {
    return apiInstance.get<GetTopicResponse>(`/topics/${request.id}`, {
      headers: { cookie },
    });
  }

  addComment(request: AddCommentRequest, cookie?: string) {
    return apiInstance.post<Comment>(`/topics/${request.topicId}/comment`, {
      data: { comment_id: request.commentId, content: request.content },
      headers: {
        cookie,
      },
    });
  }

  addReaction(request: AddReactionRequest, cookie?: string) {
    return apiInstance.post('/reactions', {
      data: request,
      headers: {
        cookie,
      },
    });
  }
}

const forumApi = new ForumApi();

export default forumApi;
