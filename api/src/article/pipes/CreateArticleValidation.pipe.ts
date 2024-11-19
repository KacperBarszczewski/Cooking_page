import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateArticleDto } from '../dto/CreateArticle.dto';

@Injectable()
export class CreateArticleValidationPipe implements PipeTransform {
  transform(value: CreateArticleDto): CreateArticleDto {
    const errors: string[] = [];

    this.validateRequiredString(value.title, 'Title', errors);
    this.validateRequiredString(value.description, 'Description', errors);
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

  private validateRequiredString(
    value: string | undefined,
    fieldName: string,
    errors: string[],
  ) {
    if (typeof value !== 'string' || value.trim() === '') {
      errors.push(`${fieldName} is required and must be a non-empty string`);
    }
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
