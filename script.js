const $colRight = document.querySelector(".col-right");
const $daily = document.querySelector(".periods__daily");
const $weekly = document.querySelector(".periods__weekly");
const $monthly = document.querySelector(".periods__monthly");

const change = (title) => {
  let tt = title;
  if (title == "Self Care") {
    tt = "Self-Care";
  }
  return tt;
};
const cardTemplate = ({ name, current, previous, period }) => {
  return `
          <div class="card__img card__img--${name}">
            <img class="img" src="images/icon-${name}.svg" alt="icon-${name}" />
          </div>
          <div class="card__info">
            <div class="card__activity">
              <div class="card__name">${name}</div>
              <div class="card__icon"><i>***</i></div>
            </div>
            <div class="card__times">
              <div class="card__hrs">${current}hrs</div>
              <p class="card__desc">
                <span class="card__last">Last ${period}</span>
                -
                <span class="card__previous">${previous}hrs</span>
              </p>
            </div>
            </div>
            `;
};

const addAndRemoveActive = (target) => {
  const periods = document.querySelectorAll(".periods p");
  periods.forEach((el) => {
    el.classList.remove("periods--active");
  });
  target.classList.add("periods--active");
};
document.addEventListener("click", (e) => {
  if (e.target === $daily) {
    $colRight.innerHTML = "";
    addAndRemoveActive(e.target)
    innerContent("daily");
  }
  if (e.target === $weekly) {
    $colRight.innerHTML = "";
    addAndRemoveActive(e.target)
    innerContent("weekly");
  }
  console.log(e.target);
  if (e.target === $monthly) {
    $colRight.innerHTML = "";
    addAndRemoveActive(e.target)
    innerContent("monthly");
  }
});

function innerContent(period) {
  const frag = document.createDocumentFragment();
  fetch("/data.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(({ title, timeframes }) => {
        const { current, previous } = timeframes[`${period}`];

        let div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = cardTemplate({
          name: change(title),
          current,
          previous,
          period,
        });
        frag.appendChild(div);
      });
      $colRight.appendChild(frag);
    });
}

innerContent("weekly");