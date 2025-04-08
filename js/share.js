const url = "https://mbti-test-phi-six.vercel.app/";

function setShare() {
  const type = calcResult();
  const shareUrl = url + `page/result.html?type=${type}`;
  const shareTitle = "십이간지 연애유형 결과과";
  const shareDecs = infoList[type].name;
  const shareImage = url + "img/image-" + type + ".png";

  Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: shareTitle,
      description: shareDecs,
      imageUrl: shareImage,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: "결과 확인하기",
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  });
}
