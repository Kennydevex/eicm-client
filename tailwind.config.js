const defaultTheme = require("tailwindcss/defaultTheme");
// No caso de ficar  fora de extend, iremos sobrepor todas as cores existentes

module.exports = {
  important: true,
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem"
      },

      boxShadow: {
        xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        outline: "0 0 0 3px rgba(62, 64, 149, 0.5)",
        focus: "0 0 0 3px rgba(66, 153, 225, 0.5)",
        none: "none"
      },

      opacity: {
        "0": "0",
        "25": ".25",
        "50": ".5",
        "75": ".75",
        "10": ".1",
        "20": ".2",
        "30": ".3",
        "40": ".4",
        "50": ".5",
        "60": ".6",
        "70": ".7",
        "80": ".8",
        "90": ".9",
        "100": "1"
      },
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
        "11/12": "91.666667%",
        "96": "24rem",
        "112": "28rem",
        "160": "40rem"
        // "160": "40rem" => 160/4=40
      }
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active", "group-hover"],
    textColor: ["responsive", "hover", "focus", "active", "group-hover"],
    fontWeight: ["responsive", "hover", "focus", "active", "group-hover"],
    fontSize: ["responsive", "hover", "focus", "active", "group-hover"],
    translate: ["responsive", "hover", "focus", "active", "group-hover"],
    scale: ["responsive", "hover", "focus", "active", "group-hover"],
    skew: ["responsive", "hover", "focus", "active", "group-hover"],
    borderWidth: ["responsive", "hover", "focus", "active"],
    borderColor: ["responsive", "hover", "focus", "active"],
    display: ["responsive", "hover", "focus", "active", "group-hover"],
    borderRadius: ["hover", "focus"]
  },
  future: {
    removeDeprecatedGapUtilities: true
  }
};
