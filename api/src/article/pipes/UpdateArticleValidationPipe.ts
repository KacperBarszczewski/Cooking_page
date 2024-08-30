import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UpdateArticleDto } from '../dto/UpdateArticle.dto';

@Injectable()
export class UpdateArticleValidationPipe implements PipeTransform {
  transform(value: UpdateArticleDto): UpdateArticleDto {
    const errors: string[] = [];

    this.validateOptionalString(value.description, 'Description', errors);
    this.validateOptionalArrayOfStrings(
      value.ingredients,
      'Ingredients',
      errors,
    );
    this.validateOptionalBoolean(value.isVisible, 'isVisible', errors);
    this.validateOptionalString(value.image, 'Image', errors);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return value;
  }

  private validateOptionalString(
    value: string | undefined,
    fieldName: string,
    errors: string[],
  ) {
    if (value !== undefined && typeof value !== 'string') {
      errors.push(`${fieldName} must be a string`);
    }
  }

  private validateOptionalBoolean(
    value: boolean | undefined,
    fieldName: string,
    errors: string[],
  ) {
    if (value !== undefined && typeof value !== 'boolean') {
      errors.push(`${fieldName} must be a boolean`);
    }
  }

  private validateOptionalArrayOfStrings(
    value: string[] | undefined,
    fieldName: string,
    errors: string[],
  ) {
    if (value !== undefined) {
      if (!Array.isArray(value)) {
        errors.push(`${fieldName} must be an array`);
      } else if (!value.every((item) => typeof item === 'string')) {
        errors.push(`All items in ${fieldName} must be strings`);
      }
    }
  }
}
