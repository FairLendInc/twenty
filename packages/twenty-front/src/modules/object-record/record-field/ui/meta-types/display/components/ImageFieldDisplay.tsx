import { useImageFieldDisplay } from '@/object-record/record-field/ui/meta-types/hooks/useImageFieldDisplay';

export const ImageFieldDisplay = () => {
  const { fieldValue } = useImageFieldDisplay();

  if (!fieldValue) {
    return null;
  }

  return <div>Image: {JSON.stringify(fieldValue)}</div>;
};
