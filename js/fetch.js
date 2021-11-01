const dogUrl = 'https://raw.githubusercontent.com/nblaski/asyncFun/master/json/dogFacts.json';
const breedUrl = 'https://raw.githubusercontent.com/nblaski/asyncFun/master/json/dognames.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const dogList = document.getElementById('dogList');
const breedSection = document.getElementById('breedSection');
const btn = document.querySelector('button');
let searchBox = document.getElementById('search');
let defaultOption = document.createElement('option');
let select = document.createElement('select');
const placehere = document.getElementById("placehere");

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem!', error))
 }

function fetchWikiData(url) {
   return fetch(url)
             .then(checkStatus)
             .then(res => res.json())
             .then((result) => {
               const profiles = result.dogs.map((dog) => {
                    const profileJSON = fetchData(wikiUrl + dog)
                    return profileJSON
                         })
                  return  Promise.all(profiles);
              })
              .catch(error => console.log('Looks like there was a problem!', error))
  }

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

// checks fetch methods
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

// generates select options
function generateOptions(data) {
  searchBox.appendChild(select)
  select.className = 'btnSelect',
  select.setAttribute('onchange','document.location.hash=this.value')
      const options = data.dogs.map(item => `
        <option value='${item}'>${item}</option>
  `).join('');
    select.innerHTML = options;
    defaultOption.text = 'Choose Dog Name'
    defaultOption.setAttribute("selected", "true")
    select.prepend(defaultOption)
}


// Loading spinner
function loadImage() {
  var loadImg = document.createElement("img");
    loadImg.className = 'loader';
    loadImg.setAttribute("src", "img/loader.gif");
    loadImg.setAttribute("alt", "Flower");
    placehere.appendChild(loadImg);
}

// generates body elements to display data
function generateHTMLarrObj(data, data1) {
      data.map( factDog => {
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

//// ------------------------------------------
////  EVENT LISTENERS
//// ------------------------------------------

btn.addEventListener('click', (event) => {
      Promise.all([
                    fetchWikiData(breedUrl),
                    fetchData(dogUrl),
                    fetchData(breedUrl),
                    event.target.textContent = "Loading...",
                    loadImage()
                  ])
                  .then(([dogProfiles,dogFacts,dogOptions]) => {
                      generateHTMLarrObj(dogProfiles, dogFacts)
                      generateOptions(dogOptions)
                      event.target.remove(),
                      placehere.remove()
                     }
                   )
                   .catch(error => console.log('Looks like there was a problem!', error))
})
