import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import order_routes from "./handlers/order";
import product_routes from "./handlers/product";
import user_routes from "./handlers/user";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";
const port = process.env.EXPRESS_PORT;

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Server is up and running!");
});

order_routes(app);
product_routes(app);
user_routes(app);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, function () {
    console.log(`starting app on: ${address}`);
  });
}

export default app;
