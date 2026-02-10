import { useContext } from 'react';

import { assertFieldMetadata } from '@/object-record/record-field/ui/types/guards/assertFieldMetadata';
import { isFieldImage } from '@/object-record/record-field/ui/types/guards/isFieldImage';
import { useRecordFieldValue } from '@/object-record/record-store/hooks/useRecordFieldValue';
import { FieldMetadataType } from 'twenty-shared/types';
import { FieldContext } from '../../contexts/FieldContext';
import { type FieldImageValue } from '../../types/FieldMetadata';

export const useImageFieldDisplay = () => {
  const { recordId, fieldDefinition } = useContext(FieldContext);

  assertFieldMetadata(FieldMetadataType.IMAGE, isFieldImage, fieldDefinition);

  const fieldName = fieldDefinition.metadata.fieldName;

  const fieldValue = useRecordFieldValue<FieldImageValue | undefined>(
    recordId,
    fieldName,
    fieldDefinition,
  );

  return {
    fieldDefinition,
    fieldValue,
  };
};
