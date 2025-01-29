
import React from 'react';
import { WireframeData } from '@/types/pillar1';
import { withWorksheetLogic, WithWorksheetLogicProps } from '../common/withWorksheetLogic';
import { generateWireframePDF } from '@/utils/pdfUtils';
import TextArea from '../common/TextArea';

interface WireframeWorksheetProps extends WithWorksheetLogicProps {
  data?: WireframeData;
  onChange: (data: WireframeData) => void;
  isValid?: boolean;
  onPdfDownloaded?: () => void;
  onNextSection?: () => void;
  pdfDownloaded?: boolean;
}

function WireframeWorksheet({
  data,
  onChange,
  isValid,
  onPdfDownloaded,
  onNextSection,
  pdfDownloaded
}: WireframeWorksheetProps) {
  const defaultData: WireframeData = {
    layout: { header: '', navigation: '', mainContent: '', footer: '' },
    components: { callToAction: '', featuredSections: [], contentBlocks: [] },
    styling: { colorScheme: '', typography: '', spacing: '' }
  };
  const currentData = data || defaultData;

  // ... handle changes just like you do currently, omitted for brevity
  // We'll keep a simple stub:
  function handleLayoutChange(key: keyof WireframeData['layout'], val: string) {
    onChange({
      ...currentData,
      layout: { ...currentData.layout, [key]: val }
    });
  }

  return (
    <div className="space-y-8">
      {/* Example layout text fields, as you had before */}
      <TextArea
        // label="Header"
        value={currentData.layout?.header || ''}
        onChange={(val) => handleLayoutChange('header', val)}
      />
      {/* etc. for other fields */}
      
      {/* Download/Next button */}
      {(onPdfDownloaded || onNextSection) && (
        <div className="flex justify-end mt-6">
          <button
            onClick={pdfDownloaded ? onNextSection: null }
            disabled={!isValid}
            className={`px-4 py-2 rounded ${
              !isValid
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {!isValid && !pdfDownloaded
              ? 'Complete All Fields First'
              : 'Next Section'
            }
          </button>
        </div>
      )}
    </div>
  );
}

function wireframeIsDataComplete(data: WireframeData) {
  if (!data) return false;
  // e.g. check if layout fields are filled, etc.
  // for brevity:
  return Boolean(data.layout?.header && data.layout?.navigation && data.layout?.mainContent && data.layout?.footer);
}

const wireConfig = {
  generatePdf: generateWireframePDF,
  isDataComplete: wireframeIsDataComplete,
  pdfFileName: 'wireframe-plan.pdf',
  title: 'Wireframe Template',
  description: 'Plan your website wireframe structure and layout.',
  maxPages: 1
};

export default withWorksheetLogic(WireframeWorksheet, wireConfig);