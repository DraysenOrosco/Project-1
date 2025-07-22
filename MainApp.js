//this fetches data from the pokemon api depending on the user input!
async function fetchData() {
  try{
    // converts user input to lowercase 
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    //fetches the pokemon data dependent on the name 
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
//if response is not valid then error will show 
    if(!response.ok){
      throw new Error("could not fetch data");
      
    }
//retuns the response data into a JSON format!
    const data = await response.json();
    // get default image of a pokemon inputted 
    const pokemonSprite = data.sprites.front_default;
    const imgElement = document.getElementById("pokemonSprite");
    imgElement.src = pokemonSprite;
    imgElement.style.display = "block";
// get shiny display of pokemon
    const shinySprite = data.sprites.front_shiny;
    const shinyImgElement = document.getElementById("shinyPokemonSprite");
    shinyImgElement.src = shinySprite;
    shinyImgElement.style.display = "block";
// extract and format the pokemons abilities 
    const abilities = data.abilities.map(a => a.ability.name).join(', ');
// extract and format the pokemons types 
    const types = data.types.map(t => t.type.name).join(', ');
// extract and format the pokemons stats 
    const stats = data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join('<br>');
// extract and format the pokemons moves 
    const moves = data.moves.slice(0, 10).map(m => m.move.name).join(', ');
// fetches the addtional species info to get a description (displays the pokemons descrition)
    const speciesUrl = data.species.url;
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();
    //finds the first description in english
    const flavorEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
    const flavorText = flavorEntry ? flavorEntry.flavor_text.replace(/\f/g, ' ') : "No description available.";
    //inputs all the info into the page for user to see 
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
    //if error was inputted like a wrong name or invalid word thows error
    console.error(error);
    document.getElementById("pokemonInfo").innerHTML = `<p style="color:red;">Error: Pokémon not found.</p>`;
    //hides the sprites if pokemon not found 
    document.getElementById("pokemonSprite").style.display = "none";
    document.getElementById("shinyPokemonSprite").style.display = "none";
  }
}