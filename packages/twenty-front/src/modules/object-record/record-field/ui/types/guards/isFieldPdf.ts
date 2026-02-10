import { FieldMetadataType } from '~/generated-metadata/graphql';

import { type FieldDefinition } from '../FieldDefinition';
import { type FieldMetadata, type FieldPdfMetadata } from '../FieldMetadata';

export const isFieldPdf = (
  field: Pick<FieldDefinition<FieldMetadata>, 'type'>,
): field is FieldDefinition<FieldPdfMetadata> =>
  field.type === FieldMetadataType.PDF;
