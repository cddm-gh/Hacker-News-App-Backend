import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Article extends Document {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  url: string;

  @Prop()
  story_title: string;

  @Prop()
  story_url: string;

  @Prop()
  story_text: string;

  @Prop()
  commnent_text: string;

  @Prop()
  created_at: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);