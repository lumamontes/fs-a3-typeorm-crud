import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from "typeorm";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];


  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];
}
