// Import the Stripe library
const stripe = require('stripe')('pk_live_51QV33BD3sZxV8oZVFaTfdWqGJTWhMJIkRr1NBgVxO8RHPFjEgQ7iVfidGtZZOVnrX5BWcGfIk0v7pgfBkuPCnYc100SBgdCnaE'); // Replace with your Stripe Secret Key

(async () => {
  try {
    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Accept card payments
      line_items: [
        {
          // First item: fixed quantity, no adjustments
          price: 'price_1QVqTnD3sZxV8oZV260cMuV3', // Base Party Package Price ID
          quantity: 1, // Fixed quantity
          tax_rates: ['txr_1QVmXLD3sZxV8oZVccj6KRmQ', 'txr_1QVoPcD3sZxV8oZVq2GMop0u'], // Replace with your Tax Rate IDs
        },
        {
          // Second item: adjustable, starts at 1 but customers can set to 0
          price: 'price_1QVqCMD3sZxV8oZVvz72opdn', // Additional Players Price ID
          quantity: 1, // Start with quantity 1 (required by Stripe)
          adjustable_quantity: {
            enabled: true, // Allow customers to adjust quantity
            minimum: 0, // Customers can reduce the quantity to 0 (effectively removing it)
            maximum: 10, // Set a maximum limit for quantity
          },
          tax_rates: ['txr_1QVmXLD3sZxV8oZVccj6KRmQ', 'txr_1QVoPcD3sZxV8oZVq2GMop0u'], // Replace with your Tax Rate IDs
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
