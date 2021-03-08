const quotesURL = "http://localhost:3000/quotes";
const likesURL = "http://localhost:3000/likes";
const embededURL = "http://localhost:3000/quotes?_embed=likes";
const form = document.getElementById("new-quote-form");
form.addEventListener("submit", (e) => newQuote(e));
const ul = document.getElementById("quote-list");

function getQuotes() {
  fetch(embededURL)
    .then((res) => res.json())
    .then((quotesArray) => displayQuotes(quotesArray))
    .catch((error) => console.error("ERROR:", error));
}

function displayQuotes(quotesArray) {
  //set attribute of li with quote id
  quotesArray.forEach((element) => {
    let likesCount = element.likes.length;
    let li = document.createElement("li");

    let quote = document.createElement("h5");
    quote.textContent = element.quote;
    let author = document.createElement("h6");
    author.textContent = element.author;
    let likes = document.createElement("p");
    likes.textContent = "Likes:" + likesCount;
    let deleBtn = document.createElement("button");
    deleBtn.textContent = "Delete";
    deleBtn.addEventListener("click", (e) => deleteQuote(e));
    deleBtn.setAttribute("id", element.id);
    li.appendChild(quote);
    quote.appendChild(author);
    author.append(likes, deleBtn);
    ul.appendChild(li);
  });
}

function deleteQuote(e) {
  ul.removeChild(e.target.parentNode.parentNode.parentNode);
}

function newQuote(e) {
  e.preventDefault();
  let author = form.author.value;
  let quote = form.quote.value;

  let newQ = {
    quote: quote,
    author: author,
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQ),
  };

  fetch(quotesURL, configObj)
    .then((res) => res.json())
    .then((res) => {
      getRidOfThemHoes(ul);
      getQuotes();
    })
    .catch((error) => console.error("ERROR:", error));
}

function getRidOfThemHoes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
    console.log("THE YOUNGLINGS! ANAKIN YOU KILLED THEM ALL");
  }
}

getQuotes();
