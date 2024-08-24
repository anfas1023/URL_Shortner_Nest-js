import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../schema/User.schema';
import { Shotner, ShotnerSchema } from '../schema/Shotner.schema';
import { UrlData, UrlDataSchema } from '../schema/UrlData.schema';
import { ShotnerController } from './Shotner.controller';
import { ShotnerService } from './Shotner.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Shotner.name, schema: ShotnerSchema },
      { name: UrlData.name, schema: UrlDataSchema }
    ]),
    PassportModule,
    // JwtModule.register({
    //   secret: 'abc123',
    //   signOptions: { expiresIn: '1h' },
    // }),
  ],
  controllers: [ShotnerController],
  providers: [ShotnerService],
})
export class ShotnerModule {}
