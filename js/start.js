const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const selectList = Array(12).fill(0);

function calcResult() {
  const selectResult = selectList.indexOf(Math.max(...selectList));
  return selectResult;
}

function setResult() {
  const point = calcResult(); // 가장 많이 선택된 답변의 인덱스 값

  const resultName = document.querySelector("#resultName");
  resultName.innerHTML = infoList[point].name; // 결과 이름

  const resultImg = document.querySelector("#resultImg");
  const image = document.createElement("img");
  const imgURL = "img/image-" + point + ".png"; // 결과 이미지
  image.src = imgURL; // 결과 이미지 경로
  image.alt = infoList[point].name + " 이미지"; // 결과 이미지 대체 텍스트
  image.classList.add("img-fluid"); // 부트스트랩 클래스 추가
  resultImg.appendChild(image); // 결과 이미지

  const resultDesc = document.querySelector("#resultDesc");
  resultDesc.innerHTML = infoList[point].desc; // 결과 설명
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
  setResult();
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
        const target = qnaList[qIndex].a[aIndex].type;
        for (let i = 0; i < target.length; i++) {
          selectList[target[i]]++;
        }

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
