import express, { json } from "express";
import mongoose from "mongoose";
import multer from "multer";
import {
  userController,
  productController,
} from "./controllers/controllers.js";
import "dotenv/config";
import cors from "cors";
import { checkAuth } from "./utils/utils.js";

const SERVER_PASSWORD = process.env.SERVER_PASSWORD;

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${SERVER_PASSWORD}@cluster0.c7q6vtk.mongodb.net/streetwear`
  )
  .then(() => console.log("Db work"))
  .catch((err) => console.log("Db error", err));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const app = express();

// const upload = multer({ storage });
const port = 8000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Server",
  });
});

app.post("/auth/register", userController.register);
app.post("/auth/login", userController.login);
app.get("/getUser", userController.getUser);
app.get("/auth/me", checkAuth, userController.getMe);

app.post("/createProduct", checkAuth, productController.create);
app.get("/products", productController.getAll);
app.delete("/product/:id", productController.remove);
app.put(
  "/product/:id",
  productController.update
);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server work");
});
