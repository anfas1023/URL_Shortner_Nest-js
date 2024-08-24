import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/User.schema';
import { Model } from 'mongoose';
import { UserDto } from './dto/User.dto';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async Createuser(createUserDto: UserDto) {
    const { username, email, password } = createUserDto;
    console.log(username,email,password);
    

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return user;
  }

  async loginUser(userId:any) {
    const payload = { userId };

    const token = this.jwtService.sign(payload);
    console.log(token);

    return {
      message: 'Login successful',
      token,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: user.id };
  }
}
