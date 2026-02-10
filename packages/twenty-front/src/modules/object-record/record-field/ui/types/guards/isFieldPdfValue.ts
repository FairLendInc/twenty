import { type FieldPdfValue } from '../FieldMetadata';

export const isFieldPdfValue = (value: unknown): value is FieldPdfValue => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'primaryAttachmentId' in value &&
    'additionalAttachmentIds' in value
  );
};
