import { AdviceModel } from './../model/adviceModel';
interface user {
  email: string;
  nickName: string;
  point?: number;
  status?: number;
  grade?: number;
}

interface post {
  userId: number;
  content?: string;
  status?: postStatus;
}

interface newPost extends post {
  id: number | string;
}

interface review {
  postId: number | string;
  userId: number;
  content?: string;
}

interface newReview extends review {
  id: number | string;
}

interface postWithReview {
  post: newPost;
  reviews: review[];
}
interface notice {
  title?: string;
  content?: string;
}

interface newNotice extends notice {
  id: number | string;
}

interface advice {
  author: string;
  authorrofile: string;
  message: string;
}
interface main {
  user: user;
  todoReview: newPost[];
  advice: advice;
}
enum postStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
}

enum userEnum {
  USER = 'user',
  GUEST = 'guest',
}

enum point {
  POST = -3,
  REVIEW = 5,
}

interface IReviewModel {
  todoReview(userId: number): Promise<newPost[]>;
  writeReview(review: review): Promise<Boolean>;
  getReviewByPost(postId: number): Promise<review[]>;
  getDoneReviewCount(userId: number): Promise<number>;
  isDone(id: number): Promise<Boolean>;
}
interface IReportModel {
  createReport(type: string, type_id: number, content: string): Promise<report>;
  findAll(page: number): Promise<report[]>;
  findType(type: string, page: number): Promise<report[]>;
}

interface report {
  type?: string;
  typeId?: number;
  content?: string;
}

interface newReport extends report {
  reviewId: number | string;
}

interface IUserModel {
  createUser(user: user): Promise<user>;
  userInfo(id: number): Promise<user>;
  isUser(info: any): Promise<user>;
  isNickName(nickName: string): Promise<Boolean>;
  updatePoint(info: any, deduct: number): Promise<void>;
  updateNickname(nickName: string, userId: number): Promise<Boolean>;
}

interface IPostModel {
  posting(post: post): Promise<newPost>;
  getAllUsersCount(): Promise<number>;
  createReview(targetUser: number[], postId: number): Promise<void>;
  getPosts(userId: number): Promise<newPost[]>;
}
interface INoticeModel {
  createNotice(notice: notice): Promise<notice[]>;
  findNotice(noticeInfo: newNotice): Promise<newNotice[]>;
  findAll(page: number): Promise<notice[]>;
  update(noticeInfo: newNotice, notice: notice): Promise<notice[]>;
  // delete(id: number): Promise<notice[]>;
}

interface IAdviceModel {
  getAdvice(): Promise<advice>;
}
interface IRankModel {
  getRank(): Promise<void>;
}

export {
  user,
  post,
  postStatus,
  userEnum,
  IUserModel,
  IPostModel,
  newPost,
  main,
  review,
  IReviewModel,
  advice,
  IAdviceModel,
  notice,
  newNotice,
  point,
  INoticeModel,
  postWithReview,
  IRankModel,
  IReportModel,
  report,
  newReview,
  newReport,
};
