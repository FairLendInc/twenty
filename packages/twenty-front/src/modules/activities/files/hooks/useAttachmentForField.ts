import { type Attachment } from '@/activities/files/types/Attachment';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useFindOneRecord } from '@/object-record/hooks/useFindOneRecord';

export const useAttachmentForField = (attachmentId: string | null) => {
  const { record, loading } = useFindOneRecord<Attachment>({
    objectNameSingular: CoreObjectNameSingular.Attachment,
    objectRecordId: attachmentId ?? '',
    recordGqlFields: {
      id: true,
      name: true,
      fullPath: true,
      fileCategory: true,
    },
    skip: !attachmentId,
  });

  return { attachment: record ?? null, loading };
};
