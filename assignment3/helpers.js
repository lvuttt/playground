const calculateTax = (income) => {
  if (income == 0) return 0
  var incomeRange = [0, 150000, 300000, 500000, 750000, 1000000, 2000000, 5000000, Infinity]
  var taxRate = [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35]
  var maxTax = [0, 0, 7500, 27500, 65000, , 115000, 365000, 1265000]
  for (i = 0; i < taxRate.length; i++) {
    if (incomeRange[i] < income && income <= incomeRange[i + 1]) {
      return (income - incomeRange[i]) * taxRate[i] + maxTax[i]
    }
  }
}

function isNumeric(x) {
  return parseFloat(x).toString() === x.toString();
}

module.exports = {
  "calculateTax": calculateTax,
  "isNumeric": isNumeric,
}