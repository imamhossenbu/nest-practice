import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // src/user/user.service.ts

  async createUser(registerUserDto: RegisterUserDto) {
    try {
      const createdUser = await this.userModel.create({
        ...registerUserDto,
      });

      return createdUser;
    } catch (err) {
      const duplicateKeyErrorCode = 11000;
      const e = err as { code?: number };

      if (e.code === duplicateKeyErrorCode) {
        throw new ConflictException('Email already exists');
      }
      throw err;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email }).select('+password');
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async findById(id: string) {
    try {
      return await this.userModel.findOne({ _id: id });
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
