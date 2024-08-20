import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
// import { Initial1723762118880 } from "./migration/1723762118880-initial"
import { Post } from "./entity/Post"
import { AddPostsToUser1724117929158 } from "./migration/1724117929158-addPostsToUser"
// import { AddPostsToUser1723763443238 } from "./migration/1723763443238-addPostsToUser"
// import { AddCascadeToPostsUsers1723765068046 } from "./migration/1723765068046-addCascadeToPostsUsers"
// import { AddFieldsToUser1723773687314 } from "./migration/1723773687314-addFieldsToUser"
import { Author } from "./entity/Author"
// import { AddAuthorEntity1723943155050 } from "./migration/1723943155050-addAuthorEntity"

export const AppDataSource = new DataSource({ 
    type: "sqlite",
    database: "database.sqlite",
    synchronize: false,
    logging: true,
    entities: [User, Post, Author],
    migrations: [AddPostsToUser1724117929158],
    subscribers: [],
})
