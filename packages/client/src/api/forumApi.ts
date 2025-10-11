import apiInstance from './fetch';
import { CreateTopicRequest, GetTopicsResponse, Topic } from './types';

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
}

const forumApi = new ForumApi();

export default forumApi;
