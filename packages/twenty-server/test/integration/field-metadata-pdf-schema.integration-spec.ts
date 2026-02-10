import { createOneFieldMetadata } from 'test/integration/metadata/suites/field-metadata/utils/create-one-field-metadata.util';
import { createOneObjectMetadata } from 'test/integration/metadata/suites/object-metadata/utils/create-one-object-metadata.util';
import { deleteOneObjectMetadata } from 'test/integration/metadata/suites/object-metadata/utils/delete-one-object-metadata.util';
import { updateOneObjectMetadata } from 'test/integration/metadata/suites/object-metadata/utils/update-one-object-metadata.util';
import { FieldMetadataType } from 'twenty-shared/types';

describe('FieldMetadataService PDF Schema', () => {
  let createdObjectMetadataId = '';

  beforeEach(async () => {
    const {
      data: {
        createOneObject: { id: objectMetadataId },
      },
    } = await createOneObjectMetadata({
      input: {
        nameSingular: 'pdfTestObject',
        namePlural: 'pdfTestObjects',
        labelSingular: 'PDF Test Object',
        labelPlural: 'PDF Test Objects',
        icon: 'IconPdf',
      },
    });

    createdObjectMetadataId = objectMetadataId;
  });

  afterEach(async () => {
    await updateOneObjectMetadata({
      expectToFail: false,
      input: {
        idToUpdate: createdObjectMetadataId,
        updatePayload: {
          isActive: false,
        },
      },
    });
    await deleteOneObjectMetadata({
      input: { idToDelete: createdObjectMetadataId },
    });
  });

  it('should create a pdf field', async () => {
    const createFieldInput = {
      name: 'pdfField',
      label: 'PDF Field',
      type: FieldMetadataType.PDF,
      objectMetadataId: createdObjectMetadataId,
    };

    const { data } = await createOneFieldMetadata({
      input: createFieldInput,
      gqlFields: `
          id
          name
          label
          type
        `,
    });

    expect(data.createOneField).toEqual(
      expect.objectContaining({
        name: 'pdfField',
        label: 'PDF Field',
        type: FieldMetadataType.PDF,
      }),
    );
  });
});
