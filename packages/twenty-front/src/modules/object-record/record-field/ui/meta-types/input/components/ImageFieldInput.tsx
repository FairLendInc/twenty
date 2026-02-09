import styled from '@emotion/styled';

import { useImageField } from '@/object-record/record-field/ui/meta-types/hooks/useImageField';
import { FieldInputContainer } from '@/ui/field/input/components/FieldInputContainer';

const StyledContainer = styled(FieldInputContainer)`
  gap: 8px;
`;

export const ImageFieldInput = () => {
  const { fieldValue } = useImageField();

  return (
    <StyledContainer>
      <span>Image Field (Value: {JSON.stringify(fieldValue)})</span>
    </StyledContainer>
  );
};
