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
        multi: "linear-gradient(180deg, #E32A2A 0%, #3D50A5 34.71%, #38E2C9 67.08%, #383838 100%)",
        test: "url('https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png')",
        'homeBanner': "url('../images/homepage-image.jpg')",
        'homeInnovation': "url('../images/innovation.jpeg')",
        'homeInnovationMobile': 'linear-gradient(0deg, #3E7089 0%, #477994 50.44%, #324AB0 100%)',
        'homeTrending1': "url('../images/trending1.png')",
        'homeTrending2': "url('../images/trending2.jpg')",
        'homeTrending3': "url('../images/trending3.jpg')",
        'homeTrending4': "url('../images/trending4.jpg')",
        'homeTrending5': "url('../images/trending5.jpg')",
        'homeTrending6': "url('../images/trending6.png')",
        'homeTrending7': "url('../images/trending7.jpg')",

      },
      boxShadowColor: {
        headerShadow:
          "0 30px 30px 0 rgba(0,0,0,0.09), 0 20px 20px 0 rgba(0,0,0,0.1), 0 10px 10px 0 rgba(0,0,0,0.1)",
        buttonShadow:
          "0 20px 20px 0 rgba(0,0,0,0.1), 0 10px 10px 0 rgba(0,0,0,0.1)",
      },

      colors: {
        "primary-blue": "#243c5a",
        blue: "#00095B",
        brown: "#77401C",
        green: "#0E331F",
        grey: "#757575",
        orange: "#E66926",
        red: "#B22627",
        yellow: "#E4941A",
        purple: "#662D6E"
      },
    },
  },
  plugins: [],
};
