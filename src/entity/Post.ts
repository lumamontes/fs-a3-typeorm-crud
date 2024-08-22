import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import { Author } from "./Author";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => Author, (author) => author.posts, { onDelete: "CASCADE" })
  author: Author;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
