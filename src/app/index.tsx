import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SERVICES = [
  {
    id: '1',
    title: 'Custom Software & Mobile',
    desc: 'High-performance web and cross-platform native mobile applications tailored for scale.',
    iconName: 'code-slash-outline',
  },
  {
    id: '2',
    title: 'Cloud & DevOps Architecture',
    desc: 'Automated CI/CD pipelines, cloud infrastructure migration, and zero-downtime operations.',
    iconName: 'cloud-outline',
  },
  {
    id: '3',
    title: 'AI & Workflow Automation',
    desc: 'Custom generative models, workflow bots, and intelligent business analytics pipelines.',
    iconName: 'hardware-chip-outline',
  },
  {
    id: '4',
    title: 'Cybersecurity & Compliance',
    desc: 'Enterprise-grade zero-trust identity architectures and vulnerability mitigations.',
    iconName: 'shield-checkmark-outline',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleInquirySubmit = async () => {
    if (!formName || !formEmail || !formMsg) {
      Alert.alert('Missing Fields', 'Please complete all fields before sending.');
      return;
    }

    setIsSending(true);
    try {
      const payload = new FormData();
      payload.append('access_key', '639f234a-9ab9-4016-852f-ba075743317f');
      payload.append('name', formName);
      payload.append('email', formEmail);
      payload.append('message', formMsg);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });
      const data = await res.json();

      if (data.success) {
        Alert.alert('Inquiry Sent', "Thank you! Saptanova's team will contact you shortly.");
        setFormName('');
        setFormEmail('');
        setFormMsg('');
        setActiveTab('Home');
      } else {
        Alert.alert('Submission Failed', data.message || 'Please check your inputs and try again.');
      }
    } catch (e) {
      Alert.alert('Network Error', 'Unable to reach the server. Verify your internet connection.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#070E1E" />

      {/* Top Header Bar */}
      <View style={styles.navbar}>
        <View style={styles.brandRow}>
          <Ionicons name="sparkles" size={20} color="#0066FF" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.brandTitle}>saptanova</Text>
            <Text style={styles.brandSubtitle}>TECHNOLOGIES</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.ctaButton} 
          onPress={() => setActiveTab('Contact')}
        >
          <Text style={styles.ctaText}>Let's Talk</Text>
        </TouchableOpacity>
      </View>

      {/* Main Tab Views */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'Home' && (
          <View>
            {/* Hero Card */}
            <View style={styles.heroBox}>
              <Text style={styles.heroTag}>ENTERPRISE DIGITAL SOLUTIONS</Text>
              <Text style={styles.heroTitle}>Building What's Next.</Text>
              <Text style={styles.heroBody}>
                We architect scalable cloud systems, custom software platforms, and intelligent AI automation for industry leaders.
              </Text>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => setActiveTab('Services')}
              >
                <Text style={styles.primaryButtonText}>Explore Capabilities →</Text>
              </TouchableOpacity>
            </View>

            {/* Quick Metrics */}
            <View style={styles.metricRow}>
              <View style={styles.metricCard}>
                <Text style={styles.metricNumber}>99.9%</Text>
                <Text style={styles.metricLabel}>Uptime Architecture</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.metricNumber}>Cloud</Text>
                <Text style={styles.metricLabel}>Native DevOps</Text>
              </View>
            </View>

            {/* Featured Services Preview */}
            <Text style={styles.sectionHeader}>Core Capabilities</Text>
            {SERVICES.slice(0, 2).map((s) => (
              <View key={s.id} style={styles.card}>
                <View style={styles.iconCircle}>
                  <Ionicons name={s.iconName as any} size={22} color="#0066FF" />
                </View>
                <Text style={styles.cardTitle}>{s.title}</Text>
                <Text style={styles.cardDesc}>{s.desc}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Services' && (
          <View>
            <Text style={styles.sectionTitleLarge}>Our Technology Services</Text>
            <Text style={styles.sectionSubtitle}>
              Engineered architectures designed to modernize enterprise workflows and reduce operating costs.
            </Text>
            {SERVICES.map((s) => (
              <View key={s.id} style={styles.card}>
                <View style={styles.iconCircle}>
                  <Ionicons name={s.iconName as any} size={22} color="#0066FF" />
                </View>
                <Text style={styles.cardTitle}>{s.title}</Text>
                <Text style={styles.cardDesc}>{s.desc}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'Contact' && (
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitleLarge}>Request a Consultation</Text>
            <Text style={styles.sectionSubtitle}>
              Direct project inquiry channel for Saptanova Technologies' engineering team.
            </Text>

            <Text style={styles.fieldLabel}>Client Name *</Text>
            <TextInput
              style={styles.inputField}
              placeholder="e.g. Roshan Kumar"
              placeholderTextColor="#94A3B8"
              value={formName}
              onChangeText={setFormName}
            />

            <Text style={styles.fieldLabel}>Work Email *</Text>
            <TextInput
              style={styles.inputField}
              placeholder="name@company.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formEmail}
              onChangeText={setFormEmail}
            />

            <Text style={styles.fieldLabel}>Project Details *</Text>
            <TextInput
              style={[styles.inputField, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Briefly describe your requirements or challenges..."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              value={formMsg}
              onChangeText={setFormMsg}
            />

            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleInquirySubmit}
              disabled={isSending}
            >
              <Feather name="send" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.submitBtnText}>
                {isSending ? 'Transmitting...' : 'Send Inquiry'}
              </Text>
            </TouchableOpacity>

            {/* Direct Contact Links */}
            <View style={styles.directContactBox}>
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={() => Linking.openURL('mailto:reachoutsaptanova@gmail.com')}
              >
                <Feather name="mail" size={16} color="#0066FF" />
                <Text style={styles.contactItemText}>reachoutsaptanova@gmail.com</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.contactItem}
                onPress={() => Linking.openURL('https://saptanova.in')}
              >
                <Feather name="globe" size={16} color="#0066FF" />
                <Text style={styles.contactItemText}>https://saptanova.in</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => setActiveTab('Home')}
        >
          <Ionicons 
            name={activeTab === 'Home' ? 'sparkles' : 'sparkles-outline'} 
            size={20} 
            color={activeTab === 'Home' ? '#0066FF' : '#64748B'} 
          />
          <Text style={[styles.tabLabel, activeTab === 'Home' && styles.tabActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => setActiveTab('Services')}
        >
          <Ionicons 
            name={activeTab === 'Services' ? 'layers' : 'layers-outline'} 
            size={20} 
            color={activeTab === 'Services' ? '#0066FF' : '#64748B'} 
          />
          <Text style={[styles.tabLabel, activeTab === 'Services' && styles.tabActive]}>
            Services
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => setActiveTab('Contact')}
        >
          <Ionicons 
            name={activeTab === 'Contact' ? 'mail' : 'mail-outline'} 
            size={20} 
            color={activeTab === 'Contact' ? '#0066FF' : '#64748B'} 
          />
          <Text style={[styles.tabLabel, activeTab === 'Contact' && styles.tabActive]}>
            Contact
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#070E1E',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 8,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 1.5,
  },
  ctaButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 90,
  },
  heroBox: {
    backgroundColor: '#070E1E',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  heroTag: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroBody: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066FF',
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  sectionTitleLarge: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
    marginTop: 10,
  },
  inputField: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    color: '#0F172A',
  },
  submitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0066FF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 18,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  directContactBox: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contactItemText: {
    fontSize: 12,
    color: '#334155',
  },
  bottomTabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 3,
  },
  tabActive: {
    color: '#0066FF',
    fontWeight: '700',
  },
});