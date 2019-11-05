function fetchPokemon(name) {
  const pokemonQuery = `
    query ($name: String) {
      pokemon(name: $name) {
        id
        number
        name
        image
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
  `

  return window
    .fetch('https://graphql-pokemon.now.sh', {
      // learn more about this API here: https://graphql-pokemon.now.sh/
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: {name: name.toLowerCase()},
      }),
    })
    .then(r => r.json())
    .then(response => {
      const pokemon = response.data.pokemon
      if (pokemon) {
        return pokemon
      } else {
        return Promise.reject(new Error(`No pokemon with the name "${name}"`))
      }
    })
}

function getImageUrlForPokemon(pokemonName) {
  if (fetch.isHacked) {
    return `/img/pokemon/${pokemonName.toLowerCase()}.jpg`
  } else {
    return `https://img.pokemondb.net/artwork/${pokemonName.toLowerCase()}.jpg`
  }
}

export default fetchPokemon
export {getImageUrlForPokemon}
