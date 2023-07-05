const choiceBtns = document.getElementById("choices");
const choiceList = document.querySelectorAll(".choice");

const inputBtn = document.querySelector("#inputBtn");

const searchField = document.querySelector("#searchField");
const refreshBtn = document.querySelector("#refresh");

const titleUrl = "https://api.tvmaze.com/search/shows?q=";
const castUrl = "https://api.tvmaze.com/search/people?q=";
let queryUrl = titleUrl;

const dict = {};
dict[choiceList[0].innerHTML] = titleUrl;
dict[choiceList[1].innerHTML] = castUrl;

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let finalQuery = queryUrl + searchField.value;
  if (searchField.value.length != 0) {
    console.log(finalQuery);
  }
  searchField.value = "";
});

choiceBtns.addEventListener("click", (e) => {
  if (!e.target.classList.contains("selected")) {
    queryUrl = dict[e.target.innerHTML];
    for (let index = 0; index < choiceList.length; index++) {
      choiceList[index].classList.toggle("selected");
    }
  }
});

refreshBtn.addEventListener("click", () => {
  window.location.reload();
});
