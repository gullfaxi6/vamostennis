import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import TennisRackets from '../components/TennisRackets';
import SectionHeader from '../components/SectionHeader';
import { USER, PRIVILEGES } from '../data/mockData';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar with gear */}
        <View style={styles.topBar}>
          <View style={styles.topBarSpacer} />
          <TouchableOpacity
            style={styles.gearBtn}
            onPress={() => Alert.alert('Paramètres', 'Gérez vos paramètres de compte.')}
            activeOpacity={0.8}
          >
            <Ionicons name="settings-outline" size={24} color={COLORS.darkBrown} />
          </TouchableOpacity>
        </View>

        {/* Profile section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{USER.initials}</Text>
          </View>
          <Text style={styles.profileName}>{USER.fullName}</Text>
          <Text style={styles.profileBadge}>Membre Premium ♥</Text>
        </View>

        {/* Premium Membership Card */}
        <View style={styles.premiumCard}>
          <View style={styles.premiumInner}>
            <TennisRackets size={44} color={COLORS.gold} accentColor={COLORS.cream} />
            <Text style={styles.premiumBrand}>VAMOS TENNIS</Text>
            <Text style={styles.premiumLabel}>— MEMBRE PREMIUM —</Text>
            <Text style={styles.premiumSince}>DEPUIS {USER.memberSince.toUpperCase()}</Text>
          </View>
        </View>

        {/* Vos Privilèges */}
        <View style={styles.privilegesSection}>
          <SectionHeader
            title="VOS PRIVILÈGES"
            style={styles.sectionHeaderStyle}
          />
          <View style={styles.privilegesRow}>
            {PRIVILEGES.map((privilege) => (
              <View key={privilege.id} style={styles.privilegeItem}>
                <View style={styles.privilegeIconWrap}>
                  <Ionicons name={privilege.icon} size={22} color={COLORS.gold} />
                </View>
                <Text style={styles.privilegeLabel}>{privilege.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Vamos Atelier */}
        <View style={styles.atelierSection}>
          <SectionHeader
            title="VAMOS ATELIER"
            style={styles.sectionHeaderStyle}
          />

          <View style={styles.atelierCard}>
            {/* Image placeholder */}
            <View style={styles.atelierImagePlaceholder}>
              <Ionicons name="bag-outline" size={36} color={COLORS.textSecondary} />
              <Text style={styles.atelierPlaceholderText}>Collection Tennis Lifestyle</Text>
            </View>

            {/* Text content */}
            <View style={styles.atelierContent}>
              <Text style={styles.atelierDesc}>
                Découvrir la collection de vêtements et d'accessoires tennis lifestyle.
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert('Vamos Atelier', 'La boutique Vamos Atelier arrive bientôt.')
                }
                activeOpacity={0.8}
              >
                <Text style={styles.atelierLink}>Découvrir →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 8,
    marginBottom: 4,
  },
  topBarSpacer: {
    flex: 1,
  },
  gearBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Profile section
  profileSection: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 4,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.darkBrown,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: COLORS.gold,
  },
  avatarInitials: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.xxl,
    color: COLORS.cream,
    fontWeight: '700',
    letterSpacing: 2,
  },
  profileName: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.xl,
    color: COLORS.darkBrown,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  profileBadge: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.sm,
    color: COLORS.gold,
    fontWeight: '500',
    letterSpacing: 0.5,
  },

  // Premium card
  premiumCard: {
    backgroundColor: COLORS.burgundy,
    borderRadius: 16,
    padding: 3,
    marginBottom: 20,
  },
  premiumInner: {
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.gold,
    padding: 20,
    alignItems: 'center',
  },
  premiumBrand: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.lg,
    color: COLORS.gold,
    fontWeight: '700',
    letterSpacing: 3,
    marginTop: 10,
    marginBottom: 6,
  },
  premiumLabel: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 8,
  },
  premiumSince: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  // Privileges
  privilegesSection: {
    marginBottom: 20,
  },
  sectionHeaderStyle: {
    marginBottom: 12,
  },
  privilegesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.creamLight,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 110, 0.2)',
  },
  privilegeItem: {
    flex: 1,
    alignItems: 'center',
  },
  privilegeIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(201, 169, 110, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privilegeLabel: {
    fontFamily: FONTS.sans,
    fontSize: 9,
    color: COLORS.burgundy,
    textAlign: 'center',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },

  // Atelier
  atelierSection: {
    marginBottom: 8,
  },
  atelierCard: {
    backgroundColor: COLORS.creamLight,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 110, 0.2)',
  },
  atelierImagePlaceholder: {
    height: 100,
    backgroundColor: '#C5B9A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  atelierPlaceholderText: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  atelierContent: {
    padding: 14,
  },
  atelierDesc: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.sm,
    color: COLORS.darkBrown,
    lineHeight: 20,
    marginBottom: 10,
  },
  atelierLink: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.sm,
    color: COLORS.gold,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default ProfileScreen;
