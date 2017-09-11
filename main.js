$(function() {
  //console.log('jQuery works!');

  let pageNumber = 1;

  for (var i = 0; i < array.length; i++) {
    array[i]
  }

  $.ajax({
    url: "scraping.php?pageNumber=" + pageNumber
  }).done(function(data) {
    //console.log(data);
    data.forEach(function(value) {
      let htmlCode = '<a href="' + value.profile_link + '" title="' + value.name + '"><img src="' + value.img_src + '"></a>'
      //console.log(value.profile_link);
      $("#badoo-search").append(htmlCode);
    });
  });

});
