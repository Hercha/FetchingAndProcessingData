$(function() {

  let inputLocation, inputName, inputAgeRange, inputSex;

  $("#searchForm").on('submit', function(event) {
    event.preventDefault();

    inputLocation = $("input[name=location]").val();
    inputNames = $("input[name=names]").val();
    inputAgeRange = $("input[name=ageRange]").val();
    inputSex = $("input[name=sex]").val();

    for (let pageNumber = 1; pageNumber <= 10; pageNumber++) {
      $.ajax({
        type: "POST",
        url: "scraping.php",
        data: {
          "pageNumber" : pageNumber,
          "location" : inputLocation,
          "names" : inputNames,
          "ageRange" : inputAgeRange,
          "sex" : inputSex
        }
      }).done(function(data) {
        data.forEach(function(value) {
          let htmlCode = '<a href="' + value.profile_link + '" title="' + value.name + '" target="_blank"><img src="' + value.img_src + '"></a>'
          $("#badoo-search").append(htmlCode);
          console.log(pageNumber);
        });
      });
    }

  });
});
