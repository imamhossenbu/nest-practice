/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty({ message: 'Course title is required' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description!: string;

  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  category!: string;

  @IsEnum(['beginner', 'intermediate', 'advanced'], {
    message: 'Level must be beginner, intermediate, or advanced',
  })
  @IsNotEmpty()
  level!: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price!: number;

  @IsString()
  @IsOptional()
  thumbnail?: string;
}
