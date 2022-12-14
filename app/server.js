"use strict";

/* http 사용
// http를 쓰면 if문으로 url별 로직을 구현해줘야 되는데 때문에 express를 쓰는 것
const http = require("http");
const app = http.createServer((req, res) => {
  // console.log(req.url); // localhost:3001 다음의 url이 찍힘
  if(req.url === "/") {
    res.end("here is free");
  } else if (req.url === "/login") {
    res.end("here is login page");
  }
});

app.listen(3001, () => {
  console.log("http server on");
});
*/
//--------------------------------------------------------------------

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const dotenv = require("dotenv");
const app = express();

dotenv.config();
const accessLogStream = require("./src/config/log");

// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

/**
 * Static file의 경로를 지정해주는 것
 * static 파일들은 클라에서 동작하는 js, html, css같은 리소스파일을 지칭
 * 이것들은 변하지 않는 데이터들이므로 따로 관리해주기 위함
 */
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 같은 무자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(morgan("common", { stream: accessLogStream }));

app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드.

module.exports = app;
// .listen()을 치면 로컬에서 서버를 열 수 있음
// app.listen(PORT, () => {
//   console.log('listening on 8080')
// });
