"use strict";

$(document).ready(function() {

  $(".results").delegate("li", "click", function(e){
    e.preventDefault();
    var imdbNum =$(e.target).data("imdbid")

    var posterRequest = $.ajax({
      url: "http://www.omdbapi.com/",
      type: "get",
      dataType: "json",
      data: {i: imdbNum}
    });

    posterRequest.done(function (data){
      var img = $("<img/>");
      img.attr("src", data["Poster"]);
      $(".posterArea").html(img);
    });
  });

  $("#submitSearch").on("click", function(e){
    e.preventDefault();
    var userInput = $("#searchTerm").val();

    var request = $.ajax({
      url: "http://www.omdbapi.com/",
      type: "get",
      dataType: "json",
      data: {s: userInput}
    });
 
    request.done(function(data){
    var search = data["Search"];
    $.each(search, function(index, movie){
      $(".results").append(build_list(movie));
    });


    function build_list(movie) {  
      var movieTitle = movie["Title"]
      var li = $("<li></li>");
      li.data("imdbid", movie["imdbID"]);
      li.append(movie["Title"]);
      return li;
    }
    })
  })
});