import { Entity, Column, OneToMany } from "typeorm";

import { User } from "./User";
import { Post } from "./Post";
import { Comment } from "./Comment";

@Entity()
export class Author extends User {
  @Column()
  tags: string;

  @Column()
  surname: string;

  @Column()
  completeName: string;

  @OneToMany(() => Post, (post) => post.author, { onDelete: "CASCADE" })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author, {
    onDelete: "CASCADE",
  })
  comments: Comment[];
}
