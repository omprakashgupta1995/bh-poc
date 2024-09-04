// eslint-disable-next-line no-unused-vars
const heroCarousel = {
  // loop: true,
  slidesPerView: 1,
  grabCursor: true,
  autoplay: {
    delay: 50000000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '<button type="button" title="Play"></button>',
    prevEl: '<button type="button" title="Play"></button>',
  },
  pagination: {
    // el: swiperPagination,
    clickable: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1.2,
      slidesPerGroup: 1,
    },
    780: {
      slidesPerView: 2.1,
    //   slidesPerGroup: 4,
    },
    992: {
      slidesPerView: 3.2,
    //   slidesPerGroup: 4,
    },
    1025: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 20,
    },
  },
};

export default {
  'hero-carousel': heroCarousel,
  default: heroCarousel,
};
