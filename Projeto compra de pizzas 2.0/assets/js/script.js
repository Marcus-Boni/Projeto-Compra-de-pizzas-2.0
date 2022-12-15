(function () {
  window.addEventListener("scroll", backParalax);
  window.addEventListener("scroll", addClassOnScroll);

  let elements = [...document.querySelectorAll("[data-fade]")];
  const dataParalaxContainer = [...document.querySelectorAll("[data-paralax]")];
  const rowPizzas = document.querySelectorAll(".row_types--items a");

  [...rowPizzas][0].classList.add("row_actived");
  document.body.classList.remove("no-js");

  function elementIntoView(el) {
    let rect = el.getBoundingClientRect();
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.top >= 0 && rect.bottom <= innerHeight * 1.1)
    );
  }

  function addClassOnScroll() {
    elements.forEach((el) => {
      if (elementIntoView(el)) {
        let delay = parseInt(el.getAttribute("data-fade--delay")) || 0;

        setTimeout(() => {
          let _class = el.getAttribute("data-fade");

          el.classList.add(_class);
          el.removeAttribute("data-fade");
          el.removeAttribute("data-fade--delay");
          elements = [...document.querySelectorAll("[data-fade]")];
        }, delay);
      }
    });
  }

  addClassOnScroll();

  function isGettingOut(container) {
    return container.getBoundingClientRect().top <= innerHeight;
  }

  function getNewPostion(c) {
    const v = parseFloat(c.getAttribute("data-p-velocity")) || 0.3;
    return c.getBoundingClientRect().top * v * -1;
  }

  function backParalax() {
    dataParalaxContainer.forEach((c) => {
      let originalPositionY = getComputedStyle(c).backgroundPositionY;
      let originalPositionX = getComputedStyle(c).backgroundPositionX;

      if (isGettingOut(c)) {
        c.style.backgroundPosition = ` ${originalPositionX} ${getNewPostion(
          c
        )}px`;
      } else {
        c.style.backgroundPosition = ` ${originalPositionX} 0px`;
      }
    });
  }

  function changeRow(el) {
    el.preventDefault();

    const rowImage = [...document.querySelectorAll(".row_pizza--item img")];
    const rowContainers = [...document.querySelectorAll(".row_pizza--item")];
    const rowActived = document.querySelector(".row_actived");

    if (el.target.textContent === "Pizza") {
      rowImage[0].setAttribute("src", "assets/images/pizza-1.jpg");
      rowImage[1].setAttribute("src", "assets/images/pizza-2.jpg");
      rowImage[2].setAttribute("src", "assets/images/pizza-3.jpg");
    } else if (el.target.textContent === "Drinks") {
      rowImage[0].setAttribute("src", "assets/images/drink-1.jpg");
      rowImage[1].setAttribute("src", "assets/images/drink-2.jpg");
      rowImage[2].setAttribute("src", "assets/images/drink-3.jpg");
    } else if (el.target.textContent === "Burgers") {
      rowImage[0].setAttribute("src", "assets/images/burger-1.jpg");
      rowImage[1].setAttribute("src", "assets/images/burger-2.jpg");
      rowImage[2].setAttribute("src", "assets/images/burger-3.jpg");
    } else {
      rowImage[0].setAttribute("src", "assets/images/pasta-1.jpg");
      rowImage[1].setAttribute("src", "assets/images/pasta-2.jpg");
      rowImage[2].setAttribute("src", "assets/images/pasta-3.jpg");
    }

    rowContainers.forEach((el) => {
      if (el.classList.contains("row_fade_animation")) {
        el.classList.remove("row_fade_animation");
      } else {
        el.classList.add("row_fade_animation");
      }
      setTimeout(() => {
        el.classList.remove("row_fade_animation");
        el.classList.remove("fade_animation");
      }, 350);
    });

    if (rowActived) {
      rowActived.classList.remove("row_actived");
      el.target.classList.toggle("row_actived");
    }
  }

  [...rowPizzas].forEach((el) => el.addEventListener("click", changeRow));
})();
