import { Inject, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { FILE_CATEGORIES } from 'twenty-shared/types';

import { ValidationError } from 'src/engine/core-modules/graphql/utils/graphql-errors.util';
import { AttachmentLimitValidatorService } from 'src/engine/metadata-modules/field-metadata/validators/attachment-limit-validator.service';
import { ImageMimeValidatorService } from 'src/engine/metadata-modules/field-metadata/validators/image-mime-validator.service';
import { PdfMimeValidatorService } from 'src/engine/metadata-modules/field-metadata/validators/pdf-mime-validator.service';
import { TwentyORMManager } from 'src/engine/twenty-orm/twenty-orm.manager';
import { type AttachmentWorkspaceEntity } from 'src/modules/attachment/standard-objects/attachment.workspace-entity';

@Injectable()
export class CompositeFieldValidatorService {
  private readonly IMAGE_MIME_TYPES_BY_EXTENSION: Record<string, string> = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
  };

  private readonly PDF_MIME_TYPES_BY_EXTENSION: Record<string, string> = {
    pdf: 'application/pdf',
  };

  constructor(
    @Inject(ImageMimeValidatorService)
    private readonly imageMimeValidator: ImageMimeValidatorService,
    @Inject(PdfMimeValidatorService)
    private readonly pdfMimeValidator: PdfMimeValidatorService,
    @Inject(AttachmentLimitValidatorService)
    private readonly attachmentLimitValidator: AttachmentLimitValidatorService,
    @Inject(TwentyORMManager)
    private readonly twentyORMManager: TwentyORMManager,
  ) {}

  async validateImageField(
    attachmentIds: string[] | null | undefined,
    isRequired: boolean,
  ): Promise<void> {
    if (!attachmentIds || attachmentIds.length === 0) {
      if (isRequired) {
        throw new ValidationError(
          'Image field is required and must have at least one image attachment',
        );
      }

      return;
    }

    this.attachmentLimitValidator.validate(attachmentIds);

    const attachments = await this.findAttachmentsByIds(attachmentIds);

    if (attachments.length !== attachmentIds.length) {
      const foundIds = new Set(attachments.map((att) => att.id));
      const missingIds = attachmentIds.filter((id) => !foundIds.has(id));

      throw new ValidationError(
        `Attachment IDs not found: ${missingIds.join(', ')}`,
      );
    }

    attachments.forEach((attachment) => {
      if (!this.isValidImageAttachment(attachment)) {
        throw new ValidationError(
          `Attachment "${attachment.name}" is not an image file. Only image files are allowed for image fields.`,
        );
      }
    });
  }

  async validatePdfField(
    attachmentIds: string[] | null | undefined,
    isRequired: boolean,
  ): Promise<void> {
    if (!attachmentIds || attachmentIds.length === 0) {
      if (isRequired) {
        throw new ValidationError(
          'PDF field is required and must have at least one PDF attachment',
        );
      }

      return;
    }

    this.attachmentLimitValidator.validate(attachmentIds);

    const attachments = await this.findAttachmentsByIds(attachmentIds);

    if (attachments.length !== attachmentIds.length) {
      const foundIds = new Set(attachments.map((att) => att.id));
      const missingIds = attachmentIds.filter((id) => !foundIds.has(id));

      throw new ValidationError(
        `Attachment IDs not found: ${missingIds.join(', ')}`,
      );
    }

    attachments.forEach((attachment) => {
      if (!this.isValidPdfAttachment(attachment)) {
        throw new ValidationError(
          `Attachment "${attachment.name}" is not a PDF file. Only PDF files are allowed for PDF fields.`,
        );
      }
    });
  }

  private async findAttachmentsByIds(
    attachmentIds: string[],
  ): Promise<AttachmentWorkspaceEntity[]> {
    const attachmentRepository =
      await this.twentyORMManager.getRepository<AttachmentWorkspaceEntity>(
        'attachment',
      );

    return attachmentRepository.findBy({
      id: In(attachmentIds),
    });
  }

  private isValidImageAttachment(attachment: AttachmentWorkspaceEntity): boolean {
    const fileCategory = attachment.fileCategory?.toUpperCase();

    if (fileCategory !== FILE_CATEGORIES.IMAGE) {
      return false;
    }

    const normalizedExtension = this.getNormalizedExtension(attachment);

    if (!normalizedExtension) {
      return false;
    }

    const mimeType = this.IMAGE_MIME_TYPES_BY_EXTENSION[normalizedExtension];

    return mimeType ? this.imageMimeValidator.isValid(mimeType) : false;
  }

  private isValidPdfAttachment(attachment: AttachmentWorkspaceEntity): boolean {
    const fileCategory = attachment.fileCategory?.toUpperCase();

    if (fileCategory !== FILE_CATEGORIES.TEXT_DOCUMENT) {
      return false;
    }

    const normalizedExtension = this.getNormalizedExtension(attachment);

    if (!normalizedExtension) {
      return false;
    }

    const mimeType = this.PDF_MIME_TYPES_BY_EXTENSION[normalizedExtension];

    return mimeType ? this.pdfMimeValidator.isValid(mimeType) : false;
  }

  private getNormalizedExtension(
    attachment: AttachmentWorkspaceEntity,
  ): string | null {
    const extensionFromFile = attachment.file?.[0]?.extension;
    const extensionFromName =
      attachment.name?.split('.').pop()?.trim().toLowerCase() ?? null;

    const rawExtension = extensionFromFile || extensionFromName;

    if (!rawExtension) {
      return null;
    }

    return rawExtension.replace('.', '').trim().toLowerCase();
  }
}
