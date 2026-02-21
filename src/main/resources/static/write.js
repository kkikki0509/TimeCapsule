const upload = document.querySelector("#upload-write");
const title_input = document.querySelector(".title");
const name_input = document.querySelector(".name");
const write_input = document.querySelector("#write");
const pw_input = document.querySelector("#pw");

/* 이벤트 리스너 */
// 작성하기
upload.addEventListener("click", (event) => {
  if (check()) {
    save({
      title: title_input.value,
      name: name_input.value,
      content: write_input.value,
      pw: pw_input.value,
    });
  }
});

/* fetch API */
// 데이터 저장
const save = function (data) {
  fetch("/api/letters", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) throw new Error("NOT OK");
      alert("데이터가 저장되었습니다!");

      // input 초기화
      title_input.value = "";
      name_input.value = "";
      write_input.value = "";
      pw_input.value = "";

      // 데이터 불러오기
      window.location.href = "/main.html"; // main.html 이동
    })
    .catch((error) => {
      alert("데이터 저장에 실패했습니다!");
    });
};

/* 함수 */
// input 값 비어있는지 검사
const check = function () {
  if (title_input.value != "" && name_input.value != "" &&  write_input.value != "" && pw_input.value != "") {
    // 정규표현식을 통한 숫자 검사
    if(/^\d+$/.test(pw_input.value)) return true;
    else alert("비밀번호는 숫자만 입력 가능합니다.");
  }
  else alert("입력하지 않은 항목이 있습니다.");
  return false;
};
