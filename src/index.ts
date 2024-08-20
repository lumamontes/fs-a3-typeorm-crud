import * as express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/users";
import authorRoutes from "./routes/authors";
import { Comment } from "./entity/Comment";
import { User } from "./entity/User";
import { Not } from "typeorm";
import { Post } from "./entity/Post";

AppDataSource.initialize()
  .then((connection) => {
    const app = express();
    console.log("Iniciando servidor...");
    app.use(express.json());
    app.use("/api", userRoutes, authorRoutes);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

// import express from "express";
// import { Not } from "typeorm";
// import { findAll, findById, store, update, deleteUser } from "./controllers/usersController";
// import { AppDataSource } from "./data-source";

// // import { User } from "./entity/User";
// // import { Post } from "./entity/Post";

// const router = express.Router();

// AppDataSource.initialize()
//   .then(async () => {
//     console.log("Loading users from the database...");
//     const users = await AppDataSource.manager.find(User);
//     console.log("Loaded users: ", users);

//     for (const user of users) {
//       const userDeleted = await AppDataSource.manager.delete(User, user.id);
//       console.log("deleted user:", userDeleted);
//     }

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await AppDataSource.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Inserting a new user into the database...");
//     const user2 = new User();
//     user2.firstName = "John";
//     user2.lastName = "Doe";
//     user2.age = 25;
//     await AppDataSource.manager.save(user2);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Check again all users from the database...");
//     const newUsers = await AppDataSource.manager.find(User);
//     console.log("Loaded newUsers: ", newUsers);

//     console.log("Search for specific user...");
//     const specificUsers = await AppDataSource.manager.find(User, {
//       where: { firstName: "John" },
//     });
//     console.log("Loaded specificUsers: ", specificUsers);

//     console.log("Search with joins");
//     const leftJoinUsers = await AppDataSource.manager.find(User, {
//       where: {
//         firstName: Not("Jose"),
//       },
//       relations: {
//         posts: true,
//       },
//     });

//     console.log("Loaded leftJoinUsers: ", leftJoinUsers);

//     console.log("Search with select joins");
//     const selectJoinUsers = await AppDataSource.manager.find(User, {
//       where: {
//         firstName: Not("Jose"),
//       },
//       relations: {
//         posts: true,
//       },
//       relationLoadStrategy: "query",
//     });
//     console.log("Loaded selectJoinUsers: ", selectJoinUsers);

//     console.log("Search with inner joins");
//     const innerJoinUsers = await AppDataSource.manager.find(User, {
//       where: {
//         firstName: Not("Jose"),
//         posts: {
//           id: Not(0),
//         },
//       },
//       relations: {
//         posts: true,
//       },
//     });
//     console.log("Loaded innerJoinUsers: ", innerJoinUsers);

//     const JohnUser = await AppDataSource.manager.findOne(User, {
//       where: {
//         firstName: "John",
//       },
//     });

//     console.log("Inserting a new post into the database...");

//     const post1 = new Post();
//     post1.title = "LeftJoin com TypeORM";
//     post1.text = "Como fazer um left join com TypeORM";
//     post1.user = JohnUser;
//     const pCreated = await AppDataSource.manager.save(post1);

//     console.log("Created post: ", pCreated);

//     console.log('Using query builders...');
//     const firstUser = await AppDataSource.createQueryBuilder(User, "user")
//         .where("user.firstName = :name", { name: "John" })
//         .getOne();
//     console.log("First user: ", firstUser);

//     console.log("Using query builder for left join ... ");
//     const allUsersWithPost = await AppDataSource.createQueryBuilder(User, "user")
//           .leftJoinAndSelect("user.posts", "posts")
//           .where("user.firstName = :name", { name: "John" })
//           .getMany();
//     console.log("All users with post: ", allUsersWithPost);

//     console.log("Using query builder for inner join ... ");
//     const allUsersWithPostInner = await AppDataSource.createQueryBuilder(User, "user")
//           .innerJoinAndSelect("user.posts", "posts")
//           .where("user.firstName = :name", { name: "John" })
//           .getMany();
//     console.log("All users with post inner: ", allUsersWithPostInner);

//     console.log("Repository..");
//     const postRepository = AppDataSource.getRepository(Post).extend({
//       findByTitleAndText(title: string, text: string) {
//         return this.createQueryBuilder("post")
//           .where("post.title = :title", { title })
//           .andWhere("post.text = :text", { text: `%${text}%` })
//           // .andWhere("post.text = :text", { text })
//           .getMany();
//       }
//     })

//     const posts = await postRepository.findOne({ where: { user: JohnUser } })
//     console.log("Posts: ", posts);

//     const postsWithTitleAndText = await postRepository.findByTitleAndText("LeftJoin com TypeORM", "TypeORM");
//     console.log("Posts with title and text: ", postsWithTitleAndText);

//     const rawData = await AppDataSource.query("SELECT * FROM user");
//     console.log("Raw data: ", rawData);

//   })
//   .catch((error) => console.log(error));


// AppDataSource.initialize().then(async () => {
//   console.log("leftJoinComments")
//   const leftJoinComments = await AppDataSource.manager?.find(User, {
//     where: {
//       name: Not("JOSE"),
//     },
//     relations: {
//       comments: true,
//     },
//   });
//   console.log(leftJoinComments)

//   console.log("selectJoinComments")
//   const selectJoinComments = await AppDataSource.manager?.find(User, {
//     where: {
//       name: Not("JOSE"),
//     },
//     relations: {
//       comments: true,
//     },
//     relationLoadStrategy: "query"
//   });
//   console.log(selectJoinComments)

//   console.log("innerJoinComments")
//   const innerJoinComments = await AppDataSource.manager?.find(User, {
//     where: {
//       name: Not("JOSE"),
//       comments: {
//         id: Not(0)
//       }
//     },
//     relations: {
//       comments: true,
//     },
//   });
//   console.log(innerJoinComments)

//   const findPostUser = await AppDataSource.manager?.findOne(User, {
//     where: {
//       id: 2
//     }
//   })

//   const comment1 = new Comment()
//   comment1.text = 'post comment'
//   comment1.user = findPostUser

//   const commentCreate = await AppDataSource.manager.save(comment1)
// }).catch(error => console.log(error))

