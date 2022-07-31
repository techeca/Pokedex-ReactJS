# PokeApp

Plataforma para el consumo de la API [PokeAPI](https://pokeapi.co/)

Puedes ver:\
-Generaciones\
-Pokemon(detalles)

Para pruebas locales:

```bash
git clone https://github.com/techeca/Pokedex-ReactJS.git
npm i
npm run start
```

Open [http://localhost:3000/Pokedex-ReactJS](http://localhost:3000/Pokedex-ReactJS) to view it in your browser.

### Rutas

`/` - Home React. (Posiblemente será cambiada) \
`/pokeApp` - Panel para selección de región.\
Desde aqui se puede cambiar el tema (light/dark)/
`/generacion/idgen` - Lista de pokemon según `idgen`.\
Lista con los pokemon de la generación seleccionada.\
Puede filtrar por tipo o buscar por nombre, carga inicial de 18 pokemon y carga 18 más cuando llega al final de la página.\
`/pokemon/idpokemon` - Detalles de Pokemon según `idpokemon`.\
Al momento hay 2 componentes para mostrar detalles, uno para web y otro para mobiles, esto se debe cambiar.

Muestra los detalles básicos del pokemon seleccionado, id, name, generation, type, mith/leng, description, base stats, base happiness, capture rate y base experience.  
(Faltan moves, chain evolution)

`idpokemon` Número de pokemon según pokedex nacional.\
`idgen` Número de generación según lanzamiento.

## Falta

- [x] Lista de Generaciones.
- [x] Lista de Pokemon por Generación.
- [x] Buscar Pokemon por nombre.
- [ ] Filtrar por tipo. (No funciona correctamente)
- [x] Detalles de Pokemon.
- [ ] Movimientos de Pokemons. (En Detalles de Pokemon).
- [ ] Cadena de evolución.
- [ ] Lista de Categorias de Objetos.
- [x] Light/Dark theme.
- [ ] Cambio de idioma.
- [ ] Loading :P (Funciona mal)

## Errores

- [x] Origen descripciones, algunas descripciones aparecen en otros idiomas.
- [x] Arreglar search pokemon, no muestra resultados.
- [x] Arreglar backButton en Detalles de pokemon, regresa a la ubicación anterior y no a la generación.
- [ ] Agregar filtro por tipo, al filtrar muchos no hay pokemon suficientes para cargar fetchMoreData().
- [ ] Arreglar Loading (se ve mal) update: cambiado pero se sige viendo mal (web).
- [x] Arreglar temas, colores de fondo.
- [ ] Agregar decimales a KG y M.
- [ ] Agregar cambio de idiomas.

`fetchMoreData`: Carga más pokemon cuando se llega al final de la página en `/generacion`

## Imagenes

![test](https://user-images.githubusercontent.com/53408118/181391245-43ceb537-12ef-4a63-85a8-0e6d372cef59.PNG)
![test2](https://user-images.githubusercontent.com/53408118/181391255-a5c34518-e7ab-46e3-9f0f-cb4ca886c165.PNG)
![test6](https://user-images.githubusercontent.com/53408118/181391671-eec76cb8-456d-483d-a530-ab2b21f21745.PNG)
![test7](https://user-images.githubusercontent.com/53408118/181391681-bd07f9fe-4edc-4ee0-a041-ee9e2a0cf7ea.PNG)

## More

Recursos
[MockUp de ejemplo](https://www.figma.com/file/KEGlrZfL5UO3UxultQ5xh1/Pokédex-Figma-Card-Templates)
