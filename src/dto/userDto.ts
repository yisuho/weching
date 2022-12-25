import { user } from '../interfaces';
import { Expose, Type, Exclude } from 'class-transformer';
import { IsEmail, MaxLength } from 'class-validator';

export class UserDto implements user {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @MaxLength(12)
  nickName: string;

  @Expose()
  status: number;

  @Expose()
  @Type(() => Number)
  point: number;
}

export class UserEntity {
  @Expose()
  id: number;

  @Exclude()
  @IsEmail()
  email: string;

  @Expose({ name: 'nickname' })
  @MaxLength(12)
  nickName: string;

  @Expose()
  status: number;

  @Expose()
  point: number;

  @Expose({ name: 'post_count' })
  postCount: number;

  @Expose({ name: 'review_count' })
  reviewCount: number;
}
