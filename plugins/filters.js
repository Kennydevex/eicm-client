import Vue from "vue";
import Vue2Filters from "vue2-filters";

var Vue2FiltersConfig = {
  capitalize: {
    onlyFirstLetter: false
  },
  number: {
    format: "0",
    thousandsSeparator: ",",
    decimalSeparator: "."
  },
  bytes: {
    decimalDigits: 2
  },
  percent: {
    decimalDigits: 2,
    multiplier: 100
  },
  currency: {
    symbol: "ECV",
    decimalDigits: 0,
    thousandsSeparator: ".",
    decimalSeparator: ",",
    symbolOnLeft: false,
    spaceBetweenAmountAndSymbol: true,
    showPlusSign: false
  },
  pluralize: {
    includeNumber: false
  },
  ordinal: {
    includeNumber: false
  }
};
Vue.use(Vue2Filters, Vue2FiltersConfig);
