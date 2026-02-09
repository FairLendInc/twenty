import { FieldMetadataType } from '../FieldMetadataType';
import type { CompositeType } from './composite-type.interface';

export const imageCompositeType: CompositeType = {
  type: FieldMetadataType.IMAGE,
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

export type ImageMetadata = {
  primaryAttachmentId: string | null;
  additionalAttachmentIds: string[] | null;
};
