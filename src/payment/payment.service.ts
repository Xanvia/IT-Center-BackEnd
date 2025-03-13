import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { ReserveRecordsService } from 'src/reserve-records/reserve-records.service';
const PaymentParser = require('../../utils/paymentParser');

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    private reservationRecordService: ReserveRecordsService,
  ) {}

  async initiatePayment(
    recaptchaToken: string,
    recordId: string,
    type: 'RESERVE' | 'COURSE',
  ) {
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
    console.log('reCAPTCHA verification:', data);

    // Check the result
    if (!data.success) {
      return new HttpException('reCAPTCHA verification failed', 400);
      console.error('reCAPTCHA verification failed:', data);
      return false; // Failed
    }

    // Create session
    var paymentRecord: Payment;
    if (type === 'RESERVE') {
      try {
        const record = await this.reservationRecordService.findOne(recordId);
        paymentRecord = this.paymentRepo.create({
          referenceId: recordId,
          amount: record.charges,
          description: `Reerved Date: ${record.startingDate} - ${record.endingDate}   Time: ${record.timeSlot}`,
          subject: 'Reservation Payment for ' + record.eventName,
        });
        paymentRecord = await this.paymentRepo.save(paymentRecord);
      } catch (error) {
        return new HttpException('Record not found', 404);
      }
    } else {
      // paymentRecord = this.paymentRepo.create({
      //   referenceId: recordId,
      //   amount: 100,
      //   description: 'Course Payment',
      //   subject: 'Course Payment',
      // });
      // paymentRecord = this.paymentRepo.save(paymentRecord);
    }
    const paymentRequest = {
      apiOperation: 'INITIATE_CHECKOUT',
      'order.id': paymentRecord.id,
      'order.amount': paymentRecord.amount.toString(),
      'order.currency': process.env.CURRENCY,
      'order.reference': paymentRecord.referenceId,
      'order.description': paymentRecord.description,
      'interaction.operation': 'PURCHASE',
      'interaction.merchant.name': 'ITC_PAYMENTS',
    };

    const merchant = {
      certificateVerifyPeer: false,
      certificateVerifyHost: 0,
      proxyCurlOption: 0,
      proxyCurlValue: 0,
      gatewayUrl: process.env.PAYMENT_URL,
      merchantId: process.env.MERCHANT_ID,
      apiUsername: process.env.PAYMENT_USER,
      password: process.env.PAYMENT_PASSWORD,
      debug: true,
      version: '71',
    };

    const paymentParser = new PaymentParser(merchant);
    const res = await paymentParser.sendTransaction(paymentRequest);

    console.log('Payment initiated:', res);

    // Parse the response to get the session id.
    const responseParams = res.split('&');
    let sessionId = '';
    let version = '';
    for (const param of responseParams) {
      const [key, value] = param.split('=');
      if (key === 'session.id') {
        sessionId = value;
      } else if (key === 'session.version') {
        version = value;
      }
    }

    return {
      sessionId,
      responseParams,
      version,
    };
  }
  catch(error) {
    console.error('Error initiating payment:', error);
    return new HttpException('Internal server error', 500);
  }
}
