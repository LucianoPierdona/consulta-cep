const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { consultarCep } = require("correios-brasil");

// Default Configuration
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Render Initial Page
app.get("/", (req, res) => {
  res.render("index");
});

// Result Page
app.post("/", (req, res) => {
  const cepConsultado = req.body.consulta;

  // Get data from the correios api
  consultarCep(cepConsultado).then((response) => {
    return res.render("consulta", {
      cep: response.cep,
      cidade: response.localidade,
      uf: response.uf,
    });
  });
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
