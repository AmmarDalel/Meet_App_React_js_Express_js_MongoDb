import "reflect-metadata";
import express  from "express";

import router from "./Router/UserRouter";

const app = express();
const port = 3000;

app.use(router);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

