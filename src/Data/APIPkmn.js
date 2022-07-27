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
export function getDetailsPkmn(urlPkmn){
  return fetch(`${urlPkmn}`)
  .then((res) => res.json())
}
