import $ from 'jquery'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import 'styles/pages/index/index.scss';

$(document).on('click', '[data-toggle="pie"]', e => {
  const $target = $(e.target);
  const dataTarget = $target.data('target');
  const $pie = $(dataTarget);
  $pie.parent().children('img').addClass('d-none');
  $pie.removeClass('d-none');
});

$(document).on('click', '[data-toggle="consultantIndicator"] >li', e => {
  const $target = $(e.target);
  const dataTarget = $target.data('target');
  $target.parent().children('.active').removeClass('active');
  $target.addClass('active');
  const $panel = $(dataTarget);
  $panel.parent().children('.active').removeClass('active');
  $panel.addClass('active');
});

// let ticking = false;
// const viewportHeight = Math.max(window.innerHeight || 0, document.documentElement.clientHeight || 0);
// $(window).on('scroll resize', e => {
//   if (!ticking) {
//     ticking = true;
//     const topbar = document.querySelector('.topbar');
//     if (topbar) {
//       const { bottom } = topbar.getBoundingClientRect();
//       console.log(viewportHeight, bottom, viewportHeight - bottom);
//       if (viewportHeight <= bottom) {
//         $(topbar).addClass('topbar--bottom-fixed');
//       } else {
//         $(topbar).removeClass('topbar--bottom-fixed');
//       }
//     }
//     ticking = false;
//   }
// });
