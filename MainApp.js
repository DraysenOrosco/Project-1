
async function fetchData() {
  try{

    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

    if(!response.ok){
      throw new Error("could not fetch data");
      
    }

    const data = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const imgElement = document.getElementById("pokemonSprite");
    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";

    const shinySprite = data.sprites.front_shiny;
    const shinyImgElement = document.getElementById("shinyPokemonSprite");
    shinyImgElement.src = shinySprite;
    shinyImgElement.style.display = "block";

    const abilities = data.abilities.map(a => a.ability.name).join(', ');

    const types = data.types.map(t => t.type.name).join(', ');

    const stats = data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join('<br>');

    const moves = data.moves.slice(0, 10).map(m => m.move.name).join(', ');

    const speciesUrl = data.species.url;
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();
    const flavorEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
    const flavorText = flavorEntry ? flavorEntry.flavor_text.replace(/\f/g, ' ') : "No description available.";
    const infoElement = document.getElementById("pokemonInfo");
    infoElement.innerHTML = `
      <p><strong>Abilities:</strong> ${abilities}</p>
      <p><strong>Types:</strong> ${types}</p>
      <p><strong>Stats:</strong><br>${stats}</p>
      <p><strong>Description:</strong> ${flavorText}</p>
      <p><strong>Move Set (First 10):</strong> ${moves}</p>
    `;

  }
  catch(error){
    console.error(error);
    document.getElementById("pokemonInfo").innerHTML = `<p style="color:red;">Error: Pokémon not found.</p>`;
    document.getElementById("pokemonSprite").style.display = "none";
    document.getElementById("shinyPokemonSprite").style.display = "none";
  }
}


// fetch("https://pokeapi.co/api/v2/pokemon/chimchar")
// .then(response => {
//   if (!response.ok){
//     throw new Error("could not fetch resourse");
//   }
//   return response.json();
// }) //converts the response into a json
// .then(data => console.log(data.name))
// .catch (error => console.log(erroe));

// function myFunction() {
//   var element = document.body;
//   element.classList.toggle("dark-mode");
// }

// console.log("hello from the Pokemon API")

// let myBaseUrl = "https://pokeapi.co/api/v2/pokemon/chimchar/"

// fetch(myBaseUrl + "chimchar")
//     .then(httpResponse => httpResponse.json())
//     .then(definitionData => {
//         console.log("Word", definitionData[0].word);
//       })

//     const onDropDownChange = (event) => {
//       //console.log event
//     fetch(myBaseUrl + event.target.value)
//       .then(httpResponse => httpResponse.json())
//       .then(definitionData =>{
//         console.log("Word", definitionData[0].word);
//         let defHolder = document.querySelector("#definition-holder");
//         defHolder.innerHTML =`<h3>${definitionData[0].word}</h3> 
//         <p>${definitionData[0].meanings[0].definitions[0].definition}}</p>
//           `
//       })
//     }

//     let myDropDown = document.querySelector("#pokemon-Terms");
//     myDropDown.addEventListener("change", onDropDownChange)
//dark mode code

//image toggle button 
// function toggleImage() {
//   const imageElement = document.getElementById('myImage');
//   if (imageElement.src.includes('https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png')) {
//     imageElement.src = 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/390.png';
//   } else {
//     imageElement.src = 'none';
//   }
// }


// async function getData() {
//     const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`Response status: ${response.status}`);
//       }
  
//       const json = await response.json();
//       console.log(json);
//     } catch (error) {
//       console.error(error.message);
//     }
//   }
