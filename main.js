'use strict';

var $city;

$(document).ready(init);

function init() {
  $('.cityForm').submit(getCams);
  $city = $('.city');
}

function getCams(event) {
  event.preventDefault();

  let city = $city.val();

  $.ajax('http://api.wunderground.com/api/5422ccc35058b5cb/webcams/q/autoip.json')
    .done(data => {
      let $cams = data.webcams
                    .filter(cam => cam.city.toLowerCase() === city.toLowerCase())
                    .map(camElement);

      $('.cams').empty().append($cams);
    });
}

function camElement(cam) {
  let $cam = $('.template').clone();
  $cam.removeClass('template');
  $cam.find('img').attr('src', cam.CURRENTIMAGEURL);
  $cam.find('.camid').text(cam.camid);

  return $cam;
}
