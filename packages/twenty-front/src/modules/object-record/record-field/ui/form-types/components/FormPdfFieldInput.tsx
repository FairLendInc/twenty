import { FormFieldInputContainer } from '@/object-record/record-field/ui/form-types/components/FormFieldInputContainer';
import { InputLabel } from '@/ui/input/components/InputLabel';

export const FormPdfFieldInput = ({ label }: { label?: string }) => {
  return (
    <FormFieldInputContainer>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <div>Form PDF Input (Placeholder)</div>
    </FormFieldInputContainer>
  );
};
