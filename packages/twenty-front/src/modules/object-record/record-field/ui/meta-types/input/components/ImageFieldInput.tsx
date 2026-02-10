import { useContext, useRef, useState } from 'react';

import { useAttachmentForField } from '@/activities/files/hooks/useAttachmentForField';
import { useUploadAttachmentFile } from '@/activities/files/hooks/useUploadAttachmentFile';
import { FieldContext } from '@/object-record/record-field/ui/contexts/FieldContext';
import { FieldInputEventContext } from '@/object-record/record-field/ui/contexts/FieldInputEventContext';
import { useImageField } from '@/object-record/record-field/ui/meta-types/hooks/useImageField';
import { ImageInput } from '@/ui/input/components/ImageInput';
import { useListenClickOutside } from '@/ui/utilities/pointer-event/hooks/useListenClickOutside';

export const ImageFieldInput = () => {
  const { recordId, fieldDefinition } = useContext(FieldContext);
  const { onSubmit, onClickOutside } = useContext(FieldInputEventContext);
  const { fieldValue } = useImageField();

  const containerRef = useRef<HTMLDivElement>(null);

  const attachmentId = fieldValue?.primaryAttachmentId ?? null;
  const { attachment } = useAttachmentForField(attachmentId);
  const { uploadAttachmentFile } = useUploadAttachmentFile();

  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useListenClickOutside({
    refs: [containerRef],
    callback: (event) => {
      onClickOutside?.({ event });
    },
    listenerId: 'ImageFieldInput',
  });

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setErrorMessage(null);

    try {
      const { attachmentId: newAttachmentId } = await uploadAttachmentFile(
        file,
        {
          id: recordId,
          targetObjectNameSingular:
            fieldDefinition.metadata.objectMetadataNameSingular ?? '',
        },
      );

      onSubmit?.({
        newValue: {
          primaryAttachmentId: newAttachmentId,
          additionalAttachmentIds: fieldValue?.additionalAttachmentIds ?? null,
        },
      });
    } catch {
      setErrorMessage('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onSubmit?.({
      newValue: {
        primaryAttachmentId: null,
        additionalAttachmentIds: fieldValue?.additionalAttachmentIds ?? null,
      },
    });
  };

  return (
    <div ref={containerRef}>
      <ImageInput
        picture={attachment?.fullPath ?? null}
        onUpload={handleUpload}
        onRemove={handleRemove}
        isUploading={isUploading}
        errorMessage={errorMessage}
      />
    </div>
  );
};
