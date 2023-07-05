const choiceList = document.querySelectorAll(".choice");

const titleBtn = document.querySelectorAll(".choice")[0];
const castBtn = document.querySelectorAll(".choice")[1];

const inputBtn = document.querySelector("#inputBtn");

const searchField = document.querySelector("#searchField");
const refreshBtn = document.querySelector("#refresh");

const titleUrl = "https://api.tvmaze.com/search/shows?q=";
const castUrl = "https://api.tvmaze.com/search/people?q=";
let queryUrl = titleUrl;

const dict = {};
dict[titleBtn.innerHTML] = titleUrl;
dict[castBtn.innerHTML] = castUrl;

const getResults = async (url) => {
  const res = await axios.get(url);
  console.log("Data: ", res.data);
};

const changeQuery = (elem) => {
  if (!elem.classList.contains("selected")) {
    queryUrl = dict[elem.innerHTML];
    for (let index = 0; index < choiceList.length; index++) {
      choiceList[index].classList.toggle("selected");
    }
  }
};
inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (queryUrl != undefined) {
    let finalQuery = queryUrl + searchField.value;
    if (searchField.value.length != 0) {
      console.log(finalQuery);
      getResults(finalQuery);
    }
    searchField.value = "";
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
});
