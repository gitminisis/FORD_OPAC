module.exports = {
  content: [
    "./*.html",
    "./includes/html/**/*.html",
    "./includes/html/*.html",
    "./assets/js/*.js",
  ],
  theme: {
    extend: {
      background: {
        imageHover: "rgba(0,0,0,0)",
      },
      backgroundImage: {
        test: "url('https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png')",
      },
      boxShadowColor: {
        headerShadow:
          "0 30px 30px 0 rgba(0,0,0,0.09), 0 20px 20px 0 rgba(0,0,0,0.1), 0 10px 10px 0 rgba(0,0,0,0.1)",
        buttonShadow:
          "0 20px 20px 0 rgba(0,0,0,0.1), 0 10px 10px 0 rgba(0,0,0,0.1)",
      },

      colors: {
        "primary-blue": "#243c5a",
      },
    },
  },
  plugins: [],
};
