"use strict";

// 여기는 login.ejs와 연결되어 있는 Front js

// 이  ""는 HTML의 id
const id = document.querySelector("#id"),
  password = document.querySelector("#password"),
  loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);


function login() {
  // view에서 넘어온 데이터 객체에 담기
  const req = {
    id: id.value,
    password: password.value,
  };

  // 어떤 경로로 데이터를 보내줄지 정해줘야 함
  fetch("/login", {
    // body라는 key값으로 req 데이터를 JSON형태로 감싸서 전달
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 내가 보내는 데이터 타입은 JSON이다.
    },
    body: JSON.stringify(req), // req를 JSON형태로 감싸서 body에 담아 전달
  })
    /**
     * .then()을 쓰면 Promise데이터가 날아옴
     * 이 Promise 데이터를 받기 위해서는 다시 then()으로 받아야 함
     * Promise 타입은 then()메소드로 접근 가능
     */
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("로그인 중 에러 발생"));
    }); // 서버에서 응답한 데이터를 다시 받기 위해 then()
}
