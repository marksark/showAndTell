const queryText = document.querySelector("input");
const form = document.getElementById("formId");
const textDiv = document.querySelector(".text");
const imageDiv = document.querySelector(".images");
const imgs = document.querySelector("#imageList");
const rslts = document.querySelector("#resultList");

form.addEventListener("submit", e => {
  e.preventDefault();
  const imageURL = "https:www.googleapis.com/customsearch/v1?q="+queryText.value+"&cx=001628731137213283695:jmjdbkgy3nk&key=AIzaSyCo55ucXq9DEmDX-HOfFjcFcFDFMHAOK1w&searchType=image"
  fetch(imageURL).then(response => response.json();
  ).then(data => {
      //pull out each list item we need to use eventually with i as # in sequence
    imgs.innerHTML = '<h4> Show Result</h4>';
      //start by displaying first 10 images
    for (let i = 0; i < 10; i++){
      const element = document.createElement("img");
      const imageSrc =  data.items[i].link;
      element.src = imageSrc;
      imgs.appendChild(element);
    }
  }).catch(err => {
      console.log("Oh no! This image try didn't work..may the error message below will help");
      console.log(err);
    });

    //this is for the links results
  const resultURL = "https:www.googleapis.com/customsearch/v1?q="+queryText.value+"&cx=001628731137213283695%3A3ydk8iqc5ww&key=AIzaSyCo55ucXq9DEmDX-HOfFjcFcFDFMHAOK1w"
  fetch(resultURL).then(response => response.json()
  ).then(data => {
      //Here is where we'll add the data to the DOM
    rslts.innerHTML = "<h4> Tell Result</h4>"
    for (let i = 0; i < 5; i++){
        //here we will only begin with 5 search result items
      const div = document.createElement("div");
      const p = document.createElement("p");
      const a = document.createElement("a");
      div.innerHTML = data.items[i].htmlTitle;
      p.innerHTML = data.items[i].snippet;
      a.href = data.items[i].link;
      a.innerHTML = "<br/>"+ data.items[i].link;
      div.appendChild(a);
      div.appendChild(p);
      rslts.appendChild(div);
    }
  }).catch(err => {
      console.log("Oh no! This result data didn't work..may the error message below will help");
      console.log(err);
    });
});
