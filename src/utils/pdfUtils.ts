/** @jsxImportSource @react-pdf/renderer */
import React from 'react';
import { pdf, Document } from '@react-pdf/renderer';
import { VisionWorksheetPDF } from '../components/pdf/VisionWorksheetPDF';
import { Pillar1Data } from '../types/pillar1Types';

export const generateVisionWorksheetPDF = async (data: Pillar1Data) => {
  try {
    // Create the PDF document
    const blob = await pdf((
      React.createElement(Document, {}, 
        React.createElement(VisionWorksheetPDF, { data })
      )
    )).toBlob();
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.worksheet?.businessName || 'vision'}-worksheet.pdf`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
