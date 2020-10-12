import { IsString } from 'class-validator';

export class CreateArticleDTO {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  url: string;

  @IsString()
  story_title: string;

  @IsString()
  story_url: string;

  @IsString()
  story_text: string;

  @IsString()
  commnent_text: string;

  @IsString()
  created_at: Date;
}