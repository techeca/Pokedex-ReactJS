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
Desde aqui se puede cambiar el tema (light/dark)

![mode-teme](https://user-images.githubusercontent.com/53408118/182007744-f3136870-c41b-4f59-979f-6e23e9e192c0.png)

`/generacion/idgen` - Lista de pokemon según `idgen`.\
Lista con los pokemon de la generación seleccionada.\
Puede filtrar por tipo o buscar por nombre, carga inicial de 18 pokemon y carga 18 más cuando llega al final de la página.

![search-filter](https://user-images.githubusercontent.com/53408118/182007769-44b87369-c973-456c-a4d8-85a4bb671e36.png)

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

Los más urgente:
Filtro de tipos: efecta el funcionamento
loading: afecta lista (Solo web, en móbiles/emuladores, funciona bien)

## Imagenes

![genB](https://user-images.githubusercontent.com/53408118/182007801-3783207e-09cf-4112-936b-47d36b2b4330.png)
![gensW](https://user-images.githubusercontent.com/53408118/182007803-9e014de1-1e56-4a9b-8a87-291802b4674d.png)

![detB](https://user-images.githubusercontent.com/53408118/182007828-dd6edfc5-d91c-42c2-8a1d-7828133f0abe.png)
![detW](https://user-images.githubusercontent.com/53408118/182007829-dbdc9928-911b-4adb-b428-25534b148aab.png)

![webB](https://user-images.githubusercontent.com/53408118/182007806-009f108e-6cbc-4aaf-81fe-25e73ec479de.PNG)


## More

Recursos
[MockUp de ejemplo](https://www.figma.com/file/KEGlrZfL5UO3UxultQ5xh1/Pokédex-Figma-Card-Templates)
