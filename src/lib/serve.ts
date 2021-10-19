import express from "express";
import open from "open";

const app = express();

app.use(express.static("build"));

app.listen(2056);

console.log(`${"[listening:2056]"}`);

setTimeout(() => {
  open("http://localhost:2056");
}, 1000);
