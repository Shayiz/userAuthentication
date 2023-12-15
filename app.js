const express =require("express")
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express')
const bodyParser = require("body-parser");
const userRouter = require('./user/router')
const adminRouter = require('./admin/router')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const swaggerDocument = yaml.load("./apidoc/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/", (req, res) => {
    res
      .status(200)
      .send(
        `Welcome!. Please got to <a href="./api-docs/">docs</a> to see swagger UI`
      );
  });
  app.use("/user", userRouter);
  app.use("/admin", adminRouter);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(400).send({ error: err.message });
  });

module.exports = app