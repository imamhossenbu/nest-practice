import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';

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

    const payload = {
      sub: user._id,
      email: user.email,
      username: user.fname,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.fname,
        role: user.role,
      },
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);

    // 1. user check
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 2. password check
    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3. generate JWT
    const payload = {
      sub: user._id,
      email: user.email,
      username: user.fname,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.fname,
        role: user.role,
      },
    };
  }
}
