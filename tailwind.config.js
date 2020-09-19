const defaultTheme = require("tailwindcss/defaultTheme");
// No caso de ficar  fora de extend, iremos sobrepor todas as cores existentes
module.exports = {
  theme: {
    extend: {
      colors: {
        // primary: "defaultTheme.colors.red",
        primary: "defaultTheme.colors.red",
        primary: "#3E4095",
        "band-red": "#f0f"
      },
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666667%",
        "2/6": "33.333333%",
        "3/6": "50%",
        "4/6": "66.666667%",
        "5/6": "83.333333%",
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%"
      }
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"]
  },
  future: {
    removeDeprecatedGapUtilities: true
  }
};

// primary: '#3E4095',
//                 // primary: '#2698d9', rgb(62, 64, 149), hsl(239, 41%, 42%)
//                 secondary: '#683e95',
//                 info: '#3e6c95',
//                 accent: '#3e6c95',
//                 sucess: '#40953E',
//                 warning: '#95933E',
//                 error: '#953E40',
//                 facebook: '#3b5998',
//                 twitter: '#1DA1F2',
//                 google: '#DB4437',
