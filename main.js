$(function() {

  let inputLocation, inputNames, inputAgeRange, inputSex, pageNumber, stopSearching = false;

  var slider = document.getElementById('age-range-slider');
  noUiSlider.create(slider, {
   start: [20, 50],
   connect: true,
   step: 1,
   orientation: 'horizontal', // 'horizontal' or 'vertical'
   range: {
     'min': 18,
     'max': 80
   },
   format: wNumb({
     decimals: 0
   })
  });

  $("#badoo-search-form").on('submit', function(event) {
    event.preventDefault();

    $('#badoo-search-results').empty();

    stopSearching = false;
    pageNumber = 1;

    inputLocation = $("input[name=location]").val();
    inputNames = $("input[name=names]").val();
    inputAgeRange = $("input[name=ageRange]").val();

    inputSex = [];
    $("input[name=sex]:checked").each(function() {
        inputSex.push($(this).val());
    });

    slider.noUiSlider.on('update', function(){
       inputAgeRange = slider.noUiSlider.get()[0] + '-' + slider.noUiSlider.get()[1];
       console.log(inputAgeRange);
    });

    console.log(inputSex)

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
        let htmlCode = '<div class="col m3 s6"><div class="card"><div class="card-image"><a href="' + value.profile_link + '" title="' + value.name + '" target="_blank"><img src="' + value.img_src + '"><span class="card-title">' + value.name + '(' + value.photo_counter + ')</span></a></div></div></div>'
        $("#badoo-search-results").append(htmlCode);
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
