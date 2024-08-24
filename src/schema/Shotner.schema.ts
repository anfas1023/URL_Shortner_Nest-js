import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UrlData, UrlDataSchema } from './UrlData.schema'; // Adjust the import path as needed

@Schema()
export class Shotner {
  @Prop({ type: [UrlDataSchema], required: false })
  urlData: UrlData[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  userId: string;
}

export const ShotnerSchema = SchemaFactory.createForClass(Shotner);
