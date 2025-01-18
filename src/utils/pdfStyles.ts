import { StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_0ew.woff2' },
    { 
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_0ew.woff2',
      fontWeight: 'bold'
    }
  ]
});

// Define colors
const colors = {
  background: '#1A202C',
  headerBg: '#2D3748',
  text: '#E2E8F0',
  heading: '#F7FAFC',
  subheading: '#A0AEC0',
  accent: '#5865F2'
};

// Create styles
export const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.background,
    padding: 40,
    fontFamily: 'Inter',
    color: colors.text,
  },
  header: {
    backgroundColor: colors.headerBg,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    color: colors.heading,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: colors.subheading,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.heading,
    backgroundColor: colors.headerBg,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  field: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 12,
    color: colors.subheading,
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 1.4,
  },
  list: {
    marginLeft: 15,
  },
  listItem: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: colors.subheading,
  },
  divider: {
    borderBottom: `1px solid ${colors.headerBg}`,
    marginVertical: 15,
  },
});
