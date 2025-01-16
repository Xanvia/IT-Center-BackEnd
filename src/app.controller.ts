import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as crypto from 'crypto';
import { exec } from 'child_process';

@Controller()
export class AppController {
  private readonly WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('webhook')
  webhook(
    @Body() body,
    @Headers('x-hub-signature-256') signature: string,
    @Res() res: Response,
  ) {
    console.log(this.WEBHOOK_SECRET);

    // Generate the signature
    const sig = `sha256=${crypto
      .createHmac('sha256', this.WEBHOOK_SECRET)
      .update(JSON.stringify(body))
      .digest('hex')}`;

    // Validate the signature
    if (signature !== sig) {
      throw new HttpException('Invalid signature', 401);
    }

    // Check for the specific branch
    if (body.ref === 'refs/heads/deployment') {
      exec('./deploy.sh', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error: ${stderr}`);
          return new BadRequestException(`Error: ${stderr}`);
        }
        console.log(`Deployment output: ${stdout}`);
        return 'Deployment successful';
      });
    } else {
      return 'No deployment branch changes...';
    }
  }
}
