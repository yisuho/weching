import { post, IPostModel, newPost, review } from '../interfaces';
import { pg } from '../app';
import { QueryResult } from 'pg';
import { postService } from '../services/postService';

export class PostModel implements IPostModel {
  async posting(post: post): Promise<newPost> {
    const { userId, content } = post;
    const newPost: QueryResult<newPost> = await pg.query(
      'INSERT INTO posts ( user_id, content ) VALUES ($1, $2) RETURNING *',
      [userId, content]
    );

    return newPost.rows[0];
  }
// 백엔드에서 전체 페이지 보여주기
  async getAllUsersCount(): Promise<number> {
    const result: QueryResult<any> = await pg.query(
      `select max(id) from users `
    );

    return result.rows[0].max;
  }

  async createReview(targetUser: number[], postId: number): Promise<void> {
    await Promise.all(
      targetUser.map(
        async (user) =>
          await pg.query(
            `insert into review (user_id, post_id ) VALUES ($1, $2)`,
            [user, postId]
          )
      )
    );
  }

  async getPosts(userId: number): Promise<newPost[]> {
    const getPost = await pg.query(
      `select * from posts where user_id = $1`,
      [userId]
    );
    return getPost.rows;
  }
}

export const postModel = new PostModel();
