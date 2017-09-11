$(function() {

  for (let pageNumber = 1; pageNumber <= 1000; pageNumber++) {
    $.ajax({
      url: "scraping.php?pageNumber=" + pageNumber
    }).done(function(data) {
      data.forEach(function(value) {
        let htmlCode = '<a href="' + value.profile_link + '" title="' + value.name + '" target="_blank"><img src="' + value.img_src + '"></a>'
        $("#badoo-search").append(htmlCode);
        console.log(pageNumber);
      });
    });
  }

});
