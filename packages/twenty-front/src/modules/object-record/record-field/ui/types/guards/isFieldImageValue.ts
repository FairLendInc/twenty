import { type FieldImageValue } from '../FieldMetadata';

export const isFieldImageValue = (value: unknown): value is FieldImageValue => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'primaryAttachmentId' in value &&
    'additionalAttachmentIds' in value
  );
};
