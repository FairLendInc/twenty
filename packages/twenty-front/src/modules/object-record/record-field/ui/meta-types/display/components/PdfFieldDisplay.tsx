import { usePdfFieldDisplay } from '@/object-record/record-field/ui/meta-types/hooks/usePdfFieldDisplay';

export const PdfFieldDisplay = () => {
  const { fieldValue } = usePdfFieldDisplay();

  if (!fieldValue) {
    return null;
  }

  return <div>PDF: {JSON.stringify(fieldValue)}</div>;
};
