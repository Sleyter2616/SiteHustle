import React, { useState } from 'react';
import { Pillar1Data, BrandIdentityData } from '@/types/pillar1Types';
import { validateBrandIdentity } from '@/utils/pillar1Validation';
import BrandIdentityWorksheet from './BrandIdentityWorksheet';
import { supabase } from '@/lib/supabase';

interface BrandIdentityContainerProps {
  data: BrandIdentityData;
  onSave: (data: BrandIdentityData) => void;
  onComplete?: () => void;
}

export default function BrandIdentityContainer({ 
  data, 
  onSave,
  onComplete 
}: BrandIdentityContainerProps) {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSave = async (brandIdentity: BrandIdentityData) => {
    setSaving(true);
    setErrors({});
    
    try {
      const validationResult = validateBrandIdentity(brandIdentity);

      if (!validationResult.success) {
        setErrors(validationResult.errors);
        throw new Error('Please fix the validation errors');
      }

      await onSave(brandIdentity);

      setAlert({
        type: 'success',
        message: 'Progress saved successfully!'
      });

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error saving:', error);
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to save progress'
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {alert && (
        <div className={`p-4 rounded-md ${
          alert.type === 'success' ? 'bg-green-800' : 'bg-red-800'
        }`}>
          <p className="text-white">{alert.message}</p>
        </div>
      )}

      <BrandIdentityWorksheet
        data={data}
        onChange={handleSave}
        errors={errors}
      />

      {saving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-md">
            <p className="text-white">Saving...</p>
          </div>
        </div>
      )}
    </div>
  );
}
