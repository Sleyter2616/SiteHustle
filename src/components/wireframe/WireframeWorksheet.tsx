import React from 'react';
import { WireframeData } from '@/types/pillar1';
import TextArea from '../common/TextArea';

interface WireframeWorksheetProps {
  data?: WireframeData;
  onChange: (data: WireframeData) => void;
  onComplete?: () => void;
}

export default function WireframeWorksheet({ data, onChange, onComplete }: WireframeWorksheetProps) {
  const defaultData: WireframeData = {
    layout: {
      header: '',
      navigation: '',
      mainContent: '',
      footer: ''
    },
    components: {
      callToAction: '',
      featuredSections: [],
      contentBlocks: []
    },
    styling: {
      colorScheme: '',
      typography: '',
      spacing: ''
    }
  };

  const currentData = data || defaultData;

  const handleLayoutChange = (key: keyof WireframeData['layout'], value: string) => {
    onChange({
      ...currentData,
      layout: {
        ...currentData.layout,
        [key]: value
      }
    });
  };

  const handleComponentsChange = (key: keyof WireframeData['components'], value: string | string[]) => {
    onChange({
      ...currentData,
      components: {
        ...currentData.components,
        [key]: value
      }
    });
  };

  const handleStylingChange = (key: keyof WireframeData['styling'], value: string) => {
    onChange({
      ...currentData,
      styling: {
        ...currentData.styling,
        [key]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Website Wireframe Template</h2>
        <p className="text-gray-300">
          Plan the structure and layout of your website to ensure it effectively communicates your brand 
          identity and meets your business goals.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-medium mb-4">Layout Structure</h3>
          <div className="space-y-4">
            <TextArea
              label="Header Section"
              value={currentData.layout.header}
              onChange={(value) => handleLayoutChange('header', value)}
              placeholder="Describe your header layout (logo placement, navigation, etc.)"
              rows={3}
            />
            <TextArea
              label="Navigation Menu"
              value={currentData.layout.navigation}
              onChange={(value) => handleLayoutChange('navigation', value)}
              placeholder="List your main navigation items and structure"
              rows={3}
            />
            <TextArea
              label="Main Content Area"
              value={currentData.layout.mainContent}
              onChange={(value) => handleLayoutChange('mainContent', value)}
              placeholder="Describe your main content layout and sections"
              rows={4}
            />
            <TextArea
              label="Footer Section"
              value={currentData.layout.footer}
              onChange={(value) => handleLayoutChange('footer', value)}
              placeholder="Outline your footer content and structure"
              rows={3}
            />
          </div>
        </section>

        <section>
          <h3 className="text-xl font-medium mb-4">Key Components</h3>
          <div className="space-y-4">
            <TextArea
              label="Call-to-Action Elements"
              value={currentData.components.callToAction}
              onChange={(value) => handleComponentsChange('callToAction', value)}
              placeholder="Describe your main call-to-action buttons and their placement"
              rows={3}
            />
            <TextArea
              label="Featured Sections"
              value={currentData.components.featuredSections.join('\n')}
              onChange={(value) => handleComponentsChange('featuredSections', value.split('\n').filter(Boolean))}
              placeholder="List your featured sections (one per line)"
              rows={4}
            />
            <TextArea
              label="Content Blocks"
              value={currentData.components.contentBlocks.join('\n')}
              onChange={(value) => handleComponentsChange('contentBlocks', value.split('\n').filter(Boolean))}
              placeholder="List your main content blocks (one per line)"
              rows={4}
            />
          </div>
        </section>

        <section>
          <h3 className="text-xl font-medium mb-4">Visual Style Guide</h3>
          <div className="space-y-4">
            <TextArea
              label="Color Scheme"
              value={currentData.styling.colorScheme}
              onChange={(value) => handleStylingChange('colorScheme', value)}
              placeholder="Define your color palette and usage"
              rows={3}
            />
            <TextArea
              label="Typography"
              value={currentData.styling.typography}
              onChange={(value) => handleStylingChange('typography', value)}
              placeholder="Specify fonts, sizes, and text styles"
              rows={3}
            />
            <TextArea
              label="Spacing & Layout"
              value={currentData.styling.spacing}
              onChange={(value) => handleStylingChange('spacing', value)}
              placeholder="Define spacing rules and layout grid"
              rows={3}
            />
          </div>
        </section>
      </div>

      {onComplete && (
        <div className="flex justify-end mt-8">
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Save Wireframe
          </button>
        </div>
      )}
    </div>
  );
}
