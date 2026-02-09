import { FieldMetadataType } from 'twenty-shared/types';

export const mapFieldMetadataToGraphQLQuery = (
  fieldType: FieldMetadataType,
  fieldName: string,
): string => {
  switch (fieldType) {
    case FieldMetadataType.IMAGE:
      return `${fieldName} {
  primaryAttachmentId
  additionalAttachmentIds
}`;
    case FieldMetadataType.PDF:
      return `${fieldName} {
  primaryAttachmentId
  additionalAttachmentIds
}`;
    case FieldMetadataType.LINKS:
      return `${fieldName} {
  primaryLinkUrl
  primaryLinkLabel
  secondaryLinks
}`;
    case FieldMetadataType.CURRENCY:
      return `${fieldName} {
  amountMicros
  currencyCode
}`;
    case FieldMetadataType.FULL_NAME:
      return `${fieldName} {
  firstName
  lastName
}`;
    case FieldMetadataType.ADDRESS:
      return `${fieldName} {
  addressStreet1
  addressStreet2
  addressCity
  addressState
  addressCountry
  addressPostcode
  addressLat
  addressLng
}`;
    case FieldMetadataType.ACTOR:
      return `${fieldName} {
  source
  workspaceMemberId
  name
  context
}`;
    case FieldMetadataType.EMAILS:
      return `${fieldName} {
  primaryEmail
  additionalEmails
}`;
    case FieldMetadataType.PHONES:
      return `${fieldName} {
  primaryPhoneNumber
  primaryPhoneCountryCode
  primaryPhoneCallingCode
  additionalPhones
}`;
    case FieldMetadataType.RICH_TEXT_V2:
      return `${fieldName} {
  blocknote
  markdown
}`;
    default:
      return fieldName;
  }
};
