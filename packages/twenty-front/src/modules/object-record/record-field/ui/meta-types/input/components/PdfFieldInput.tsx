import styled from '@emotion/styled';

import { usePdfField } from '@/object-record/record-field/ui/meta-types/hooks/usePdfField';
import { FieldInputContainer } from '@/ui/field/input/components/FieldInputContainer';

const StyledContainer = styled(FieldInputContainer)`
  gap: 8px;
`;

export const PdfFieldInput = () => {
  const { fieldValue } = usePdfField();

  return (
    <StyledContainer>
      <span>PDF Field (Value: {JSON.stringify(fieldValue)})</span>
    </StyledContainer>
  );
};
