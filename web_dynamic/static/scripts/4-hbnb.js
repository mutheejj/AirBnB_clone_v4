let articles = function (data) {
  $('article').remove();
  $.each(data, function (k, v) {
    $(`<article>
      <div class="title">
      <h2>${v.name}</h2>
      <div class="price_by_night">
      ${v.price_by_night}
      </div>
      </div>
      <div class="information">
      <div class="max_guest">
      <i class="fa fa-users fa-3x" aria-hidden="true"></i>
      <br />
      ${v.max_guest} Guests
      </div>
      <div class="number_rooms">
      <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
      <br />
      ${v.number_rooms} Bedrooms
      </div>
      <div class="number_bathrooms">
      <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
      <br />
      ${v.number_bathrooms} Bathroom
      </div>
      </div>
      <div class="user">
      <strong>Owner: PLACEHOLDER</strong>
      </div>
      <div class="description">
      ${v.description}
      </div>
      </article>`).appendTo('.places');
  });
};

$(document).ready(function () {
  $('.amenities UL LI INPUT').css('margin-right', '10px');
  let idDict = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      idDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(':not(:checked)')) {
      delete idDict[$(this).attr('data-id')];
    }
    let alist = [];
    for (let k in idDict) {
      alist.push(idDict[k]);
    }
    $('.amenities h4').text(alist.join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').toggleClass('available');
    }
  });
  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ 'amenities': Object.keys(idDict) }),
      success: function (data) {
        articles(data);
      }
    });
  });
});