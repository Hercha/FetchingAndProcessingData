$(function() {
  //console.log('jQuery works!');

  $.ajax({
    url: "scraping.php"
  }).done(function(data) {
    console.log(data);
  });

});
