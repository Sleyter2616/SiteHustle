/** @jsxImportSource @react-pdf/renderer */
import React from 'react';
import { pdf, Document } from '@react-pdf/renderer';
import { VisionWorksheetPDF } from '../components/pdf/VisionWorksheetPDF';
import { Pillar1Data } from '../types/pillar1Types';

export const generateVisionWorksheetPDF = async (data: Pillar1Data) => {
  const PDFDocument = React.createElement(Document, {}, [
    React.createElement(VisionWorksheetPDF, { data, key: 'worksheet' })
  ]);

  const blob = await pdf(PDFDocument).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.worksheet?.businessName || 'vision'}-worksheet.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
