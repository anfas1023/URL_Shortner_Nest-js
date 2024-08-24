import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './User.controller';
import { UserService } from './User.service';
import { LocalStrategy } from './strategies/local.strategy';
import { User, UserSchema } from '../schema/User.schema';
import { Shotner, ShotnerSchema } from '../schema/Shotner.schema';
import { UrlData, UrlDataSchema } from '../schema/UrlData.schema';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Shotner.name, schema: ShotnerSchema },
      { name: UrlData.name, schema: UrlDataSchema }
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'abc123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService,LocalStrategy,JwtStrategy],
})
export class UserModule {}
