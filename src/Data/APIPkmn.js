//Obtiene categorías
export function getCategorias(){
 return fetch(`https://pokeapi.co/api/v2/generation/`)
    .then((res) => res.json())
}

//Detalles de Generación
export function getDetailsGen(urlGen){
 return fetch(`${urlGen}`)
    .then((res) => res.json())
}

//Pokemon de cada generacion
export function getPkmnByGen(rango){
 return fetch(`https://pokeapi.co/api/v2/pokemon/?${rango}`)
    .then((res) => res.json())
}

//Detalles de pokemon
export function getDetailsPkmn(idPkmn){
  let tempUrl = isNaN(idPkmn) ? idPkmn.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '') : idPkmn;
      return fetch(`https://pokeapi.co/api/v2/pokemon/${tempUrl}/`)
             .then((res) => res.json())
}

export function getMoreDetailsPkmn(idPkmn){
  return fetch(`https://pokeapi.co/api/v2/pokemon-species/${idPkmn}/`)
             .then((res) => res.json())
}

export function getAllTypes(){
  return fetch(`https://pokeapi.co/api/v2/type`)
         .then((res) => res.json())
}
