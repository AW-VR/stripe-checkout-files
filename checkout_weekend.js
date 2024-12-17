// Import the Stripe library
const stripe = require('stripe')('pk_live_51QV33BD3sZxV8oZVFaTfdWqGJTWhMJIkRr1NBgVxO8RHPFjEgQ7iVfidGtZZOVnrX5BWcGfIk0v7pgfBkuPCnYc100SBgdCnaE'); // Replace with your Stripe Secret Key

(async () => {
  try {
    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Accept card payments
      line_items: [
        {
          price: 'price_1QVjaCD3sZxV8oZVRBrUWZI4', // Replace with your Product Price ID
          quantity: 1, // Default initial quantity
          adjustable_quantity: {
            enabled: true, // Enable adjustable quantity
            minimum: 1, // Minimum quantity customers can select
            maximum: 14, // Maximum quantity customers can select
          },
          tax_rates: ['txr_1QVmXLD3sZxV8oZVccj6KRmQ', 'txr_1QVoPcD3sZxV8oZVq2GMop0u'] // Replace with your Tax Rate IDs
        },
      ],
      mode: 'payment', // One-time payment mode
      submit_type: 'book', // Change the button text to "Book"
      success_url: 'https://anotherworldbc.ca/thank_you', // Replace with your success URL
      cancel_url: 'https://anotherworldbc.ca/booking', // Replace with your cancel URL
    });

    console.log('Checkout session created:', session.url);
  } catch (error) {
    console.error('Error creating session:', error.message);
  }
})();
