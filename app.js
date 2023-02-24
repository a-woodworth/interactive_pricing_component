const trialOffer30Form = document.forms['30DayTrial'];
const range = trialOffer30Form.elements.pageviews;
const billingPlan = trialOffer30Form.elements.billing;
const pages = document.querySelector('[data-js="pageviews"]');
const cost = document.querySelector('[data-js="price"]');
const ariaForRange = document.querySelector('[data-js="aria-range-output"]');

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

// Update price if annual plan selected
function calculateDiscount(price, percentage) {
  const discountTotal = Math.floor( (price * percentage) / 100 );
  const reducedPrice =  price - discountTotal;
  return reducedPrice;
} 

// Update plan details on input
function renderPlan(inputValue) {
  const rangeInput = inputValue;
  const billing = billingPlan.value;

  // Return range values to get plan info
  const plan = pricingTable.pageviews.map(value => {
    return value.rangeValue;
  });
  const rangeIndex = plan.indexOf(rangeInput);

  // Update plan details - pageviews and price
  const description = pricingTable.pageviews[rangeIndex].description;
  const amount = pricingTable.pageviews[rangeIndex].price;

  pages.innerHTML = `${description}`;

  // if yearly plan selected, apply 25% discount
  if ( billing === 'yearly' ) {
    const discountApplied = calculateDiscount(amount, pricingTable.discount.percent25);

    cost.innerHTML = `${numberToCurrency(discountApplied)}`;
    ariaForRange.innerHTML = `${description} pageviews ${numberToCurrency(discountApplied)} per month`;
  } else {
    cost.innerHTML = `${numberToCurrency(amount)}`;
    ariaForRange.innerHTML = `${description} pageviews ${numberToCurrency(amount)} per month`;
  }
}

trialOffer30Form.addEventListener('change', () => {
  const rangeVal = Number(trialOffer30Form.elements.pageviews.value);

  renderPlan(rangeVal);
});

trialOffer30Form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(trialOffer30Form);
  const selectedPlan = [...data.values()];
  // console.log(selectedPlan);

  // Send the data to new page/form for free trial enrollment
});
