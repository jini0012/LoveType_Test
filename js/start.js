const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

function addAnswer(answerText, qIndex) {
  const a = document.querySelector(".answerBox");
  const answer = document.createElement("button");
  answer.classList.add("answerList");
  a.appendChild(answer);
  answer.textContent = answerText;

  answer.addEventListener("click", function () {
    const children = document.querySelectorAll(".answerList");

    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.display = "none";
    }
    goNext(qIndex + 1);
  });
}

function goNext(qIndex) {
  const q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIndex].q;
  const a = document.querySelector(".answerBox");

  for (let i in qnaList[qIndex].a) {
    addAnswer(qnaList[qIndex].a[i].answer, qIndex);
  }
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
