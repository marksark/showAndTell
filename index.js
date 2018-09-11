let queryText = document.querySelector("input");
const form = document.getElementById("formId");
const textDiv = document.querySelector(".text");
const imageDiv = document.querySelector(".images");
const imgs = document.querySelector("#imageList");
const rslts = document.querySelector("#resultList");

// queryText.addEventListener("keyup", function(){console.log(queryText.value)});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    let imageURL = "https:www.googleapis.com/customsearch/v1?q="+queryText.value+"&cx=001628731137213283695:jmjdbkgy3nk&key=AIzaSyCNkV-zSn9AptI5T832f-cSpvTPaCRhI_c&searchType=image"
    fetch(imageURL)
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      //pull out each list item we need to use eventually with i as # in sequence
      imgs.innerHTML = '<h4> Show Result</h4>';
      //start by displaying first 10 images
      for (let i = 0; i < 20; i++){
        let element = document.createElement("img");
        let imageSrc =  data.items[i].link;
        element.src = imageSrc;
        element.height = "130";
        element.width = "130";
        imgs.appendChild(element);
      }
    }).catch(function(err) {
      console.log("Oh no! This image try didn't work..may the error message below will help");
      console.log(err);
    });

    //this is for the links results
    let resultURL = "https:www.googleapis.com/customsearch/v1?q="+queryText.value+"&cx=001628731137213283695%3A3ydk8iqc5ww&key=AIzaSyCNkV-zSn9AptI5T832f-cSpvTPaCRhI_c"
    fetch(resultURL)
    .then(function(response) {
      // console.log("response");
      // console.log(response);
      return response.json();
    }).then(function(data) {
      //Here is where we'll add the data to the DOM
      rslts.innerHTML = "<h4> Tell Result</h4>"
      for (let i = 0; i < 5; i++){
        //here we will only begin with 5 search result items
        let div = document.createElement("div");
        let p = document.createElement("p");
        let a = document.createElement("a");
        div.innerHTML = data.items[i].htmlTitle;
        p.innerHTML = data.items[i].snippet;
        a.href = data.items[i].link;
        a.innerHTML = "<br/>"+ data.items[i].link;
        div.height = "150";
        div.class = "resultArea";
        div.appendChild(a);
        div.appendChild(p);
        rslts.appendChild(div);
      }
    }).catch(function(err) {
      console.log("Oh no! This result data didn't work..may the error message below will help");
      console.log(err);
    });
});
