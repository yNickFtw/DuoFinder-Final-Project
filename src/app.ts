import express from "express";
import cors from "cors";
import connection from "./database/config";
import routes from "./routes/index";

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, accept, access-control-allow-origin"
  );

  if ("OPTIONS" == req.method) res.send(200);
  else next();
});

app.use(express.json());
app.use(routes);

const port = 8080;

connection
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`Server Running on port: ${port}`);
    });
  })
  .catch((err) => console.log(err));
