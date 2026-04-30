// src/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true, select: false })
  password!: string;

  @Prop({ enum: ['student', 'instructor', 'admin'], default: 'student' })
  role!: string;

  @Prop({ default: false })
  isVerified!: boolean;

  @Prop()
  photoUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
