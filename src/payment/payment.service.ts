import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  async initiatePayment(recaptchaToken: string, recordId: string) {
    console.log('Initiating payment...');

    // initiate payment logic
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Required for form-encoded data
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        }),
      },
    );
    const data = await response.json();

    // Check the result
    if (data.success) {
      console.log('reCAPTCHA verified successfully:', data);
      return true; // Success
    } else {
      console.error('reCAPTCHA verification failed:', data);
      return false; // Failed
    }
  }

  async createSession(recordId: string) {
    // try {
    // Replace with your gateway credentials
    const merchantId = 'your-merchant-id';
    const apiUsername = '';
    const apiPassword = 'your-api-password';
    const apiEndpoint =
      'https://bankofceylon.gateway.mastercard.com/api/nvp/version/60';

    const orderData = {
      apiOperation: 'CREATE_CHECKOUT_SESSION',
      'order.id': 'order-' + Date.now(), // Unique order ID
      'order.amount': '100.00', // Replace with actual amount
      'order.currency': 'USD', // Replace with actual currency
      'interaction.operation': 'PURCHASE',
    };

    //   const response = await axios.post(
    //     apiEndpoint,
    //     new URLSearchParams(orderData),
    //     {
    //       headers: {
    //         Authorization: `Basic ${Buffer.from(`${merchantId}:${apiPassword}`).toString('base64')}`,
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //       },
    //     },
    //   );

    //   const parsedResponse = new URLSearchParams(response.data);
    //   const sessionId = parsedResponse.get('session.id');

    //   if (sessionId) {
    //     res.json({ sessionId });
    //   } else {
    //     res.status(400).json({ error: 'Failed to create session' });
    //   }
    // } catch (error) {
    //   console.error('Error creating session:', error);
    //   res.status(500).json({ error: 'Internal server error' });
    // }
  }
}
