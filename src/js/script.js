//Hamburger
import {
  gsap,
  TextPlugin,
  ScrollTrigger,
  random,
} from "../../node_modules/gsap/all.js";
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".menu"),
  closeElement = document.querySelector(".menu__close"),
  overlayClose = document.querySelector(`.menu__overlay`),
  lineType = document.querySelector(".info-page__description"),
  show = document.querySelectorAll(".show"),
  showLinkCode = document.querySelectorAll(".show-link-code"),
  spanType = document.querySelector(".wrap"),
  text = document.querySelector(".list__aboutme__text"),
  listAboutme = document.querySelectorAll(".list__aboutme-experience "),
  expirians = document.querySelectorAll(".resume__column"),
  myProj = document.querySelectorAll(".portfolio__items "),
  portfolio = document.querySelectorAll(".portfolio__items");

hamburger.addEventListener(`click`, () => {
  menu.classList.add("active");
  hamburger.classList.add("active");
});

closeElement.addEventListener("click", () => {
  menu.classList.remove("active");
  hamburger.classList.remove("active");
});

overlayClose.addEventListener(`click`, () => {
  menu.classList.remove(`active`);
  hamburger.classList.remove("active");
});

//lineStyle

const percent = document.querySelectorAll(`.progress__percent`),
  lines = document.querySelectorAll(`.progress__line span`);

percent.forEach((item, i) => {
  let num = [];
  num += parseInt(item.innerHTML);
  if (num >= 0 && num <= 100) {
    lines[i].style.width = item.innerHTML;
  } else {
    alert(`Введите проценты от 0 до 100 в блоке ".progress__persent"`);
  }
});

//

// Active btn and smooth scroll
function activeSmooth() {
  const btn = document.querySelectorAll(`.promo__btns a`);
  btn.forEach((e) => {
    e.addEventListener(`click`, (i) => {
      i.preventDefault();
      hiddenButton(btn);
      e.classList.add(`btn`);
      if (e.classList.contains(`promo__link-invisible`)) {
        document.querySelector(`.me-content`).scrollIntoView({
          behavior: `smooth`,
          block: "center",
        });
      } else {
        document.querySelector(`.portfolio__wrapper`).scrollIntoView({
          behavior: `smooth`,
          block: "center",
        });
      }
    });
  });
}

//

//hidenBTN
function hiddenButton(button) {
  button.forEach((e) => {
    e.classList.remove(`btn`);
  });
}
//

//menuBtnActiv
function menuHamburger() {
  const menuLink = document.querySelectorAll(".menu__link a"),
    link = document.querySelectorAll(`h2`);

  menuLink.forEach((item, i) => {
    item.addEventListener(`click`, (e) => {
      e.preventDefault();
      menu.classList.remove("active");
      hamburger.classList.remove("active");
      link[i].scrollIntoView({
        behavior: `smooth`,
        block: "start",
      });
    });
  });
}

// write text js

function lineText() {
  // функция обертка
  let count = 0;
  let line = 0;
  let outHtmlText = "";
  const arrayType = lineType.dataset.type.split(",");
  const timer = (max) => {
    return Math.floor(max * 1.5);
  };

  function startLine() {
    // запуск набора текста
    const time = setTimeout(() => {
      outHtmlText += arrayType[count][line];
      spanType.innerHTML = outHtmlText + "|";
      line++;
      if (arrayType[count].length <= line) {
        clearTimeout(time); // очищаем таймер
        const pause = setTimeout(() => {
          // таймер с паузой
          outHtmlText = outHtmlText.split("");
          const clearText = setInterval(() => {
            // функция очистки текста
            outHtmlText = outHtmlText.slice(0, outHtmlText.length - 1);
            spanType.innerHTML = outHtmlText.join("") + "|";
            line--;
            if (line <= 0) {
              clearInterval(clearText); // очищаем таймер
              startLine(); // запускаем заново набор
              count++;
            }
            if (count == arrayType.length) {
              // чистим пременные
              count = 0;
              line = 0;
            }
          }, timer(60));
        }, timer(800));
        return true;
      }
      startLine();
    }, timer(110));
  }
  startLine();
}

// createElementText

function createElementDescr() {
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.classList.add("description");
  div.appendChild(span);
  return div;
}

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

function removeClassActiveCard(index) {
  if (index > -1) {
    portfolio.forEach((elem, i) => {
      if (i === index) {
        elem.classList.remove("active-card");
      }
    });
  }
}

function descrLine() {
  const link = document.querySelectorAll(".links");
  let stopInterval = false;
  let count = 0;
  let outHtml = "";
  let index = -1;
  function startAnimateDescr() {
    portfolio.forEach((elem, i) => {
      elem.addEventListener("mouseover", (e) => {
        if (elem === portfolio[i] && e.target.parentElement !== link[index]) {
          removeClassActiveCard(index);
          elem.classList.add("active-card");
          const elementDescr = createElementDescr();
          const dataset = elem.attributes[0].nodeValue;
          show[i].insertAdjacentElement("afterend", elementDescr);
          index = i;
          // stopLineInterval
          stopInterval = setInterval(() => {
            outHtml += dataset[count];
            elementDescr.lastChild.textContent = outHtml + "|";
            count++;
            // if line
            if (count == dataset.length) {
              elementDescr.lastChild.textContent = outHtml + "";
              clearInterval(stopInterval);
            }
          }, randomNumber(160, 130));
        }
      });

      elem.addEventListener("mouseout", (e) => {
        const elementDescr = document.querySelector(".description");
        if (elementDescr) {
          elementDescr.remove();
        }
        outHtml = "";
        count = 0;
        clearInterval(stopInterval);
      });
    });
  }
  startAnimateDescr();
}

// Animation Gasp
function splitText(text) {
  let newSplit = [];
  text.innerHTML.split(/\s/g).filter((item) => {
    if (item !== "") {
      text.innerHTML = "";
      newSplit.push(item);
    }
  });
  return newSplit;
}

function createAnimateElements(split) {
  split.forEach((item) => {
    text.innerHTML +=
      " " + `<div class ='word' style='display: inline-block;'>${item}</div>`;
  });
  return document.querySelectorAll(".word");
}

function startAnimate(split) {
  const word = createAnimateElements(split);
  word.forEach((el) => {
    gsap.from(el, 2.5, {
      opacity: 0,
      scale: 1,
      duration: 1,
      x: random(-500, 500),
      y: random(-500, 500),
      z: random(-500, 500),
      scrollTrigger: {
        trigger: ".list__aboutme__text",
        start: "center 80%",
      },
    });
  });
}
startAnimate(splitText(text));

function blockAnimations(elements, trigger) {
  elements.forEach((el) => {
    gsap.from(el, 1, {
      opacity: 0,
      scale: 1,
      duration: 1,
      x: random(-500, 500),
      y: random(-500, 500),
      z: random(-500, 500),
      scrollTrigger: {
        trigger: trigger,
        start: "top 35%",
      },
    });
  });
}

blockAnimations(listAboutme, ".about-me");
blockAnimations(expirians, ".resume");
blockAnimations(myProj, ".portfolio");
//

descrLine();
lineText();
activeSmooth();
menuHamburger();
