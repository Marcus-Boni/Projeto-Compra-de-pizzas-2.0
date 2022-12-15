(function () {
  window.addEventListener("scroll", navAnimation);
  window.addEventListener("scroll", scrollLink);

  const navBar = document.querySelector(".nav_bar");
  const links = navBar.querySelectorAll("ul li a");
  const menu = document.querySelector(".menu_toggle");
  const header = document.querySelector("header");

  menu.addEventListener("click", menuToggle);

  links[0].classList.add("actived");

  function menuToggle() {
    const menuBar = document.querySelector(".menu_bar");
    const menuUl = menuBar.querySelector("ul");
    const menuIcon = document.querySelector(".toggle");
    const menuAhref = [...menuUl.querySelectorAll("li a")];

    if (menuIcon.lastElementChild.style.display === "none") {
      menuIcon.lastElementChild.style.display = "block";
      menuIcon.style.marginTop = "0rem";
    } else {
      menuIcon.lastElementChild.style.display = "none";
      menuIcon.style.marginTop = "0.375rem";
    }

    function animationMenu() {
      menuIcon.classList.toggle("toggle_animation");
      menuBar.classList.toggle("show_menu");
      menuUl.classList.toggle("show_menu--ul");
    }

    function removeMenu() {
      menuAhref.forEach((a) => {
        a.addEventListener("click", () => {
          menuBar.classList.remove("show_menu");
          menuUl.classList.remove("show_menu--ul");
          menuIcon.classList.remove("toggle_animation");
          menuIcon.lastElementChild.style.display = "block";
          menuIcon.style.marginTop = "0rem";
        });
      });
    }
    animationMenu();
    removeMenu();
  }

  function navAnimation() {
    if (scrollY > innerHeight / 2) {
      header.classList.add("nav_animation");
      header.classList.remove("normal_header");
    } else if (scrollY < innerHeight / 3) {
      header.className = "normal_header";
    }
  }

  function scrollLink() {
    let positions = [...links].map((link) => {
      let href = link.getAttribute("href");
      let section = document.querySelector(href);

      return section.getBoundingClientRect().top;
    });

    let activedLink = getLastSeenElement(positions);
    let menuActived = document.querySelector(".actived");

    if (menuActived) {
      menuActived.classList.remove("actived");
    }

    if (activedLink) {
      return activedLink.classList.add("actived");
    }
  }

  function getLastSeenElement(positions) {
    let filteredPositions = positions.filter((n) => n < innerHeight / 2);

    return links[filteredPositions.length - 1];
  }
})();
