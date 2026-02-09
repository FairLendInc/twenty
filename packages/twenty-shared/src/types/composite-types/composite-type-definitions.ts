import { FieldMetadataType } from '../FieldMetadataType';
import { actorCompositeType } from './actor.composite-type';
import { addressCompositeType } from './address.composite-type';
import type { CompositeType } from './composite-type.interface';
import { currencyCompositeType } from './currency.composite-type';
import { emailsCompositeType } from './emails.composite-type';
import { fullNameCompositeType } from './full-name.composite-type';
import { imageCompositeType } from './image.composite-type';
import { linksCompositeType } from './links.composite-type';
import { pdfCompositeType } from './pdf.composite-type';
import { phonesCompositeType } from './phones.composite-type';
import { richTextV2CompositeType } from './rich-text-v2.composite-type';

export const compositeTypeDefinitions = new Map<
  FieldMetadataType,
  CompositeType
>([
  [FieldMetadataType.LINKS, linksCompositeType],
  [FieldMetadataType.CURRENCY, currencyCompositeType],
  [FieldMetadataType.FULL_NAME, fullNameCompositeType],
  [FieldMetadataType.ADDRESS, addressCompositeType],
  [FieldMetadataType.ACTOR, actorCompositeType],
  [FieldMetadataType.EMAILS, emailsCompositeType],
  [FieldMetadataType.PHONES, phonesCompositeType],
  [FieldMetadataType.RICH_TEXT_V2, richTextV2CompositeType],
  [FieldMetadataType.IMAGE, imageCompositeType],
  [FieldMetadataType.PDF, pdfCompositeType],
]);
