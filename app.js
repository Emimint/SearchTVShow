const choiceList = document.querySelectorAll(".choice");

const titleBtn = document.querySelectorAll(".choice")[0];
const castBtn = document.querySelectorAll(".choice")[1];

const inputBtn = document.querySelector("#inputBtn");
const searchField = document.querySelector("#searchField");
const refreshBtn = document.querySelector("#refresh");

const resultSection = document.querySelector(".result");

const titleUrl = "https://api.tvmaze.com/search/shows?q=";
const castUrl = "https://api.tvmaze.com/search/people?q=";
let queryUrl = titleUrl;

const dict = {};
dict[titleBtn.innerHTML] = titleUrl;
dict[castBtn.innerHTML] = castUrl;

const getResults = async (url) => {
  const res = await axios.get(url);
  // console.log( "Data: ", res.data );
  return res.data;
};

const changeQuery = (elem) => {
  if (!elem.classList.contains("selected")) {
    queryUrl = dict[elem.innerHTML];
    for (let index = 0; index < choiceList.length; index++) {
      choiceList[index].classList.toggle("selected");
    }
  }
};

const hideDisplay = () => {
  const searchSection = document.querySelector(".search");
  console.log(searchSection);
  const formSection = document.querySelector("form");

  searchSection.classList.add("hidden");
  formSection.classList.add("hidden");
};

const fixAnchors = () => {
  var anchors = document.getElementsByTagName("a");
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].setAttribute("target", "_blank");
  }
};

const displayResults = (data) => {
  if (data.length != 0) {
    const searchRes = titleBtn.classList.contains("selected")
      ? "show"
      : "person";
    for (var result of data) {
      const { url, name } = result[searchRes];
      const image = result[searchRes].image
        ? result[searchRes].image.medium
        : "img/no-img-portrait-text.png";

      const divResult = document.createElement("div");
      const imgDisplay = document.createElement("img");
      const urlDisplay = document.createElement("a");

      // resultSection.style.height = "500px";
      // imgDisplay.style.width = "50%";
      // nameDisplay.append(urlDisplay);

      imgDisplay.src = image;

      urlDisplay.href = url;
      urlDisplay.innerHTML = name;
      urlDisplay.style.padding = "0.5rem";

      divResult.append(imgDisplay);
      divResult.append(urlDisplay);

      divResult.style.padding = "0.5rem";

      resultSection.append(divResult);
      fixAnchors();
    }
  } else {
    throw new Error();
  }
};

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (queryUrl != undefined) {
    let finalQuery = queryUrl + searchField.value;
    if (searchField.value.length != 0) {
      console.log(finalQuery);
      getResults(finalQuery)
        .then((res) => {
          displayResults(res);
        })
        .catch(() => {
          const errMessage = document.createElement("div");
          errMessage.innerHTML = "Nothing to show...";
          errMessage.style.fontSize = "2rem";

          const middleSection = document.querySelector(".middle");
          middleSection.append(errMessage);
        });
    }
    searchField.value = "";
    hideDisplay();
  }
});

titleBtn.addEventListener("click", () => {
  changeQuery(titleBtn);
});
castBtn.addEventListener("click", () => {
  changeQuery(castBtn);
});

refreshBtn.addEventListener("click", () => {
  window.location.reload();
  window.scrollTo(0, 0);
});
