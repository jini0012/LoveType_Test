const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

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
}

function addAnswer(answerText, qIndex) {
  const a = document.querySelector(".answerBox");
  const answer = document.createElement("button");
  answer.classList.add("answerList");
  answer.classList.add("my-3");
  answer.classList.add("py-3");
  answer.classList.add("fadeIn");
  a.appendChild(answer);
  answer.textContent = answerText;

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
    addAnswer(qnaList[qIndex].a[i].answer, qIndex);
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
