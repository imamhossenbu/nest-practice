import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schemas/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async create(createCourseDto: CreateCourseDto, instructorId: string) {
    const newCourse = new this.courseModel({
      ...createCourseDto,
      instructorId: instructorId,
    });
    return await newCourse.save();
  }

  async findAll() {
    return await this.courseModel.find();
  }

  async findOne(id: string) {
    return await this.courseModel.findOne({ _id: id });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const updated = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
      { new: true },
    );

    if (!updated) {
      throw new NotFoundException('Course not found');
    }

    return updated;
  }

  async remove(id: string) {
    return await this.courseModel.deleteOne({ _id: id });
  }
}
