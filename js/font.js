const select = document.querySelector(".header__select");
const selected = document.querySelector(".header__select--selected");
const selectors = select.querySelectorAll(".header__selectors ul li");

const saveFontToStorage = (font) => {
  localStorage.setItem("font-family", font);
};

localStorage.getItem("font-family")
  ? (selected.textContent = localStorage.getItem("font-family"))
  : (selected.textContent = "Sans Serif");

const showSelect = () => {
  select.classList.toggle("open");
};

document.addEventListener("click", function handleClickOutsideBox(event) {
  if (!select.contains(event.target)) {
    select.classList.remove("open");
  }
});

const setSelectorValue = (e) => {
  const getSelectvalue = e.target.textContent.trim();
  setFontFamily(getSelectvalue);
  select.innerHTML = ``;
  select.innerHTML += `
          <p class="header__select--selected body-m text-black-2d">
          ${getSelectvalue}
          </p>
          <img src="assets/icons/select-icon.png" alt="icon">
          <div class="header__selectors">
              <ul>
                  <li>
                      <p class="body-m text-black-2d" onclick="setSelectorValue(event)">Sans Serif</p>
                  </li>
                  <li>
                      <p class="body-m text-black-2d" onclick="setSelectorValue(event)">Serif</p>
                  </li>
                  <li>
                      <p class="body-m text-black-2d" onclick="setSelectorValue(event)">Mono</p>
                  </li>
              </ul>
          </div>
    `;
  saveFontToStorage(getSelectvalue);
};

const setFontFamily = (font) => {
  switch (font) {
    case "Mono":
      document.body.classList.remove("font--serif");
      document.body.classList.remove("font--sans-serif");
      if (!document.body.classList.contains("font--mono")) {
        document.body.classList.add("font--mono");
      }
      break;

    case "Serif":
      document.body.classList.remove("font--sans-serif");
      document.body.classList.remove("font--mono");
      if (!document.body.classList.contains("font--serif")) {
        document.body.classList.add("font--serif");
      }
      break;

    case "Sans Serif":
      document.body.classList.remove("font--serif");
      document.body.classList.remove("font--mono");
      if (!document.body.classList.contains("font--sans-serif")) {
        document.body.classList.add("font--sans-serif");
      }
      break;

    default:
      break;
  }
};

if (localStorage.getItem("font-family")) {
  setFontFamily(localStorage.getItem("font-family"));
  selected.value = localStorage.getItem("font-family");
}
