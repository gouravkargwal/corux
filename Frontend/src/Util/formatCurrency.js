const formatCurrency = (value) => {
  return value ? `₹ ${parseFloat(value).toFixed(2)}` : "₹ 0.00";
};

export default formatCurrency