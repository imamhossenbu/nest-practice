import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

    // Logic for user register
    /**
     * 1. check email if already exist
     * 2. hash password
     * 3. store the password into db
     * 4. generate jwt
     * 5. send token in response
     */
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    const payload = { sub: user._id, email: user.email, username: user.fname };
    const token = await this.jwtService.signAsync(payload);
    console.log(token);
    return token;
  }
}
