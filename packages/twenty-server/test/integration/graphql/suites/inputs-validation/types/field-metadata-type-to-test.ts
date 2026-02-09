import { type FieldMetadataType } from 'twenty-shared/types';

type FieldMetadataTypesNotTestedForFilterInputValidation =
  | 'TS_VECTOR'
  | 'RICH_TEXT'
  | 'POSITION'
  | 'ACTOR'
  | 'MORPH_RELATION'
  | 'NUMERIC'
  | 'RICH_TEXT_V2'
  | 'IMAGE'
  | 'PDF';

type FieldMetadataTypesNotTestedForCreateInputValidation =
  | 'TS_VECTOR'
  | 'ACTOR'
  | 'POSITION'
  | 'MORPH_RELATION'
  | 'NUMERIC'
  | 'IMAGE'
  | 'PDF';

export type FieldMetadataTypesToTestForCreateInputValidation = Exclude<
  FieldMetadataType,
  FieldMetadataTypesNotTestedForCreateInputValidation
>;

export type FieldMetadataTypesToTestForFilterInputValidation = Exclude<
  FieldMetadataType,
  FieldMetadataTypesNotTestedForFilterInputValidation
>;
