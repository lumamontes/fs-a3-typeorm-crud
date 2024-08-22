import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from "typeorm";
import { Post } from "./Post";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
