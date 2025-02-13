export interface FieldMapping {
    label: string;
    tooltip: string;
    placeholder: string;
    minLength?: number;
    isArray?: boolean;
    errorMessage?: string;
    inputType?: 'textarea' | 'dropdown' | 'checkboxGroup';
    options?: string[];
  }