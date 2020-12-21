module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "hero-pattern": "url('/src/assets/pokemons.jpg')",
        "registro-img": "url('/src/assets/fondo.jpg')",
        backgroundColor: ["active"],
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
