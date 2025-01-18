import { pdf } from '@react-pdf/renderer';
import { VisionWorksheetPDF } from '../components/pdf/VisionWorksheetPDF';
import { Pillar1Data } from '../types/pillar1Types';

export const generateVisionWorksheetPDF = async (data: Pillar1Data) => {
  const blob = await pdf(VisionWorksheetPDF({ data })).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.worksheet.businessName.replace(/\s+/g, '-').toLowerCase()}-vision-worksheet.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
