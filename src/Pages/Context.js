import { createContext } from 'react';
import { getTheme } from './themes.js'

export const userContext = createContext(getLocalData());
//{userData:{getData:getLocalData()}}

//Define data local, theme y lang por el momento 1313
function getLocalData(){
  const localTheme = localStorage.getItem('themePokedex') ? localStorage.getItem('themePokedex') : '';
  const localLang = localStorage.getItem('langPokedex') ? localStorage.getItem('langPokedex') : '';

  //Se crean los datos locales si es que no están, por defecto: modo claro e idioma ingles
  if(!localTheme){localStorage.setItem('themePokedex', 'light')}
  if(!localLang){localStorage.setItem('langPokedex', 'en')}

  //const localMode = getTheme(localTheme)
  return {theme:{get:getTheme(localTheme), update:{updateLocal:updateThemeMode, updatetheme:getTheme}}, data:{}, lang:localLang}
}

//Actualiza idioma de web
export function updateLang(newLang){
  localStorage.setItem('langPokedex', newLang)
}

//Actualiza el modo de tema (dark o light)
export function updateThemeMode(newTheme){
  //console.log(newTheme)
  localStorage.setItem('themePokedex', newTheme)
}
