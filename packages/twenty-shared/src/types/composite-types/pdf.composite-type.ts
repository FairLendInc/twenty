import { FieldMetadataType } from '../FieldMetadataType';
import type { CompositeType } from './composite-type.interface';

export const pdfCompositeType: CompositeType = {
  type: FieldMetadataType.PDF,
  properties: [
    {
      name: 'primaryAttachmentId',
      type: FieldMetadataType.UUID,
      hidden: false,
      isRequired: false,
    },
    {
      name: 'additionalAttachmentIds',
      type: FieldMetadataType.RAW_JSON,
      hidden: false,
      isRequired: false,
    },
  ],
};

export type PdfMetadata = {
  primaryAttachmentId: string | null;
  additionalAttachmentIds: string[] | null;
};
