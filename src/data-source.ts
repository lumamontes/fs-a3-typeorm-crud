import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Author } from "./entity/Author";
import { Comment } from "./entity/Comment";
import { Migration1724298601877 } from "./migration/1724298601877-migration";
import { AddCommentsFromUser1724110831381 } from "./migration/1724110831381-addCommentsFromUser";
import { AddCommentsToPost1724113847076 } from "./migration/1724113847076-addCommentsToPost";
import { AddCascate1724181614396 } from "./migration/1724181614396-addCascate";
import { Migration1724299755076 } from "./1724299755076-migration";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: false,
  logging: true,
  entities: [User, Post, Author, Comment],
  migrations: [
    Migration1724298601877,
    AddCommentsFromUser1724110831381,
    AddCommentsToPost1724113847076,
    AddCascate1724181614396,
    Migration1724299755076
  ],
  subscribers: [],
});
