import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback) private feedbackRepo: Repository<Feedback>,
  ) {}
  // create
  async createFeedBack(createFeedBack: CreateFeedbackDto) {
    const feedback = new Feedback();
    feedback.email = createFeedBack.email;
    feedback.description = createFeedBack.description;
    return await this.feedbackRepo.insert(feedback);
  }

  // delete
  async deleteFeedBackbyID(id: string) {
    console.log(id);
    return await this.feedbackRepo.delete({ id: id });
  }

  // get all feedbacks
  async getAll(): Promise<Feedback[]> {
    return await this.feedbackRepo.find();
  }
}
