import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { Feedback } from './feedback.entity';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'enums/role.enum';
import { RolesGuard } from 'src/auth/gaurds/roles/roles.guard';
import { ADMIN } from 'types/user.type';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private feedbackService: FeedbacksService) {}

  @Post()
  createFeedBack(@Body() createFeedBackDto: CreateFeedbackDto) {
    return this.feedbackService.createFeedBack(createFeedBackDto);
  }

  @Delete()
  deleteFeedbackbyID(@Query('id') id: string) {
    return this.feedbackService.deleteFeedBackbyID(id);
  }

  @Roles(ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<Feedback[]> {
    return this.feedbackService.getAll();
  }
}
