import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { Feedback } from './feedback.entity';

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

  @Get()
  getAll(): Promise<Feedback[]> {
    return this.feedbackService.getAll();
  }
}
