import { Document } from 'mongoose';

export interface IArticle extends Document {
  readonly title: string;
  readonly author: string;
  readonly url: string;
  readonly story_title: string;
  readonly story_url: string;
  readonly story_text: string;
  readonly commnent_text: string;
  readonly created_at: Date;
}