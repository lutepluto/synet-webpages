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
