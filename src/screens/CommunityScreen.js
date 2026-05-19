import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import HeartIcon from '../components/HeartIcon';
import SectionHeader from '../components/SectionHeader';
import { MEMBERS } from '../data/mockData';

const MemberRow = ({ member }) => (
  <View style={styles.memberRow}>
    <View style={styles.memberAvatar}>
      <Text style={styles.memberInitials}>{member.initials}</Text>
    </View>
    <View style={styles.memberInfo}>
      <Text style={styles.memberName}>{member.name}</Text>
      <Text style={styles.memberSince}>Membre depuis {member.memberSince}</Text>
      <Text style={styles.memberCity}>{member.city}</Text>
    </View>
    <Ionicons name="ribbon" size={18} color={COLORS.gold} />
  </View>
);

const CommunityScreen = () => {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => Alert.alert('Menu', 'Menu de navigation')}
            activeOpacity={0.8}
          >
            <Ionicons name="menu" size={26} color={COLORS.darkBrown} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>COMMUNAUTÉ</Text>

          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => Alert.alert('Inviter', 'Invitez un ami à rejoindre Vamos Tennis.')}
            activeOpacity={0.8}
          >
            <Ionicons name="person-add-outline" size={23} color={COLORS.darkBrown} />
          </TouchableOpacity>
        </View>

        {/* Vamos Society Card */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            Alert.alert('Vamos Society', 'Une communauté sélective autour du sport et de l\'humain.')
          }
        >
          <LinearGradient
            colors={[COLORS.burgundy, COLORS.burgundyMedium]}
            style={styles.societyCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="people" size={36} color={COLORS.gold} style={styles.societyIcon} />

            <Text style={styles.societyTitle}>VAMOS SOCIETY</Text>

            <Text style={styles.societyDesc}>
              Une communauté sélective autour du sport et de l'humain.
            </Text>

            <View style={styles.societyDivider} />

            <Text style={styles.societyBadge}>ACCÈS SUR INVITATION</Text>

            <HeartIcon size={18} color={COLORS.gold} style={styles.societyHeart} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Members Section */}
        <View style={styles.membersSection}>
          <SectionHeader
            title="MEMBRES"
            actionText="Voir tout"
            onAction={() => Alert.alert('Membres', 'Voir tous les membres Vamos Society.')}
            style={styles.sectionHeaderStyle}
          />

          {MEMBERS.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 8,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.lg,
    color: COLORS.darkBrown,
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '700',
  },

  // Vamos Society Card
  societyCard: {
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    marginBottom: 20,
  },
  societyIcon: {
    marginBottom: 12,
  },
  societyTitle: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.xxl,
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 10,
  },
  societyDesc: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.sm,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  societyDivider: {
    width: 60,
    height: 1,
    backgroundColor: COLORS.gold,
    marginBottom: 14,
    opacity: 0.7,
  },
  societyBadge: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 14,
  },
  societyHeart: {
    marginTop: 0,
  },

  // Members section
  membersSection: {
    marginTop: 4,
  },
  sectionHeaderStyle: {
    marginBottom: 8,
  },

  // Member row
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(201, 169, 110, 0.15)',
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.burgundy,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  memberInitials: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.md,
    color: COLORS.cream,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.md,
    color: COLORS.darkBrown,
    fontWeight: '700',
  },
  memberSince: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  memberCity: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
});

export default CommunityScreen;
