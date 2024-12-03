export const formatIndianCurrency = (value?: number | string) => {
    if(!value && value!== 0) return "";
    const parts = value.toString().split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const decimalPart = parts[1] ? `.${parts[1]}` : '';
    return `₹${integerPart}${decimalPart}`;
};