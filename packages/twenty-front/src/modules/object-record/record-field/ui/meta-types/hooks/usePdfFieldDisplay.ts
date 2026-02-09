import { useContext } from 'react';

import { assertFieldMetadata } from '@/object-record/record-field/ui/types/guards/assertFieldMetadata';
import { isFieldPdf } from '@/object-record/record-field/ui/types/guards/isFieldPdf';
import { useRecordFieldValue } from '@/object-record/record-store/hooks/useRecordFieldValue';
import { FieldMetadataType } from 'twenty-shared/types';
import { FieldContext } from '../../contexts/FieldContext';
import { type FieldPdfValue } from '../../types/FieldMetadata';

export const usePdfFieldDisplay = () => {
  const { recordId, fieldDefinition } = useContext(FieldContext);

  assertFieldMetadata(FieldMetadataType.PDF, isFieldPdf, fieldDefinition);

  const fieldName = fieldDefinition.metadata.fieldName;

  const fieldValue = useRecordFieldValue<FieldPdfValue | undefined>(
    recordId,
    fieldName,
    fieldDefinition,
  );

  return {
    fieldDefinition,
    fieldValue,
  };
};
