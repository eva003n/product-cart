export function formatCurrency(price) {
    const priceShillings = (Math.round(price) / 100).toFixed(2);
    return priceShillings;


}
export function convertToCents (priceShillings) {
    const priceCents = priceShillings * 100;
    return priceCents;
}