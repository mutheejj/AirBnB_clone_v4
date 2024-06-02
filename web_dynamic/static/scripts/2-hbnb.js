$(() => {
    const amenity = {};
    $("#input#check_amen").change(function () {
        if ($(this).is(":checked"))
            amenity[$(this).attr("data-name")] = $(this).attr("data-id");
        else delete amenity[$(this).attr("data-name")];
        const objNames = Object.keys(amenity);
        $(".amenities h4").text(objNames.sort().join(", "));
    });
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
          $('DIV#api_status').addClass('available');
        } else {
          $('DIV#api_status').toggleClass('available');
        }
      });
});