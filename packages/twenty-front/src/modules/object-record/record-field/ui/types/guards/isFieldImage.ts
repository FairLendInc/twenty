import { FieldMetadataType } from '~/generated-metadata/graphql';

import { type FieldDefinition } from '../FieldDefinition';
import { type FieldImageMetadata, type FieldMetadata } from '../FieldMetadata';

export const isFieldImage = (
  field: Pick<FieldDefinition<FieldMetadata>, 'type'>,
): field is FieldDefinition<FieldImageMetadata> =>
  field.type === FieldMetadataType.IMAGE;
