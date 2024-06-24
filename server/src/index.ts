import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./ormconfig";
import { User } from "./entity/User";

const app = express();
const port = 3000;

AppDataSource.initialize().then(async () => {
  console.log("Data Source has been initialized!");

  const userRepository = AppDataSource.getRepository(User);

  app.use(express.json());

  app.get("/", async (req, res) => {
    const users = await userRepository.find();
    res.json(users);
    
  });

  app.post("/users", async (req, res) => {
    const user = userRepository.create(req.body);
    const result = await userRepository.save(user);
    res.send(result);
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("Error during Data Source initialization:", err);
});
