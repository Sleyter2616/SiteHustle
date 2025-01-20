import React from 'react';
import { Page, Text, View, StyleSheet, Document } from '@react-pdf/renderer';
import { Pillar1Data } from '../../types/pillar1Types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2D3748',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    color: '#2D3748',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4A5568',
  },
  list: {
    marginLeft: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
    color: '#4A5568',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export const VisionWorksheetPDF: React.FC<{ data: Pillar1Data }> = ({ data }) => {
  const { worksheet } = data;
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Vision & Goals Worksheet</Text>
        
        {/* Business Identity */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Business Identity</Text>
          <Text style={styles.text}>Business Name: {worksheet?.businessName}</Text>
          <Text style={styles.text}>Tagline: {worksheet?.tagline}</Text>
          <Text style={styles.text}>Mission Statement: {worksheet?.missionStatement}</Text>
          
          <Text style={styles.sectionTitle}>Core Values</Text>
          <View style={styles.list}>
            {worksheet?.coreValues?.map((value, index) => (
              <Text key={index} style={styles.listItem}>• {value}</Text>
            ))}
          </View>
        </View>

        {/* Business Goals */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Business Goals</Text>
          <Text style={styles.sectionTitle}>Short Term (6-12 months)</Text>
          <Text style={styles.text}>{worksheet?.businessGoals?.shortTerm}</Text>
          
          <Text style={styles.sectionTitle}>Mid Term (1-2 years)</Text>
          <Text style={styles.text}>{worksheet?.businessGoals?.midTerm}</Text>
          
          <Text style={styles.sectionTitle}>Long Term (2-3 years)</Text>
          <Text style={styles.text}>{worksheet?.businessGoals?.longTerm}</Text>
          
          <Text style={styles.sectionTitle}>Website Goals</Text>
          <Text style={styles.text}>{worksheet?.businessGoals?.websiteGoals}</Text>
          
          <Text style={styles.sectionTitle}>Success Indicators</Text>
          <Text style={styles.text}>{worksheet?.businessGoals?.successIndicators}</Text>
        </View>

        <Text style={styles.pageNumber}>1</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        {/* Target Audience */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Target Audience</Text>
          <Text style={styles.sectionTitle}>Primary Profile</Text>
          <Text style={styles.text}>{worksheet?.targetAudience?.primaryProfile}</Text>

          <Text style={styles.sectionTitle}>Secondary Audiences</Text>
          <View style={styles.list}>
            {worksheet?.targetAudience?.secondaryAudiences?.map((audience, index) => (
              <Text key={index} style={styles.listItem}>• {audience}</Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Pain Points</Text>
          <View style={styles.list}>
            {worksheet?.targetAudience?.painPoints?.map((point, index) => (
              <Text key={index} style={styles.listItem}>• {point}</Text>
            ))}
          </View>

          <Text style={styles.subtitle}>Ideal Customer Profile</Text>
          <Text style={styles.sectionTitle}>Problem</Text>
          <Text style={styles.text}>{worksheet?.targetAudience?.idealCustomerProfile?.problem}</Text>
          
          <Text style={styles.sectionTitle}>Journey</Text>
          <Text style={styles.text}>{worksheet?.targetAudience?.idealCustomerProfile?.journey}</Text>
          
          <Text style={styles.sectionTitle}>Desires</Text>
          <View style={styles.list}>
            {worksheet?.targetAudience?.idealCustomerProfile?.desires?.map((desire, index) => (
              <Text key={index} style={styles.listItem}>• {desire}</Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Desired State</Text>
          <Text style={styles.text}>{worksheet?.targetAudience?.idealCustomerProfile?.desiredState}</Text>
          
          <Text style={styles.sectionTitle}>Gap Analysis</Text>
          <Text style={styles.text}>{worksheet?.targetAudience?.idealCustomerProfile?.gap}</Text>
          
          <Text style={styles.sectionTitle}>Unique Selling Point</Text>
          <Text style={styles.text}>{worksheet?.targetAudience?.idealCustomerProfile?.uniqueSellingPoint}</Text>
          
          <Text style={styles.sectionTitle}>Benefits</Text>
          <View style={styles.list}>
            {worksheet?.targetAudience?.idealCustomerProfile?.benefits?.map((benefit, index) => (
              <Text key={index} style={styles.listItem}>• {benefit}</Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Common Objections</Text>
          <View style={styles.list}>
            {worksheet?.targetAudience?.idealCustomerProfile?.objections?.map((objection, index) => (
              <Text key={index} style={styles.listItem}>• {objection}</Text>
            ))}
          </View>
        </View>

        <Text style={styles.pageNumber}>2</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        {/* Customer Journey */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Customer Journey</Text>
          
          <Text style={styles.sectionTitle}>Awareness Stage</Text>
          <View style={styles.list}>
            {worksheet?.customerJourney?.awareness?.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Consideration Stage</Text>
          <View style={styles.list}>
            {worksheet?.customerJourney?.consideration?.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Decision Stage</Text>
          <Text style={styles.text}>{worksheet?.customerJourney?.decision}</Text>

          <Text style={styles.sectionTitle}>Retention Stage</Text>
          <View style={styles.list}>
            {worksheet?.customerJourney?.retention?.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
        </View>

        {/* SWOT Analysis */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>SWOT Analysis</Text>
          
          <Text style={styles.sectionTitle}>Strengths</Text>
          <View style={styles.list}>
            {worksheet?.swot?.strengths?.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Weaknesses</Text>
          <View style={styles.list}>
            {worksheet?.swot?.weaknesses?.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Opportunities</Text>
          <View style={styles.list}>
            {worksheet?.swot?.opportunities?.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Threats</Text>
          <View style={styles.list}>
            {worksheet?.swot?.threats?.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
        </View>

        <Text style={styles.pageNumber}>3</Text>
      </Page>
    </Document>
  );
};
