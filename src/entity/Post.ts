import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, {
    onDelete: "CASCADE",
  })
  comments: Comment[];
}
