<?php

header('Content-type: application/json');

$names_array = array_map('trim', explode(',', $_POST['names']));

$ch = curl_init('https://badoo.com/en/dating/' . $_POST['location'] . '/' . $_POST['sex'] . '/page-' . $_POST['pageNumber'] . '/age-' . $_POST['ageRange'] . '/');
//$ch = curl_init('http://php.net/manual/en/book.curl.php');

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$output = curl_exec($ch);

//echo $output;

$html_page = new DOMDocument;
libxml_use_internal_errors(true);
$html_page->loadHTML($output);
libxml_clear_errors();

$people = [];
$figures = $html_page->getElementsByTagName('figure');

foreach($figures as $figure) {

  $name = $figure->getElementsByTagName('span')[1]->nodeValue;

  if (in_array($name, $names_array)) {
    $img_src = $figure->getElementsByTagName('img')[0]->getAttribute('src');
    $profile_link = $figure->getElementsByTagName('a')[0]->getAttribute('href');

    //echo '<a href="' . $profile_link . '" title="' . $name . '"><img src="' . $img_src . '"></a>';

    $people[] = compact('profile_link', 'name', 'img_src');

  }

  //var_dump($profile_link);
  //var_dump($img_src);
}

echo json_encode($people);
