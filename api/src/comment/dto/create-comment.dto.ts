export class CreateCommentDto {
  readonly name: string;
  readonly text: string;
  readonly article_id: string;
  readonly isVisible: boolean;
}