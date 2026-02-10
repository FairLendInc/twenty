import styled from '@emotion/styled';

import { useAttachmentForField } from '@/activities/files/hooks/useAttachmentForField';
import { FileIcon } from '@/file/components/FileIcon';
import { usePdfFieldDisplay } from '@/object-record/record-field/ui/meta-types/hooks/usePdfFieldDisplay';

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  max-width: 100%;
  overflow: hidden;
`;

const StyledFileName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PdfFieldDisplay = () => {
  const { fieldValue } = usePdfFieldDisplay();

  const attachmentId = fieldValue?.primaryAttachmentId ?? null;
  const { attachment, loading } = useAttachmentForField(attachmentId);

  if (!attachmentId || loading || !attachment) {
    return null;
  }

  return (
    <StyledContainer>
      <FileIcon fileCategory={attachment.fileCategory ?? 'TEXT_DOCUMENT'} />
      <StyledFileName>{attachment.name ?? 'PDF'}</StyledFileName>
    </StyledContainer>
  );
};
