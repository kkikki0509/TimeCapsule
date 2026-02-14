import * as Date from "/date.js";
import * as View from "/view.js";
const content = document.querySelector("#content");
const search_btn = document.querySelector("#search");

/* 이벤트 리스너 */
// 검색하기
if (search_btn) {
  search_btn.addEventListener("click", () => {
    const val = document.querySelector("#search-input").value;
    const date = document.querySelector("#calendar").value;
    const select_option = document.querySelector("#search-option").value;
    search(val, date, select_option);
  });
}

/* fetch API */
// 데이터 불러오기
export const load = function () {
  fetch("/api/letters")
    .then((response) => {
      if (!response.ok) throw new Error("NOT OK");
      return response.json();
    })
    .then((json) => {
      // 화면 초기화
      clear();

      // 값 없을 때
      if (json.length == 0) {
        add_nolist();
        return;
      }

      // 값 있을 때
      json.forEach((element) => {
        add_item(element);
      });
    })
    .catch((error) => {
      alert("데이터를 불러오는데 실패했습니다!");
      clear();
      add_nolist();
    });
};

// 데이터 검색하기
const search = function (val, date, select_option) {
  fetch(`/api/letters/search?${isdate(val, date, select_option)}`)
    .then((response) => {
      if (!response.ok) throw new Error("NOT OK");
      return response.json();
    })
    .then((json) => {
      // 화면 초기화
      clear();

      // 해당 값 없을 시
      if (json.length == 0) {
        add_nolist();
        return;
      }

      // 해당 값 있을 때
      json.forEach((element) => {
        add_item(element);
      });
    })
    .catch((error) => {
      clear();
      add_nolist();
      alert("데이터를 불러오는데 실패했습니다!");
    });
};

// 데이터 삭제하기
const del = function (id, pw) {
  fetch(`/api/letters/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pw: pw })
  })
    .then((response) => {
      if (!response.ok) throw new Error("NOT OK");
      alert("삭제되었습니다.");
      load();
    })
    .catch((error) => {
      alert("삭제에 실패하였습니다.");
    });
};

/* 함수 */
// item(목록) 추가
const add_item = function (data) {
  // 잠금 여부
  let lock;
  if (islock(data)) lock = "🔓";
  else lock = "🔒";

  const item = `
        <div class="item" id="${data.id}">
            <div class ="title">
              <p>${data.title}</p>
            </div>
            <div class ="name">
              <p>${data.name}</p>
            </div>
            <div class ="lock">
              <p>${lock}</p>
            </div>
        </div>`;

  content.insertAdjacentHTML("beforeend", item);

  // 각 item에 리스너 부여
  const last_item = content.lastElementChild;
  last_item.addEventListener("click", () => {
    msg(data);
  });
};

// 화면 초기화
const clear = function () {
  content.innerHTML = "";
  content.classList.remove("active");
};

// 데이터 없음 문구
const add_nolist = function () {
  const message = `<p>No List</p>`;
  content.insertAdjacentHTML("beforeend", message);
  content.classList.add("active");
};

// 기간 검사(1년)
const islock = function (data) {
  if (data.endDate <= Date.current()) return true;
  else return false;
};

// 메시지 입력
const msg = function (data) {
  const num = prompt("번호 입력(1. 열람 / 2. 삭제 / 3. 취소)");
  if (num == "1") {
    if (islock(data)) View.view(data.id);
    else alert("열람 기간이 아닙니다.");
  } else if (num == "2") {
    const pw = prompt("비밀번호 입력");
    del(data.id, pw);
  }
};

// spring 처리를 위해 객체 변환
const isdate = function (val, date, select_option) {
  if (date == "") {
    return new URLSearchParams({
      keyword: val,
      type: select_option,
    }).toString();
  }
  return new URLSearchParams({
    keyword: val,
    type: select_option,
    date: date,
  }).toString();
};

/* 실행 */
if (content) load();
