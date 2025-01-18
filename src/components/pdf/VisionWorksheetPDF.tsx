import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { styles } from '../../utils/pdfStyles';
import { Pillar1Data } from '../../types/pillar1Types';

interface VisionWorksheetPDFProps {
  data: Pillar1Data;
}

export const VisionWorksheetPDF: React.FC<VisionWorksheetPDFProps> = ({ data }) => {
  const { worksheet } = data;

  const renderField = (label: string, value: string) => (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );

  const renderList = (label: string, items: string[]) => (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.list}>
        {items.map((item, index) => (
          <Text key={index} style={styles.listItem}>
            • {item}
          </Text>
        ))}
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Vision & Goals Worksheet</Text>
          <Text style={styles.subtitle}>Your roadmap to building a successful digital business</Text>
        </View>

        {/* Business Identity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Identity</Text>
          {renderField('Business Name', worksheet.businessName)}
          {renderField('Tagline', worksheet.tagline)}
          {renderField('Mission Statement', worksheet.missionStatement)}
          {renderList('Core Values', worksheet.coreValues)}
          {renderField('Vision Statement', worksheet.visionStatement)}
        </View>

        {/* Target Audience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Audience (ICP)</Text>
          {renderField('Primary Profile', worksheet.targetAudience.primaryProfile)}
          {worksheet.targetAudience.secondaryAudiences?.length > 0 && 
            renderList('Secondary Audiences', worksheet.targetAudience.secondaryAudiences)}
          {renderList('Pain Points', worksheet.targetAudience.painPoints)}
          
          {/* ICP Details */}
          {worksheet.targetAudience.idealCustomerProfile && (
            <>
              {renderField('Main Problem', worksheet.targetAudience.idealCustomerProfile.problem)}
              {renderField('Transformation Journey', worksheet.targetAudience.idealCustomerProfile.journey)}
              {renderList('Key Desires', worksheet.targetAudience.idealCustomerProfile.desires)}
              {renderField('Desired End State', worksheet.targetAudience.idealCustomerProfile.desiredState)}
              {renderField('Current Gap', worksheet.targetAudience.idealCustomerProfile.gap)}
              {renderField('Unique Selling Point', worksheet.targetAudience.idealCustomerProfile.uniqueSellingPoint)}
              {renderList('Benefits', worksheet.targetAudience.idealCustomerProfile.benefits)}
              {renderList('Potential Objections', worksheet.targetAudience.idealCustomerProfile.objections)}
            </>
          )}
        </View>

        {/* Business Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Goals</Text>
          {renderField('Short-term Goals (6-12 months)', worksheet.businessGoals.shortTerm)}
          {renderField('Mid-term Goals (1-2 years)', worksheet.businessGoals.midTerm)}
          {renderField('Long-term Goals (3-5 years)', worksheet.businessGoals.longTerm)}
        </View>

        {/* Customer Journey */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Journey</Text>
          {worksheet.customerJourney && (
            <>
              {renderList('A. Awareness Channels', worksheet.customerJourney.awareness)}
              {renderList('B. Trust-Building Elements', worksheet.customerJourney.consideration)}
              {renderField('C. Decision Process', worksheet.customerJourney.decision)}
              {renderList('D. Retention Strategies', worksheet.customerJourney.retention)}
            </>
          )}
        </View>

        {/* SWOT Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SWOT Analysis</Text>
          {worksheet.swot && (
            <>
              {renderList('Strengths', worksheet.swot.strengths)}
              {renderList('Weaknesses', worksheet.swot.weaknesses)}
              {renderList('Opportunities', worksheet.swot.opportunities)}
              {renderList('Threats', worksheet.swot.threats)}
            </>
          )}
        </View>

        {/* Next Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Steps & Action Items</Text>
          <Text style={styles.fieldValue}>
            1. Review and refine your business identity elements regularly
          </Text>
          <Text style={styles.fieldValue}>
            2. Validate your ICP assumptions through customer research
          </Text>
          <Text style={styles.fieldValue}>
            3. Set up tracking for your key business goals
          </Text>
          <Text style={styles.fieldValue}>
            4. Implement your customer journey touchpoints
          </Text>
          <Text style={styles.fieldValue}>
            5. Address weaknesses and capitalize on opportunities from your SWOT analysis
          </Text>
        </View>

        {/* Footer */}
        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};
