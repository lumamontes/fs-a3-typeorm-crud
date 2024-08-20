import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne(() => Author, (author) => author.posts, {
    onDelete: "CASCADE",
  })
  author: Author;
}
