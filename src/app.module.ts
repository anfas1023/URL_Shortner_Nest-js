import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/User.module';
import { ShotnerModule } from './Shotner/Shotner.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/urlShotner'), 
    UserModule,
    ShotnerModule
  ],
  providers:[],
  controllers:[]
})
export class AppModule {}
