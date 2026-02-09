import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Trans, useLingui } from '@lingui/react/macro';

import React from 'react';
import { isDefined } from 'twenty-shared/utils';
import { IconFile, IconTrash, IconUpload, IconX } from 'twenty-ui/display';
import { Button } from 'twenty-ui/input';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledIconBox = styled.button<{ hasFile: boolean }>`
  align-items: center;
  background: ${({ theme, disabled }) =>
    disabled ? theme.background.secondary : theme.background.transparent.light};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  color: ${({ theme }) => theme.font.color.light};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  height: 66px;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  transition: background 0.1s ease;
  width: 66px;

  &:hover svg {
    color: ${({ theme }) => theme.font.color.tertiary};
  }

  ${({ theme, hasFile, disabled }) => {
    if ((hasFile || disabled) === true) {
      return '';
    }

    return `
      &:hover {
        background: ${theme.background.transparent.medium};
      }
    `;
  }};
`;

const StyledContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  margin-left: ${({ theme }) => theme.spacing(4)};
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledText = styled.span`
  color: ${({ theme }) => theme.font.color.light};
  font-size: ${({ theme }) => theme.font.size.xs};
`;

const StyledErrorText = styled.span`
  color: ${({ theme }) => theme.font.color.danger};
  font-size: ${({ theme }) => theme.font.size.xs};
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const StyledHiddenFileInput = styled.input`
  display: none;
`;

type PdfInputProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  fileName: string | null | undefined;
  onUpload?: (file: File) => void;
  onRemove?: () => void;
  onAbort?: () => void;
  isUploading?: boolean;
  errorMessage?: string | null;
  disabled?: boolean;
  className?: string;
};

export const PdfInput = ({
  fileName,
  onUpload,
  onRemove,
  onAbort,
  isUploading = false,
  errorMessage,
  disabled = false,
  className,
}: PdfInputProps) => {
  const { t } = useLingui();
  const theme = useTheme();
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const onUploadButtonClick = () => {
    hiddenFileInput.current?.click();
  };

  const hasFile = !!fileName;

  return (
    <StyledContainer className={className}>
      <StyledIconBox
        hasFile={hasFile}
        disabled={disabled}
        onClick={onUploadButtonClick}
      >
        <IconFile size={theme.icon.size.lg} />
      </StyledIconBox>
      <StyledContent>
        <StyledButtonContainer>
          <StyledHiddenFileInput
            type="file"
            ref={hiddenFileInput}
            accept="application/pdf"
            onChange={(event) => {
              if (isDefined(onUpload) && isDefined(event.target.files)) {
                onUpload(event.target.files[0]);
              }
            }}
          />
          {isUploading && onAbort ? (
            <Button
              Icon={IconX}
              onClick={onAbort}
              variant="secondary"
              title={t`Abort`}
              disabled={!hasFile || disabled}
            />
          ) : (
            <Button
              Icon={IconUpload}
              onClick={onUploadButtonClick}
              variant="secondary"
              title={t`Upload`}
              disabled={disabled}
            />
          )}
          <Button
            Icon={IconTrash}
            onClick={onRemove}
            variant="secondary"
            title={t`Remove`}
            disabled={!hasFile || disabled}
          />
        </StyledButtonContainer>
        <StyledText>
          <Trans>We support PDFs under 10MB</Trans>
        </StyledText>
        {errorMessage && <StyledErrorText>{errorMessage}</StyledErrorText>}
      </StyledContent>
    </StyledContainer>
  );
};
