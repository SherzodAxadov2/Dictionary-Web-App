const select = document.querySelector(".header__select");
const selected = document.querySelector(".header__select--selected");
const selectors = select.querySelectorAll(".header__selectors ul li");
const toggleBtn = document.querySelector(".header__toggle__btn");

const showSelect = () => {
  select.classList.toggle("open");
};

const setSelectorValue = (e) => {
  const getSelectvalue = e.target.textContent.trim();
  console.log(getSelectvalue);

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
};

const darkMode = () => {
  toggleBtn.classList.toggle("dark");
};
