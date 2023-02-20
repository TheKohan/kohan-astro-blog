module.exports = {
  tailwindConfig: "./tailwind.config.cjs",
  plugins: [
    require("prettier-plugin-astro"),
    require("prettier-plugin-tailwindcss"),
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
