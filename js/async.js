const dogUrl = 'https://raw.githubusercontent.com/nblaski/asyncFun/master/json/dogFacts.json';
// const dogUrl = 'https://raw.githubusercontent.com/DukeNgn/Dog-facts-API/master/data.json';
// const breedUrl = 'css/json/dognames.json';
const breedUrl = 'https://raw.githubusercontent.com/nblaski/asyncFun/master/json/dognames.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const dogList = document.getElementById('dogList');
const breedSection = document.getElementById('breedSection');
const btn = document.querySelector('button');
let array = [ ];
let searchBox = document.getElementById('search');
let defaultOption = document.createElement('option');
let select = document.createElement('select');
const placehere = document.getElementById("placehere");

// Handle all fetch requests
async function getJSON(url) {
  try {
    const response = await fetch(url);
  //  console.log(response);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Gets Random Fact
async function getDogFacts(url) {
  const dogJSON = await getJSON(url);
  for (let i = 0; i < dogJSON.length; i++) {
      const randomFacts = dogJSON[Math.floor(Math.random() * dogJSON.length)];
      array.push(randomFacts);
      }
  const arrayMap = array.map( async (key) => {
      const fact = key;
      return fact;
     });
   return Promise.all(arrayMap);
 }

// Get response/wikiUrl + dog names /  from getJSON(breedUrl) / and Wiki API info
  async function getDogBreeds(url) {
    //gets response object from getJSON(breedUrl) - returns breedUrl as object
  const breedJSON = await getJSON(url);
  //returns object with key dogs - an array of dog names
  //console.log(breedJSON);
  const profiles = breedJSON.dogs.map( async (dog) => {
     // maps and prints out dogs
     //console.log(dog)
     const profileJSON = await getJSON(wikiUrl + dog);
     // maps over every dog name combines it with wikiUrl and returns all wiki info profiles in all separate objects
     //console.log(profileJSON);
     return profileJSON;
  });
  //returns a bunch of promises in an array each promise holding wiki profile value
  console.log(profiles)
  return Promise.all(profiles);
}

// Generate the markup for each profile
function generateHTML(data1, data2) {
  //console.log(data1);
  //console.log(data2);
  data1.map( factDog => {
    const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${factDog.fact}
      `;
  });

  data2.map( factDog => {
    const section = document.createElement('section');
    section.className = 'tagBox';
      breedSection.appendChild(section);
      if (factDog.type === "standard" && factDog.thumbnail !== undefined ) {
        section.innerHTML = `
          <div id="tag">
            <img id="${factDog.title}" src=${factDog.thumbnail.source} alt="${factDog.title}">
            <h1>${factDog.title}</h1>
            <h2>${factDog.description}</h2>
            <p>${factDog.extract}</p>
            <a href="#top"  class="tagFooter">TOP OF PAGE</a>
          </div>
          <div class="factBox">
            <div class="factTitle">Random Fun Fact: </div>
            <div class="fact">${data1[Math.floor(Math.random() * data1.length)].fact}</div>
            <div class="factFooter">Reload page to switch them up! </div>
          </div>
        `;
      } else {
        section.innerHTML = `
        <div id="tag">
          <img id="${factDog.title}" src="img/dogPlaceholder.jpg" alt="Dog dogPlaceholder" width="200px"">
          <h1>${factDog.title}</h1>
          <h2>${factDog.description}</h2>
          <p>${factDog.extract}</p>
          <a href="#top"  class="tagFooter">TOP OF PAGE</a>
        </div>
        <div class="factBox">
          <div class="factTitle">Random Fun Fact: </div>
          <div class="fact">${data1[Math.floor(Math.random() * data1.length)].fact}</div>
          <div class="factFooter">Reload page to switch them up! </div>
        </div>
        `;
      }
  });
}

// Populates options for select tag
function drop(data) {
  let option;
  for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].title;
        option.value = data[i].title;
        select.appendChild(option);
    }
};

// Loading spinner
function loadImage() {
  var loadImg = document.createElement("img");
    loadImg.className = 'loader';
    loadImg.setAttribute("src", "img/loader.gif");
    loadImg.setAttribute("alt", "Flower");
    placehere.appendChild(loadImg);
}



// Show me some dogs on button event
btn.addEventListener('click', async (event) => {
  event.target.textContent = "Loading...";
  loadImage();
  try {
    const dogs = await getDogFacts(dogUrl);
    const dogbreed = await getDogBreeds(breedUrl);
    // returns an array of wiki info objects which is what i need!!!
    //console.log(dogbreed);
    generateHTML(dogs, dogbreed);
    drop(dogbreed);
  } catch(e) {
      dogList.innerHTML = '<h3>Something went wrong!</h3>';
      console.error(e);
  } finally {
    event.target.remove();
    placehere.remove();
    select.className = 'btnSelect';
    select.setAttribute('onchange','document.location.hash=this.value');
    defaultOption.text = 'Choose Dog Name';
    defaultOption.setAttribute("selected", "true");
    select.prepend(defaultOption);
    searchBox.appendChild(select);
  }
});
