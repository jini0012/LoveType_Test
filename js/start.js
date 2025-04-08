const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const selectList = [];

function calcResult() {
  const pointArray = [
    { name: "mouse", value: 0, key: 0 },
    { name: "cow", value: 0, key: 1 },
    { name: "tiger", value: 0, key: 2 },
    { name: "rabbit", value: 0, key: 3 },
    { name: "dragon", value: 0, key: 4 },
    { name: "snake", value: 0, key: 5 },
    { name: "horse", value: 0, key: 6 },
    { name: "sheep", value: 0, key: 7 },
    { name: "monkey", value: 0, key: 8 },
    { name: "chick", value: 0, key: 9 },
    { name: "dog", value: 0, key: 10 },
    { name: "pig", value: 0, key: 11 },
  ];

  for (let i = 0; i < selectList.length; i++) {
    const target = qnaList[i].a[selectList[i]].type;
    for (let j = 0; j < target.length; j++) {
      for (let k = 0; k < pointArray.length; k++) {
        if (target[j] === pointArray[k].name) {
          pointArray[k].value++;
        }
      }
    }
  }

  const resultArray = pointArray.sort((a, b) => {
    if (a.value > b.value) return -1;
    if (a.value < b.value) return 1;
    return 0;
  });

  let resultType = resultArray[0].key;

  return resultType;
}

function goResult() {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450);
  });
  calcResult();
}

function addAnswer(answerText, qIndex, aIndex) {
  const a = document.querySelector(".answerBox");
  const answer = document.createElement("button");
  answer.classList.add("answerList");
  answer.classList.add("my-3");
  answer.classList.add("py-3");
  answer.classList.add("fadeIn");
  a.appendChild(answer);
  answer.textContent = answerText;

  // 사용자의 answer 버튼 선택 이벤트 처리 로직
  answer.addEventListener(
    "click",
    function () {
      const children = document.querySelectorAll(".answerList");

      for (let i = 0; i < children.length; i++) {
        children[i].disabled = true;
        children[i].style.WebkitAnimation = "fadeOut 0.5s";
        children[i].style.animation = "fadeOut 0.5s";
      }
      setTimeout(() => {
        selectList[qIndex] = aIndex; // 사용자가 어떤 버튼에서 어떤 답변을 선택했는지 저장
        for (let i = 0; i < children.length; i++) {
          children[i].style.display = "none";
        }
        goNext(++qIndex);
      }, 450);
    },
    false
  );
}

function goNext(qIndex) {
  // 전체 질문 개수에 도달했을 때 결과 페이지로 이동
  if (qIndex === qnaList.length) {
    goResult();
    return;
  }

  const q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIndex].q;
  const a = document.querySelector(".answerBox");

  for (let i in qnaList[qIndex].a) {
    addAnswer(qnaList[qIndex].a[i].answer, qIndex, i);
  }

  const progress = document.querySelector(".progress");
  const progressBar = document.querySelector(".progress-bar");
  progressBar.style.width = (100 / qnaList.length) * (qIndex + 1) + "%";
  progress.setAttribute(
    "aria-valuenow",
    Math.trunc(((qIndex + 1) / qnaList.length) * 100)
  );
  progressBar.textContent =
    Math.trunc(((qIndex + 1) / qnaList.length) * 100) + "%";
}

function start() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450);
    let qIndex = 0;
    goNext(qIndex);
  }, 450);
}
