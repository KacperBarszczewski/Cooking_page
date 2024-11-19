export class CreateArticleDto {
  title: string;

  description: string;

  ingredients?: string[];

  isVisible?: boolean;

  image?: string;
}
