import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // async singUp(singUpDto: SignUpDto): Promise<{ token: string }> {
  //   const { name, email, password } = singUpDto;
  //   const existingUser = await this.userModel.findOne({ email });

  //   if (existingUser) throw new BadRequestException('Email already in use');

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = await this.userModel.create({
  //     name,
  //     email,
  //     password: hashedPassword,
  //   });

  //   const token = this.jwtService.sign({ id: user._id });
  //   return { token };
  // }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
