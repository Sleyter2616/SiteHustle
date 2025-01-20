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
      padding: 5, // Reduced section padding
      flexGrow: 1,
      backgroundColor: '#F7FAFC',
      borderRadius: 5,
    borderColor: '#CBD5E0',
      borderWidth: 1
  },
title: {
      fontSize: 24,
      marginBottom: 15, // Reduced space after titles
      fontWeight: 'bold',
      color: '#2D3748',
      textAlign: 'center',
  },
  subtitle: {
      fontSize: 16,
      marginBottom: 5, // Reduced space after subtitle
    color: '#2D3748',
    fontWeight: 'bold',
      borderBottom: 1,
    textTransform: 'uppercase',
      borderBottomColor: '#CBD5E0',
      paddingBottom: 5,
  },
 sectionTitle: {
      fontSize: 14,
      marginTop: 5, // Reduced space before section titles
      marginBottom: 3, // Reduced space after section titles
      color: '#4A5568',
      fontWeight: 'bold',
  },
  explanationText: {
      fontSize: 12,
      marginBottom: 5,
       color: '#4A5568', // Darken the color for Explanation Text
      fontStyle: 'italic',
      backgroundColor: '#EDF2F7',
      padding: 5,
      borderRadius: 3,
      textAlign: 'left',
      lineHeight: 1.4,
     borderColor: '#CBD5E0',
   borderWidth: 1,
  },
  text: {
      fontSize: 12,
      marginBottom: 3, // Reduce spacing after text for less visual clutter
      color: '#4A5568',
  },
  list: {
      marginLeft: 20,
      marginBottom: 5, // Reduce list spacing
  },
  listItem: {
      fontSize: 12,
      marginBottom: 2, // Reduce space after list item
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
listWithBullet: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 3,
  marginLeft: 15
},
bullet: {
  width: 5,
  height: 5,
  borderRadius: 5,
  backgroundColor: '#4A5568',
  marginRight: 10,
  marginTop: 4,
}
});

