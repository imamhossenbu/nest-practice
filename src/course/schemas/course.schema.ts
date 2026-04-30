// src/course/schemas/course.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  category!: string;

  @Prop({ enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' })
  level!: string;

  @Prop({ required: true, type: Number })
  price!: number;

  @Prop()
  thumbnail!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  instructorId!: mongoose.Schema.Types.ObjectId;

  @Prop({ default: false })
  isPublished!: boolean;

  @Prop({ default: 0 })
  rating!: number;

  @Prop({ default: 0 })
  totalStudents!: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
