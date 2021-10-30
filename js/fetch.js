const dogUrl = 'https://raw.githubusercontent.com/nblaski/asyncFun/master/json/dogFacts.json';
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
const dogNameObject = {};
const dogNameArray = [];

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
  return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem!', error))
 }

 function generateProfile (url1, url2){
   const names = fetchData(url1);
   console.log(names);
   const fetchNames = fetch(breedUrl)
                        .then(checkStatus)
                        .then(res => res.json())
                        // .then((data) => {
                        //   console.log(data.dogs)
                        //   return data.dogs
                        .then(json=>dogNameArray.push(json.dogs))

                        onst profiles = breedJSON.dogs.map( async (dog) => {
                           const profileJSON = await getJSON(wikiUrl + dog);
                           console.log(profileJSON);
                           return profileJSON;
                        });



                        .then(console.log(dogNameArray))
                        console.log(fetchNames);
                        };
    // console.log(fetchNames);
    // const fetchPlusNames = fetchData(url2 + fetchNames);
    // console.log(fetchPlusNames)


 //   const wiki = fetchData((url2) => url2+names);
 //   // const names =
 //   console.log(wiki + names);
 //   return wiki + names;
 //
 // }
generateProfile(breedUrl, wikiUrl);

//
// function generateProfiles(data){
//   console.log(data);
//   const profiles = data.map( (dog) => {
//      const profileJSON =
//
//      async function getJSON(url) {
//        try {
//          const response = await fetch(url);
//          // console.log(response);
//          return await response.json();
//        } catch (error) {
//          throw error;
//        }
//      }
//
//      await getJSON(wikiUrl + dog);
//      // console.log(profileJSON);
//      return profileJSON;
//   });
//
//
//   const profile = data.map(data);
//       console.log(profile);
//
// }



//fetch link with dognames at end to get wiki info in another function if possible
// function fetchProfile(wiki) {
//             const url = wiki;
//             return fetch(wiki)
//                       .then(checkStatus)
//                       .then(res => res.json())
//                       .then(console.log(data))
//                       .catch(error => console.log('Looks like there was a problem!', error))
//
// }

// async function getDogBreeds(url) {
// const breedJSON = await getJSON(url);
// const profiles = breedJSON.dogs.map( async (dog) => {
//    const profileJSON = await getJSON(wikiUrl + dog);
//    console.log(profileJSON);
//    return profileJSON;
// });
// return Promise.all(profiles);
// }


async function getJSON(url) {
  try {
    const response = await fetch(url);
    // console.log(response);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Get response/wikiUrl + dog names /  from getJSON(breedUrl) / and Wiki API info
  async function getDogBreeds(url) {
    //gets response object from getJSON(breedUrl) - returns breedUrl as object
  const breedJSON = await getJSON(url);
  console.log(breedJSON);
  console.log(breedJSON.dogs);
  const profiles = breedJSON.dogs.map( async (dog) => {
     const profileJSON = await getJSON(wikiUrl + dog);
     console.log(profileJSON);
     return profileJSON;
  });
  return Promise.all(profiles);
}

















// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}


// Gets Random Fact
function generateFactList(data) {
  for (let i = 0; i < data.length; i++) {
      const randomFacts = data[Math.floor(Math.random() * data.length)];
      array.push(randomFacts);
  }
  const arrayMap = array.map((key) => {
    const fact = key;
    return fact;
 });
}

// function generateWikiData(data) {
//   const wiki = data.map(dogname => `${wikiUrl}${dogname}`);
//   return wiki;
// }

function generateOptions(data) {
      const options = data.map(item => `
        <option value='${item}'>${item}</option>
  `).join('');
    select.innerHTML = options;
}

// Generate the markup for each profile
function generateHTML(data1, data2) {
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

// Loading spinner
function loadImage() {
  var loadImg = document.createElement("img");
    loadImg.className = 'loader';
    loadImg.setAttribute("src", "img/loader.gif");
    loadImg.setAttribute("alt", "Flower");
    placehere.appendChild(loadImg);
}

//// ------------------------------------------
////  EVENT LISTENERS
//// ------------------------------------------
btn.addEventListener('click', (event) => {

    Promise.all([
      fetchData(dogUrl),
      fetchData(breedUrl),
      // fetchData(wikiUrl + dognames)
    ])
    // .then(
    //   event.target.textContent = "Loading...",
    //   loadImage()
    //  )
    .then(data => {
      const factList = data[0];
      console.log(factList);
      const dogNames = data[1].dogs;
      console.log(dogNames);
      generateFactList(factList);
      // generateWikiData(dogNames);
      generateOptions(dogNames);
      // generateHTML(factList, wiki);
    })
    .then(
      event.target.remove(),
      placehere.remove(),
      select.className = 'btnSelect',
      select.setAttribute('onchange','document.location.hash=this.value'),
      defaultOption.text = 'Choose Dog Name',
      defaultOption.setAttribute("selected", "true"),
      select.prepend(defaultOption),
      searchBox.appendChild(select)
    )
});





// btn.addEventListener('click', async (event) => {
//   event.target.textContent = "Loading...";
//   loadImage();
//   try {
//     const dogs = await getDogFacts(dogUrl);
//     const dogbreed = await getDogBreeds(breedUrl);
//     generateHTML(dogs, dogbreed);
//     drop(dogbreed);
//   } catch(e) {
//       dogList.innerHTML = '<h3>Something went wrong!</h3>';
//       console.error(e);
//   } finally {
//     event.target.remove();
//     placehere.remove();
//     select.className = 'btnSelect';
//     select.setAttribute('onchange','document.location.hash=this.value');
//     defaultOption.text = 'Choose Dog Name';
//     defaultOption.setAttribute("selected", "true");
//     select.prepend(defaultOption);
//     searchBox.appendChild(select);
//   }
// });



// Handle all fetch requests






// Show me some dogs on button event
