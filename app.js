const pricingTable = {
  pageviews: [
    { description: '10k', price: 8, rangeValue: 0 },
    { description: '50k', price: 12, rangeValue: 25 },
    { description: '100k', price: 16, rangeValue: 50 },
    { description: '500k', price: 24, rangeValue: 75 },
    { description: '1m', price: 36, rangeValue: 100 }
  ],

  discount:
    { percent25: 25 }
};

// Format number to US dollars
function numberToCurrency(amount) {
  const valueAsDollars = { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }
  const numberFormat = new Intl.NumberFormat( 'en-US', valueAsDollars );
  return numberFormat.format(amount);
}

function calculateDiscount(price, percentage) {
  const discountTotal = Math.floor( (price * percentage) / 100 );
  const reducedPrice = numberToCurrency( price - discountTotal );
  return reducedPrice;
} 
