import React from 'react';
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
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
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4A5568',
  },
  list: {
    marginLeft: 20,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
    color: '#4A5568',
  },
});

export const VisionWorksheetPDF: React.FC<{ data: Pillar1Data }> = ({ data }) => {
  const { worksheet } = data;
  
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Vision & Goals Worksheet</Text>
        
        {/* Business Identity */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Business Identity</Text>
          <Text style={styles.text}>Business Name: {worksheet?.businessName}</Text>
          <Text style={styles.text}>Tagline: {worksheet?.tagline}</Text>
          <Text style={styles.text}>Mission Statement: {worksheet?.missionStatement}</Text>
        </View>

        {/* Core Values */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Core Values</Text>
          <View style={styles.list}>
            {worksheet?.coreValues?.map((value, index) => (
              <Text key={index} style={styles.listItem}>• {value}</Text>
            ))}
          </View>
        </View>

        {/* Business Goals */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Business Goals</Text>
          <Text style={styles.text}>Short Term: {worksheet?.businessGoals?.shortTerm}</Text>
          <Text style={styles.text}>Mid Term: {worksheet?.businessGoals?.midTerm}</Text>
          <Text style={styles.text}>Long Term: {worksheet?.businessGoals?.longTerm}</Text>
        </View>

        {/* Target Audience */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Target Audience</Text>
          <Text style={styles.text}>Primary Profile: {worksheet?.targetAudience?.primaryProfile}</Text>
          <Text style={styles.text}>Pain Points:</Text>
          <View style={styles.list}>
            {worksheet?.targetAudience?.painPoints?.map((point, index) => (
              <Text key={index} style={styles.listItem}>• {point}</Text>
            ))}
          </View>
        </View>

        {/* SWOT Analysis */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>SWOT Analysis</Text>
          <Text style={styles.text}>Strengths:</Text>
          <View style={styles.list}>
            {worksheet?.swot?.strengths?.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
          <Text style={styles.text}>Weaknesses:</Text>
          <View style={styles.list}>
            {worksheet?.swot?.weaknesses?.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
          <Text style={styles.text}>Opportunities:</Text>
          <View style={styles.list}>
            {worksheet?.swot?.opportunities?.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
          <Text style={styles.text}>Threats:</Text>
          <View style={styles.list}>
            {worksheet?.swot?.threats?.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
        </View>
      </View>
    </Page>
  );
};
