import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';
import { Repository } from 'typeorm';
import { CreateConsultationDto } from './dto/createConsultation.dto';
import { Consultation } from './consultation.entity';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback) private feedbackRepo: Repository<Feedback>,
    @InjectRepository(Consultation)
    private consultationRepo: Repository<Consultation>,
  ) {}
  // create
  async createFeedBack(createFeedBack: CreateFeedbackDto) {
    const feedback = this.feedbackRepo.create({ ...createFeedBack });
    return await this.feedbackRepo.insert(feedback);
  }

  // create
  async createConsultation(createConsultationDto: CreateConsultationDto) {
    const conslt = this.consultationRepo.create({ ...createConsultationDto });
    return await this.consultationRepo.insert(conslt);
  }

  // delete
  async deleteFeedBackbyID(id: string) {
    const result = await this.feedbackRepo.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Feedback with id ${id} not found!`);
  }

  // get all feedbacks
  async getAll(): Promise<Feedback[]> {
    return await this.feedbackRepo.find({
      order: {
        createdDate: 'DESC',
      },
    });
  }

  async getAllConst(): Promise<Consultation[]> {
    return await this.consultationRepo.find({
      order: {
        createdDate: 'DESC',
      },
    });
  }
}