export const VisionWorksheetPDF: React.FC<{ data: Pillar1Data }> = ({ data }) => {
    const { worksheet } = data;

    return (
      <React.Fragment>
          <Page size="A4" style={styles.page}>
              <Text style={styles.title}>Vision & Goals Worksheet</Text>
  
              {/* Business Identity */}
              <View style={styles.section}>
                  <Text style={styles.subtitle}>Business Identity</Text>
                  <Text style={styles.explanationText}>
                      Your business name and tagline are often the first impression people have of your brand. They should be memorable, meaningful, and aligned with your vision.
                  </Text>
                  <Text style={styles.text}>Business Name: {worksheet?.businessName}</Text>
                  <Text style={styles.text}>Tagline: {worksheet?.tagline}</Text>
                    <Text style={styles.explanationText}>
                        Your mission statement is the guiding light for all your business decisions. When done right, it becomes the compass that guides your content, decisions, and brand positioning.
                    </Text>
                  <Text style={styles.explanationText}>Mission Statement Formula: "We exist to [action] for [audience] so they can [transformation]".</Text>
                  <Text style={styles.explanationText}>Example:  "We exist to empower non-technical entrepreneurs with no-code tools so they can transform their ideas into thriving digital businesses."</Text>
                  <Text style={styles.text}>Mission Statement: {worksheet?.missionStatement}</Text>
                 <Text style={styles.explanationText}>Core values are the principles that guide your business behavior and decision-making. They should resonate with both your team and your audience.</Text>
                <Text style={styles.sectionTitle}>Core Values</Text>
                <View style={styles.list}>
                    {worksheet?.coreValues?.map((value, index) => (
                         <View style={styles.listWithBullet} key={index}>
                           <View style={styles.bullet}></View>
                           <Text style={styles.listItem}>{value}</Text>
                          </View>
                    ))}
                </View>
              </View>
  
              {/* Business Goals */}
              <View style={styles.section}>
                <Text style={styles.subtitle}>Business Goals</Text>
                <Text style={styles.explanationText}>
                  Clear goals are essential for turning your vision into reality. Let's break down your goals into manageable timeframes:
                  </Text>
                <Text style={styles.sectionTitle}>Short Term (6-12 months)</Text>
                  <Text style={styles.text}>{worksheet?.businessGoals?.shortTerm}</Text>
  
                <Text style={styles.sectionTitle}>Mid Term (1-2 years)</Text>
                  <Text style={styles.text}>{worksheet?.businessGoals?.midTerm}</Text>
  
                <Text style={styles.sectionTitle}>Long Term (2-3 years)</Text>
                  <Text style={styles.text}>{worksheet?.businessGoals?.longTerm}</Text>
                  <Text style={styles.explanationText}>What do you want your website to achieve?</Text>
                <Text style={styles.sectionTitle}>Website Goals</Text>
                  <Text style={styles.text}>{worksheet?.businessGoals?.websiteGoals}</Text>
                  <Text style={styles.explanationText}>How do you measure your success</Text>
                <Text style={styles.sectionTitle}>Success Indicators</Text>
                  <Text style={styles.text}>{worksheet?.businessGoals?.successIndicators}</Text>
              </View>
  
              <Text style={styles.pageNumber}>1</Text>
          </Page>
  
          <Page size="A4" style={styles.page}>
              {/* Target Audience */}
              <View style={styles.section}>
                  <Text style={styles.subtitle}>Target Audience</Text>
                <Text style={styles.explanationText}>Understanding your ideal customer profile will help you create content and products that perfectly match their needs.</Text>
              <Text style={styles.sectionTitle}>Primary Profile</Text>
              <Text style={styles.explanationText}> Who are they? (age, location, profession). They struggle with (pain points). They desire (goals/outcomes). </Text>
                  <Text style={styles.text}>{worksheet?.targetAudience?.primaryProfile}</Text>
                  <Text style={styles.sectionTitle}>Secondary Audiences</Text>
                   <Text style={styles.explanationText}> List any other segments who might also benefit from your offerings.</Text>
                  <View style={styles.list}>
                      {worksheet?.targetAudience?.secondaryAudiences?.map((audience, index) => (
                          <View style={styles.listWithBullet} key={index}>
                           <View style={styles.bullet}></View>
                           <Text style={styles.listItem}>{audience}</Text>
                          </View>
                      ))}
                  </View>
              <Text style={styles.sectionTitle}>Pain Points</Text>
              <Text style={styles.explanationText}> Think about how your “Conflict → Internal Pursuit → Action → Result → Content” cycle intersects with these pain points. </Text>
                  <View style={styles.list}>
                      {worksheet?.targetAudience?.painPoints?.map((point, index) => (
                           <View style={styles.listWithBullet} key={index}>
                              <View style={styles.bullet}></View>
                              <Text style={styles.listItem}>{point}</Text>
                          </View>
                      ))}
                  </View>
                   <Text style={styles.subtitle}>Ideal Customer Profile</Text>
                   <Text style={styles.explanationText}>A good idea of your ideal customer will help you focus on what really matters.</Text>
                  
                  <Text style={styles.sectionTitle}>Problem</Text>
               <Text style={styles.explanationText}>What is the problem they are trying to solve?</Text>
                  <Text style={styles.text}>{worksheet?.targetAudience?.idealCustomerProfile?.problem}</Text>
  
                  <Text style={styles.sectionTitle}>Journey</Text>
               <Text style={styles.explanationText}>What is the journey they want to take?</Text>
                  <Text style={styles.text}>{worksheet?.targetAudience?.idealCustomerProfile?.journey}</Text>
  
                  <Text style={styles.sectionTitle}>Desires</Text>
                 <Text style={styles.explanationText}>What do they desire?</Text>
                  <View style={styles.list}>
                      {worksheet?.targetAudience?.idealCustomerProfile?.desires?.map((desire, index) => (
                           <View style={styles.listWithBullet} key={index}>
                              <View style={styles.bullet}></View>
                              <Text style={styles.listItem}>{desire}</Text>
                          </View>
                      ))}
                  </View>
  
                <Text style={styles.sectionTitle}>Desired State</Text>
                 <Text style={styles.explanationText}>What is the desired end state?</Text>
                  <Text style={styles.text}>{worksheet?.targetAudience?.idealCustomerProfile?.desiredState}</Text>
  
                  <Text style={styles.sectionTitle}>Gap Analysis</Text>
                 <Text style={styles.explanationText}>What is the gap between their current and desired states?</Text>
                  <Text style={styles.text}>{worksheet?.targetAudience?.idealCustomerProfile?.gap}</Text>
  
                  <Text style={styles.sectionTitle}>Unique Selling Point</Text>
                  <Text style={styles.explanationText}>What makes your solution unique?</Text>
                  <Text style={styles.text}>{worksheet?.targetAudience?.idealCustomerProfile?.uniqueSellingPoint}</Text>
  
                  <Text style={styles.sectionTitle}>Benefits</Text>
                   <Text style={styles.explanationText}>What benefits do they recieve?</Text>
                  <View style={styles.list}>
                      {worksheet?.targetAudience?.idealCustomerProfile?.benefits?.map((benefit, index) => (
                           <View style={styles.listWithBullet} key={index}>
                              <View style={styles.bullet}></View>
                              <Text style={styles.listItem}>{benefit}</Text>
                          </View>
                      ))}
                  </View>
  
                  <Text style={styles.sectionTitle}>Common Objections</Text>
                  <Text style={styles.explanationText}>What are the most common objections?</Text>
                  <View style={styles.list}>
                      {worksheet?.targetAudience?.idealCustomerProfile?.objections?.map((objection, index) => (
                           <View style={styles.listWithBullet} key={index}>
                              <View style={styles.bullet}></View>
                              <Text style={styles.listItem}>{objection}</Text>
                          </View>
                      ))}
                  </View>
              </View>
  
              <Text style={styles.pageNumber}>2</Text>
          </Page>
  
          <Page size="A4" style={styles.page}>
              {/* Customer Journey */}
              <View style={styles.section}>
                  <Text style={styles.subtitle}>Customer Journey</Text>
                  <Text style={styles.explanationText}>Understanding how customers discover, evaluate, and engage with your brand.</Text>
  
                  <Text style={styles.sectionTitle}>Awareness Stage</Text>
                  <Text style={styles.explanationText}>How do new prospects first find out about you? Consider your signature style and preferred platforms.</Text>
                  <View style={styles.list}>
                      {worksheet?.customerJourney?.awareness?.map((item, index) => (
                          <View style={styles.listWithBullet} key={index}>
                           <View style={styles.bullet}></View>
                           <Text style={styles.listItem}>{item}</Text>
                          </View>
                      ))}
                  </View>
  
                  <Text style={styles.sectionTitle}>Consideration Stage</Text>
                 <Text style={styles.explanationText}>What trust-building elements do prospects need to see to be convinced you're the right solution?</Text>
                  <View style={styles.list}>
                      {worksheet?.customerJourney?.consideration?.map((item, index) => (
                           <View style={styles.listWithBullet} key={index}>
                              <View style={styles.bullet}></View>
                              <Text style={styles.listItem}>{item}</Text>
                           </View>
                      ))}
                  </View>
  
                  <Text style={styles.sectionTitle}>Decision Stage</Text>
                  <Text style={styles.explanationText}>How do you want customers to complete their purchase or sign up for your services?</Text>
                  <Text style={styles.text}>{worksheet?.customerJourney?.decision}</Text>
  
                  <Text style={styles.sectionTitle}>Retention Stage</Text>
                 <Text style={styles.explanationText}>How will you keep customers engaged and encourage them to refer others?</Text>
                  <View style={styles.list}>
                      {worksheet?.customerJourney?.retention?.map((item, index) => (
                          <View style={styles.listWithBullet} key={index}>
                           <View style={styles.bullet}></View>
                           <Text style={styles.listItem}>{item}</Text>
                          </View>
                      ))}
                  </View>
              </View>
  
              {/* SWOT Analysis */}
              <View style={styles.section}>
                  <Text style={styles.subtitle}>SWOT Analysis</Text>
                   <Text style={styles.explanationText}>Analyze your Strengths, Weaknesses, Opportunities, and Threats</Text>
  
                  <Text style={styles.sectionTitle}>Strengths</Text>
                 <Text style={styles.explanationText}>What are some of your unique skills and assets?</Text>
                  <View style={styles.list}>
                      {worksheet?.swot?.strengths?.map((item, index) => (
                          <View style={styles.listWithBullet} key={index}>
                           <View style={styles.bullet}></View>
                           <Text style={styles.listItem}>{item}</Text>
                          </View>
                      ))}
                  </View>
  
                  <Text style={styles.sectionTitle}>Weaknesses</Text>
                 <Text style={styles.explanationText}>Where might you need help or struggle?</Text>
                  <View style={styles.list}>
                      {worksheet?.swot?.weaknesses?.map((item, index) => (
                           <View style={styles.listWithBullet} key={index}>
                              <View style={styles.bullet}></View>
                              <Text style={styles.listItem}>{item}</Text>
                          </View>
                      ))}
                  </View>
  
                  <Text style={styles.sectionTitle}>Opportunities</Text>
                 <Text style={styles.explanationText}>Are there any growing trends or markets?</Text>
                  <View style={styles.list}>
                      {worksheet?.swot?.opportunities?.map((item, index) => (
                          <View style={styles.listWithBullet} key={index}>
                           <View style={styles.bullet}></View>
                           <Text style={styles.listItem}>{item}</Text>
                          </View>
                      ))}
                  </View>
  
                  <Text style={styles.sectionTitle}>Threats</Text>
                 <Text style={styles.explanationText}>Who are the main competitors or what threats exist in your niche?</Text>
                  <View style={styles.list}>
                      {worksheet?.swot?.threats?.map((item, index) => (
                          <View style={styles.listWithBullet} key={index}>
                           <View style={styles.bullet}></View>
                           <Text style={styles.listItem}>{item}</Text>
                          </View>
                      ))}
                  </View>
              </View>
  
              <Text style={styles.pageNumber}>3</Text>
          </Page>
      </React.Fragment>
  );
};