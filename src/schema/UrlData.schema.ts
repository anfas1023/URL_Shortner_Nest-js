import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'UrlData' })
export class UrlData {
  @Prop({ required: true })
  fullUrl: string;

  @Prop({ required: true })
  shortUrl: string;
}
export const UrlDataSchema = SchemaFactory.createForClass(UrlData);
