$(function() {

  let inputLocation, inputNames, inputAgeRange, inputSex, pageNumber, stopSearching = false;

  $("#searchForm").on('submit', function(event) {
    event.preventDefault();

    $('#badoo-search').empty();

    stopSearching = false;
    pageNumber = 1;

    inputLocation = $("input[name=location]").val();
    inputNames = $("input[name=names]").val();
    inputAgeRange = $("input[name=ageRange]").val();
    inputSex = $("input[name=sex]").val();

    doSearch();

  });

  $('#stopSearchingButton').on('click', function() {
    stopSearching = true;
  });

  function doSearch() {

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

      data.people.forEach(function(value) {
        let htmlCode = '<a href="' + value.profile_link + '" title="' + value.name + '" target="_blank"><img src="' + value.img_src + '"></a>'
        $("#badoo-search").append(htmlCode);
      });

      console.log(pageNumber);

      if(data.error.code === 404) {
        stopSearching = true;
        console.log('Searchin has stopped');
      }

      if(stopSearching === false) {
        pageNumber++;
        doSearch();
      }
    });

  };

});
