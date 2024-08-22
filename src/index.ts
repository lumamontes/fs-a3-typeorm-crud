import * as express from "express";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/users";
import authorRoutes from "./routes/authors";
import postRoutes from "./routes/posts";

AppDataSource.initialize()
  .then((connection) => {
    const app = express();
    console.log("Iniciando servidor...");
    app.use(express.json());
    app.use("/api", userRoutes, authorRoutes);
    app.use("/api", userRoutes, postRoutes);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
