(function () {
  const sliderArea = document.querySelector(".sliders_width");
  const allSlides = [...sliderArea.querySelectorAll(".slider--item")];
  const sliderItem = sliderArea.querySelector(".slider--item");
  const allDots = [...sliderArea.querySelectorAll(".dot")];
  const slidersContent = [...document.querySelectorAll(".slider_content")];
  const handleScale = document.querySelector(".handle_scale");
  [...slidersContent][0].classList.add("handle_scale");
  let currentSlide = 0;

  sliderArea.style.width = `calc(100vw * ${allSlides.length})`;
  allDots[0].classList.add("actived_dot");

  const goPrev = () => {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = allSlides.length - 1;
    }
    updateMargin();
  };

  const goNext = () => {
    currentSlide++;
    if (currentSlide > allSlides.length - 1) {
      currentSlide = 0;
    }
    verifyCurrentSlide();
    updateMargin();
  };

  const verifyCurrentSlide = () => {
    if (currentSlide === 0) {
      slidersContent[1].classList.remove("handle_scale");
      slidersContent[2].classList.remove("handle_scale");
      slidersContent[0].classList.add("handle_scale");
      allDots[1].classList.remove("actived_dot");
      allDots[2].classList.remove("actived_dot");
      allDots[0].classList.add("actived_dot");
    } else if (currentSlide === 1) {
      slidersContent[0].classList.remove("handle_scale");
      slidersContent[2].classList.remove("handle_scale");
      slidersContent[1].classList.add("handle_scale");
      allDots[0].classList.remove("actived_dot");
      allDots[2].classList.remove("actived_dot");
      allDots[1].classList.add("actived_dot");
    } else {
      slidersContent[0].classList.remove("handle_scale");
      slidersContent[1].classList.remove("handle_scale");
      slidersContent[2].classList.add("handle_scale");
      allDots[0].classList.remove("actived_dot");
      allDots[1].classList.remove("actived_dot");
      allDots[2].classList.add("actived_dot");
    }
  };

  const goToCurrentSlide = (e) => {
    if (e.currentTarget.getAttribute("class").includes("first--dot")) {
      currentSlide = 0;
      verifyCurrentSlide();
      updateMargin();
    }
    if (e.currentTarget.getAttribute("class").includes("second--dot")) {
      currentSlide = 1;
      verifyCurrentSlide();
      updateMargin();
    }
    if (e.currentTarget.getAttribute("class").includes("third--dot")) {
      currentSlide = 2;
      verifyCurrentSlide();
      updateMargin();
    }
  };

  allDots.forEach((dot) => {
    dot.addEventListener("click", goToCurrentSlide);
  });

  const updateMargin = () => {
    const sliderItemWidth = sliderItem.clientWidth;
    const newMargin = currentSlide * sliderItemWidth;
    sliderArea.style.marginLeft = `-${newMargin}px`;
  };

  setInterval(goNext, 5000);
})();

/* EXECUTAR PARA VERFICAR O OVERFLOW

 var docWidth = document.documentElement.offsetWidth;

[].forEach.call(
  document.querySelectorAll('*'),
  function(el) {
    if (el.offsetWidth > docWidth) {
      console.log(el);
    }
  }
); */

