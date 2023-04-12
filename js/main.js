const toggleBtn = document.querySelector(".header__toggle__btn");
const form = document.querySelector("form");
const input = document.querySelector("input");
const noFound = document.querySelector(".no_found");
const dictionary = document.querySelector(".dictionary");
const loader = document.querySelector(".loader");
const body = document.body;

let audio;

const darkMode = () => {
  toggleBtn.classList.toggle("dark");
  document.body.getAttribute("data-theme")
    ? document.body.removeAttribute("data-theme")
    : document.body.setAttribute("data-theme", "dark");
  saveThemeStorage();
};

if (localStorage.getItem("theme")) {
  body.setAttribute("data-theme", localStorage.getItem("theme"));
  toggleBtn.classList.add("dark");
} else {
  toggleBtn.classList.remove("dark");
}

const saveThemeStorage = () => {
  if (body.getAttribute("data-theme")) {
    localStorage.setItem("theme", body.getAttribute("data-theme"));
  } else {
    localStorage.removeItem("theme");
  }
};

const saveLocalStorage = (word) => {
  localStorage.setItem("word", JSON.stringify(word));
};

const getData = async (word) => {
  noFound.classList.remove("nodata");
  loader.style.display = "block";
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en";

  const req = await fetch(`${url}/${word}`);
  const data = await req.json();

  if (data.title) {
    dictionary.innerHTML = ``;
    noFound.classList.remove("nodata");
    loader.style.display = "none";
    noFound.classList.add("nodata");
  } else {
    noFound.classList.remove("nodata");
    console.log(data[0]);
    loader.style.display = "none";
    setDictionary(data[0]);
    search(data[0]);
  }
};

const search = (word) => {
  window.location.search = `word=${word.word}`;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.classList.remove("error");
  dictionary.innerHTML = ``;

  if (!input.value.trim()) {
    form.classList.add("error");
    noFound.classList.remove("nodata");
    loader.style.display = "none";
  }

  if (input.value.trim()) {
    getData(input.value);
    loader.style.display = "block";
    // initiateSearch();
  }

  form.reset();
});

const setDictionary = (word) => {
  saveLocalStorage(word);
  word.phonetics.map((phonetic) => {
    if (phonetic.audio) {
      audio = new Audio();
      audio.setAttribute("src", `${phonetic.audio}`);
    }
  });
  dictionary.innerHTML = ``;
  dictionary.innerHTML += `
         <div class="container">
            <div class="dictionary__header">
                <div class="dictionary__word">
                    <h1 class="heading-l text-black-2d">${word.word}</h1>
                    <p class="dictionary__spelling heading-m text-purple">${
                      word.phonetic ? word.phonetic : word.phonetics[1].text
                    }</p>
                </div>
                <button class="dictionary__audio" onclick="volume()">
                    <i class="fa-sharp fa-solid fa-play"></i>
                </button>
            </div>

            <div class="dictionary__meanings">
                ${word.meanings.map((meaning) => {
                  let defs = [];
                  let meanings = [];
                  meaning.definitions.map((def) => {
                    defs.push(`
                          <li>
                              <span></span>
                              <div>
                                  <p class="body-m text-black-2d">${
                                    def.definition
                                  }</p>
                                  <p class="body-m text-gray-bold">${
                                    def.example ? def.example : ""
                                  }</p>
                              </div>
                          </li>
                      `);
                    // console.log(defs.join(""));
                  });
                  meanings.push(`
                  <div class="dictionary__part_of_speech">
                      <p class="heading-m text-black-2d">${
                        meaning.partOfSpeech
                      }</p>
                      <span></span>
                  </div>
                  <div class="dictionary__meaning">
                      <p class="heading-s text-gray-bold">Meaning</p>
                      <ul>
                          ${defs.join("")}
                      </ul>
                  </div>
                  <div class="dictionary__synonym">
                      <p class="heading-s text-gray-bold">Synonyms</p>
                      <p class="heading-s text-purple bold"><a href="${
                        meaning.synonyms[0]
                          ? `https://en.wiktionary.org/wiki/${meaning.synonyms[0]}`
                          : "https://en.wiktionary.org/wiki/Wiktionary:Main_Page"
                      }"
                              target="_blank">${
                                meaning.synonyms[0]
                                  ? meaning.synonyms[0]
                                  : "not found"
                              }</a></p>
                  </div>
              `);
                  return meanings.join("");
                })}
            </div>

            <div class="dictionary__source">
                <a href="${word.sourceUrls[0]}" target="_blank"
                    class="body-s text-gray-bold">Source</a>
                <a href="${word.sourceUrls[0]}" target="_blank"
                    class="body-s text-black-2d">${word.sourceUrls[0]}</a>
                <a href="${word.sourceUrls[0]}" target="_blank"><i
                        class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
        </div> `;
};

const volume = () => {
  audio.play();
};

if (JSON.parse(localStorage.getItem("word"))) {
  setDictionary(JSON.parse(localStorage.getItem("word")));
}

console.log(window.location);
