import React from 'react';
import { Page, Text, View, StyleSheet, Document } from '@react-pdf/renderer';
import { VisionData } from '../../types/pillar1';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 5,
    flexGrow: 1,
    backgroundColor: '#F7FAFC',
    borderRadius: 5,
    borderColor: '#CBD5E0',
    borderWidth: 1
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2D3748',
    fontWeight: 'bold',
    borderBottom: 1,
    textTransform: 'uppercase',
    borderBottomColor: '#CBD5E0',
    paddingBottom: 5,
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 3,
    color: '#4A5568',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4A5568',
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
    color: '#4A5568',
  }
});

interface VisionWorksheetPDFProps {
  data?: VisionData;
}

export const VisionWorksheetPDF: React.FC<VisionWorksheetPDFProps> = ({ data }) => {
  if (!data) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Vision Worksheet</Text>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Basic Information</Text>
            <Text style={styles.sectionTitle}>Business Name</Text>
            <Text style={styles.text}>{data.worksheet?.businessName}</Text>
            
            <Text style={styles.sectionTitle}>Tagline</Text>
            <Text style={styles.text}>{data.worksheet?.tagline}</Text>
            
            <Text style={styles.sectionTitle}>Mission Statement</Text>
            <Text style={styles.text}>{data.worksheet?.missionStatement}</Text>
            
            <Text style={styles.sectionTitle}>Core Values</Text>
            <View style={styles.list}>
              {data.worksheet?.coreValues?.map((value, index) => (
                <Text key={index} style={styles.listItem}>• {value}</Text>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Business Goals</Text>
            <Text style={styles.sectionTitle}>Short Term Goals</Text>
            <Text style={styles.text}>{data.worksheet?.businessGoals?.shortTerm}</Text>
            
            <Text style={styles.sectionTitle}>Mid Term Goals</Text>
            <Text style={styles.text}>{data.worksheet?.businessGoals?.midTerm}</Text>
            
            <Text style={styles.sectionTitle}>Long Term Goals</Text>
            <Text style={styles.text}>{data.worksheet?.businessGoals?.longTerm}</Text>
            
            {data.worksheet?.businessGoals?.websiteGoals && (
              <>
                <Text style={styles.sectionTitle}>Website Goals</Text>
                <Text style={styles.text}>{data.worksheet?.businessGoals?.websiteGoals}</Text>
              </>
            )}
            
            {data.worksheet?.businessGoals?.successIndicators && (
              <>
                <Text style={styles.sectionTitle}>Success Indicators</Text>
                <Text style={styles.text}>{data.worksheet?.businessGoals?.successIndicators}</Text>
              </>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>SWOT Analysis</Text>
            <Text style={styles.sectionTitle}>Strengths</Text>
            <View style={styles.list}>
              {data.worksheet?.swot?.strengths?.map((strength, index) => (
                <Text key={index} style={styles.listItem}>• {strength}</Text>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Weaknesses</Text>
            <View style={styles.list}>
              {data.worksheet?.swot?.weaknesses?.map((weakness, index) => (
                <Text key={index} style={styles.listItem}>• {weakness}</Text>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Opportunities</Text>
            <View style={styles.list}>
              {data.worksheet?.swot?.opportunities?.map((opportunity, index) => (
                <Text key={index} style={styles.listItem}>• {opportunity}</Text>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Threats</Text>
            <View style={styles.list}>
              {data.worksheet?.swot?.threats?.map((threat, index) => (
                <Text key={index} style={styles.listItem}>• {threat}</Text>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Customer Journey</Text>
            <Text style={styles.sectionTitle}>Awareness</Text>
            <View style={styles.list}>
              {data.worksheet?.customerJourney?.awareness?.map((item, index) => (
                <Text key={index} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Consideration</Text>
            <View style={styles.list}>
              {data.worksheet?.customerJourney?.consideration?.map((item, index) => (
                <Text key={index} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Decision</Text>
            <Text style={styles.text}>{data.worksheet?.customerJourney?.decision}</Text>
            
            <Text style={styles.sectionTitle}>Retention</Text>
            <View style={styles.list}>
              {data.worksheet?.customerJourney?.retention?.map((item, index) => (
                <Text key={index} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Target Audience</Text>
            <Text style={styles.sectionTitle}>Primary Profile</Text>
            <Text style={styles.text}>{data.worksheet?.targetAudience?.primaryProfile}</Text>
            
            <Text style={styles.sectionTitle}>Secondary Audiences</Text>
            <View style={styles.list}>
              {data.worksheet?.targetAudience?.secondaryAudiences?.map((audience, index) => (
                <Text key={index} style={styles.listItem}>• {audience}</Text>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Pain Points</Text>
            <View style={styles.list}>
              {data.worksheet?.targetAudience?.painPoints?.map((point, index) => (
                <Text key={index} style={styles.listItem}>• {point}</Text>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Ideal Customer Profile</Text>
            <Text style={styles.sectionTitle}>Problem</Text>
            <Text style={styles.text}>{data.worksheet?.targetAudience?.idealCustomerProfile?.problem}</Text>
            
            <Text style={styles.sectionTitle}>Journey</Text>
            <Text style={styles.text}>{data.worksheet?.targetAudience?.idealCustomerProfile?.journey}</Text>
            
            <Text style={styles.sectionTitle}>Desires</Text>
            <View style={styles.list}>
              {data.worksheet?.targetAudience?.idealCustomerProfile?.desires?.map((desire, index) => (
                <Text key={index} style={styles.listItem}>• {desire}</Text>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Desired State</Text>
            <Text style={styles.text}>{data.worksheet?.targetAudience?.idealCustomerProfile?.desiredState}</Text>
            
            <Text style={styles.sectionTitle}>Gap Analysis</Text>
            <Text style={styles.text}>{data.worksheet?.targetAudience?.idealCustomerProfile?.gap}</Text>
            
            <Text style={styles.sectionTitle}>Unique Selling Point</Text>
            <Text style={styles.text}>{data.worksheet?.targetAudience?.idealCustomerProfile?.uniqueSellingPoint}</Text>
            
            <Text style={styles.sectionTitle}>Benefits</Text>
            <View style={styles.list}>
              {data.worksheet?.targetAudience?.idealCustomerProfile?.benefits?.map((benefit, index) => (
                <Text key={index} style={styles.listItem}>• {benefit}</Text>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Common Objections</Text>
            <View style={styles.list}>
              {data.worksheet?.targetAudience?.idealCustomerProfile?.objections?.map((objection, index) => (
                <Text key={index} style={styles.listItem}>• {objection}</Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};