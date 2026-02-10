import styled from '@emotion/styled';

import { useAttachmentForField } from '@/activities/files/hooks/useAttachmentForField';
import { useImageFieldDisplay } from '@/object-record/record-field/ui/meta-types/hooks/useImageFieldDisplay';
import { getImageAbsoluteURI } from 'twenty-shared/utils';
import { REACT_APP_SERVER_BASE_URL } from '~/config';

const StyledImage = styled.img`
  border-radius: ${({ theme }) => theme.border.radius.xs};
  height: 24px;
  object-fit: cover;
  width: 24px;
`;

export const ImageFieldDisplay = () => {
  const { fieldValue } = useImageFieldDisplay();

  const attachmentId = fieldValue?.primaryAttachmentId ?? null;
  const { attachment, loading } = useAttachmentForField(attachmentId);

  if (!attachmentId || loading || !attachment?.fullPath) {
    return null;
  }

  const imageUrl = getImageAbsoluteURI({
    imageUrl: attachment.fullPath,
    baseUrl: REACT_APP_SERVER_BASE_URL,
  });

  if (!imageUrl) {
    return null;
  }

  return <StyledImage src={imageUrl} alt={attachment.name ?? 'Image'} />;
};
