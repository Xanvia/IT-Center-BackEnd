import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  initiatePayment(@Body() body: any) {
    return this.paymentService.initiatePayment(
      body.recaptchaToken,
      body.recordId,
      body.type,
    );
  }
}
