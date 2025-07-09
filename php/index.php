<?php
  include "primate.php";

 // use Primate;

  Primate\Route::get(function ($request) {
    return Primate\view("index.svelte", [ "foo" => "bar" ]);
    //return Primate\error();
    //return Primate\redirect("https://primate.run", 301);
  });
?>
