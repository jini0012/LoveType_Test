document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const type = parseInt(params.get("type"));

  if (!isNaN(type) && infoList[type]) {
    const resultData = document.querySelector("#shareResult");
    resultData.querySelector("#resultName").innerHTML = infoList[type].name;
    resultData.querySelector("#resultDesc").innerHTML = infoList[type].desc;
    resultData.querySelector("img").src = "/img/image-" + type + ".png";
    resultData.querySelector("img").alt = infoList[type].name;
  } else {
    console.warn("잘못된 type 파라미터입니다.");
  }
});
