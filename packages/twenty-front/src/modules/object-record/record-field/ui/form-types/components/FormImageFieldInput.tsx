import { FormFieldInputContainer } from '@/object-record/record-field/ui/form-types/components/FormFieldInputContainer';
import { InputLabel } from '@/ui/input/components/InputLabel';

export const FormImageFieldInput = ({ label }: { label?: string }) => {
  return (
    <FormFieldInputContainer>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <div>Form Image Input (Placeholder)</div>
    </FormFieldInputContainer>
  );
};
