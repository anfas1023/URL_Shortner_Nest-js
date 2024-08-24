import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/User.schema';
import { Shotner } from 'src/schema/Shotner.schema';
import { UrlData } from 'src/schema/UrlData.schema';
import * as crypto from 'crypto';

import { CreateShotnerDto } from '../Shotner/dto/CreateShotner.dto';

@Injectable()
export class ShotnerService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Shotner.name) private ShotnerModel: Model<Shotner>,
    @InjectModel(UrlData.name) private UrlDataModel: Model<UrlData>,
  ) {}

  async createShotner(CreateShotnerDto: CreateShotnerDto) {
    const { fullUrl, userId } = CreateShotnerDto;
    const randomBytes = crypto.randomBytes(6).toString('hex');
    const urlData = new this.UrlDataModel({
      fullUrl: fullUrl,
      shortUrl: randomBytes,
    });

    console.log('urlData', urlData);

    const userIdexist = await this.ShotnerModel.findOne({ userId });

    if (userIdexist) {
      const existingUserUrlAdd = await this.ShotnerModel.findOneAndUpdate(
        { userId },
        { $push: { urlData: { fullUrl: fullUrl, shortUrl: randomBytes } } },
        { new: true },
      );

      return existingUserUrlAdd;
    }

    const newShotner = new this.ShotnerModel({
      urlData: [urlData],
      userId: userId,
    });

    await newShotner.save();

    return newShotner;
  }

  async getUrlByUserId(userId: string) {
    const getAllUrl = await this.ShotnerModel.findOne({ userId });
    return getAllUrl;
  }
}
