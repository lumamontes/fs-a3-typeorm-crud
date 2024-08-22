import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Post } from "./entity/Post"
import { Author } from "./entity/Author"
import { Comment } from "./entity/Comment"
import { Migration1724295151828 } from "./migration/1724295151828-migration"

export const AppDataSource = new DataSource({ 
    type: "sqlite",
    database: "database.sqlite",
    synchronize: false,
    logging: true,
    entities: [User, Post, Author, Comment],
    migrations: [Migration1724295151828],
    subscribers: [],
})
