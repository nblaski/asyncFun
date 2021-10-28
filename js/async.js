const dogUrl = 'https://raw.githubusercontent.com/DukeNgn/Dog-facts-API/master/data.json';
//const dogUrl = 'https://dog.ceo/api/breeds/list/all';
const breedUrl = 'https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dogs.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const dogList = document.getElementById('dogList');
const breedSection = document.getElementById('breedSection');
const btn = document.querySelector('button');
let array = [ ];

// Handle all fetch requests
async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

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


  async function getDogBreeds(url) {
  const breedJSON = await getJSON(url);
//  console.log(breedJSON);

  const profiles = breedJSON.dogs.map( async (dog) => {
     const profileJSON = await getJSON(wikiUrl + dog);
     //console.log(profileJSON);
     return profileJSON;
  });
  return Promise.all(profiles);
}




// Generate the markup for each profile
function generateHTML(data1, data2) {
  console.log(typeof data1);
  console.log(data2);

  data1.map( factDog => {
    //console.log(factDog);
    const listItem = document.createElement('li');
    //dogList.appendChild(listItem);
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
            <img src=${factDog.thumbnail.source}>
            <h1>${factDog.title}</h1>
            <h2>${factDog.description}</h2>
            <p>${factDog.extract}</p>
          </div>
          <div class="factBox">
            <div class="factTitle">Random Fun Fact: </div>
            <div class="fact">${data1[Math.floor(Math.random() * data1.length)].fact}</div>
            <div class="factFooter">Reload page to switch them up! </div>
          </div>
        `;
      } else {
        section.innerHTML = `
        <img src="img/dogPlaceholder.jpg" alt="Dog dogPlaceholder">

          <p>Results unavailable for ${factDog.title}</p>

        `;

      }

  });
}

btn.addEventListener('click', async (event) => {
  event.target.textContent = "Loading...";
  var loadImg = document.createElement("img");
  loadImg.className = 'loader';
  loadImg.setAttribute("src", "img/loader.gif");
  loadImg.setAttribute("alt", "Flower");
  document.getElementById("placehere").appendChild(loadImg);
  try {
    const dogs = await getDogFacts(dogUrl);
    const dogbreed = await getDogBreeds(breedUrl);
    generateHTML(dogs, dogbreed);
  } catch(e) {
      dogList.innerHTML = '<h3>Something went wrong!</h3>';
      console.error(e);
  } finally {
    event.target.remove();
    loadImg.remove();
  }
});
