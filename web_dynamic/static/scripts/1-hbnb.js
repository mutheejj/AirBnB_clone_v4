$(() => {
    const amenity = {};
    $("#input#check_amen").change(function () {
        if ($(this).is(":checked"))
            amenity[$(this).attr("data-name")] = $(this).attr("data-id");
        else delete amenity[$(this).attr("data-name")];
        const objNames = Object.keys(amenity);
        $(".amenities h4").text(objNames.sort().join(", "));
    });
});