# Ti-medi challenge

1. Un buscador de repositorios de Github
   El primer punto de entrada de la aplicación es un buscador que se conecta a la Api de Github y este tiene que devolver los resultados paginados. https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-repositories

2. Listar los resultados de la búsqueda
   El listado de la búsqueda tiene que mostrar los siguientes campos:

- Nombre del Owner
- Nombre del Repo y su descripción
- La imagen del Avatar del Owner
- Fecha de creación y última actualización
- Los Topics del Repo
- El lenguaje del Repo
- El número de las estrellas que tiene el Repo.
- Este listado debería ser paginado, es decir que podemos tener X resultados por página y el usuario pueda cambiar de página.

3. Cada Item debe ser clicable
   Al hacer click en un Item de la lista se debe abrir en una pestaña nueva la URL del Repo en el Github.

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- 🏗 Built with [NextJS](https://nextjs.org)
- 🧰 React components for faster web development with style [MUI](https://mui.com)
- 🎨 Custom styles powered by [TailwindCSS](https://tailwindcss.org)
