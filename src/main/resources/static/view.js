import * as Main from "/main.js";
const back = document.querySelector("#back");
const view_title = document.querySelector(".v_title");
const view_name = document.querySelector(".v_name");
const view_write = document.querySelector("#v_write");
const view_pw = document.querySelector("#v_pw");

/* 이벤트 리스너 */
if (back) {
  back.addEventListener("click", () => {
    clear_item();
  });
}

/* fetch API */
// 데이터 열람
const view = function (id) {
  fetch(`/api/letters/${id}`)
    .then((response) => {
      if (!response.ok) throw new Error("NOT OK");
      return response.json();
    })
    .then((json) => {
      alert("열람했습니다.");
      load_item(json);
    })
    .catch((error) => {
      alert("열람에 실패하였습니다.");
    });
};

/* 함수 */
// input에 데이터 옮기기
const load_item = function (data) {
  view_title.value = data.title;
  view_name.value = data.name;
  view_write.value = data.content;
  view_pw.value = data.pw;
};

// input에 데이터 삭제
const clear_item = function (data) {
  view_title.value = "";
  view_name.value = "";
  view_write.value = "";
  view_pw.value = "";
};

// url에서 id 찾아오기
const search_id = function(){
  const url_params = new URLSearchParams(window.location.search);
  return url_params.get("id");
}

/* 실행 */
view(search_id());
