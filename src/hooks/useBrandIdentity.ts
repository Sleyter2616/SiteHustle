import { useState } from 'react';
import { Pillar1Data } from '@/types/pillar1';

export const useBrandIdentity = (
  initialData: Pillar1Data['brandIdentity'],
  onSave?: (data: Pillar1Data['brandIdentity']) => void
) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const updateReflection = (newReflection: Pillar1Data['brandIdentity']['reflection']) => {
    setData(prev => ({
      ...prev,
      reflection: newReflection
    }));
  };

  const updatePersonality = (newPersonality: Pillar1Data['brandIdentity']['personality']) => {
    setData(prev => ({
      ...prev,
      personality: newPersonality
    }));
  };

  const updateStory = (newStory: Pillar1Data['brandIdentity']['story']) => {
    setData(prev => ({
      ...prev,
      story: newStory
    }));
  };

  const updateDifferentiation = (newDifferentiation: Pillar1Data['brandIdentity']['differentiation']) => {
    setData(prev => ({
      ...prev,
      differentiation: newDifferentiation
    }));
  };

  const handleSave = async () => {
    if (onSave) {
      await onSave(data);
    }
  };

  return {
    data,
    errors,
    setErrors,
    updateReflection,
    updatePersonality,
    updateStory,
    updateDifferentiation,
    handleSave
  };
};
