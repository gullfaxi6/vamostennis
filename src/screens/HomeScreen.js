import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import TennisRackets from '../components/TennisRackets';
import HeartIcon from '../components/HeartIcon';
import { EVENTS } from '../data/mockData';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const nextEvent = EVENTS[0];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero section */}
      <View style={styles.hero}>
        <TennisRackets size={130} color={COLORS.burgundy} accentColor={COLORS.gold} />
        <Text style={styles.brandTitle}>VAMOS TENNIS</Text>
        <View style={styles.subtitleRow}>
          <View style={styles.decorLine} />
          <Text style={styles.brandSubtitle}>PLUS QUE DU TENNIS</Text>
          <View style={styles.decorLine} />
        </View>
        <HeartIcon size={18} color={COLORS.gold} style={styles.heart} />
        <Text style={styles.tagline}>
          Le tennis nous rassemble.{'\n'}Plus que du tennis.
        </Text>
      </View>

      {/* Prochain événement */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PROCHAIN ÉVÉNEMENT</Text>
        </View>
        <TouchableOpacity
          style={styles.eventPreviewCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Events')}
        >
          <View style={styles.eventPreviewBg}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeDay}>{nextEvent.dateShort}</Text>
              <Text style={styles.dateBadgeMonth}>{nextEvent.month}</Text>
            </View>
            <View style={styles.eventPreviewContent}>
              <Text style={styles.eventPreviewTitle}>{nextEvent.title}</Text>
              <Text style={styles.eventPreviewSubtitle}>{nextEvent.subtitle}</Text>
              <View style={styles.eventMeta}>
                <Ionicons name="time-outline" size={12} color={COLORS.gold} style={styles.eventMetaIcon} />
                <Text style={styles.eventMetaText}>{nextEvent.dayLabel}</Text>
              </View>
              <View style={styles.eventMeta}>
                <Ionicons name="location-outline" size={12} color={COLORS.gold} style={styles.eventMetaIcon} />
                <Text style={styles.eventMetaText}>{nextEvent.location}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DÉCOUVRIR</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.quickActionCard, styles.quickActionLeft]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Events')}
          >
            <Ionicons name="calendar" size={28} color={COLORS.burgundy} />
            <Text style={styles.quickActionTitle}>Événements</Text>
            <Text style={styles.quickActionSub}>Tournois & soirées</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Community')}
          >
            <Ionicons name="people" size={28} color={COLORS.burgundy} />
            <Text style={styles.quickActionTitle}>Communauté</Text>
            <Text style={styles.quickActionSub}>Vamos Society</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Brand values */}
      <View style={styles.valuesRow}>
        {['PASSION', 'TENNIS', 'ÉLÉGANCE'].map((v) => (
          <View key={v} style={styles.valueItem}>
            <View style={styles.valueLine} />
            <Text style={styles.valueLabel}>{v}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  content: {
    paddingBottom: 24,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  brandTitle: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.xxl,
    color: COLORS.burgundy,
    letterSpacing: 6,
    textTransform: 'uppercase',
    marginTop: 20,
    fontWeight: '700',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'center',
  },
  decorLine: {
    width: 50,
    height: 1,
    backgroundColor: COLORS.gold,
    marginHorizontal: 8,
  },
  brandSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.gold,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  heart: {
    marginTop: 12,
  },
  tagline: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.sm,
    color: COLORS.darkBrown,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 12,
  },
  eventPreviewCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  eventPreviewBg: {
    backgroundColor: '#2C3E2D',
    padding: 20,
    flexDirection: 'row',
    minHeight: 120,
  },
  dateBadge: {
    backgroundColor: 'rgba(201, 169, 110, 0.9)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginRight: 14,
    minWidth: 44,
  },
  dateBadgeDay: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.xl,
    color: COLORS.white,
    fontWeight: '700',
    lineHeight: 26,
  },
  dateBadgeMonth: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.white,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  eventPreviewContent: {
    flex: 1,
  },
  eventPreviewTitle: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.lg,
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: 1,
  },
  eventPreviewSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.sm,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  eventMetaIcon: {
    marginRight: 5,
  },
  eventMetaText: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 0.5,
  },
  quickActions: {
    flexDirection: 'row',
  },
  quickActionLeft: {
    marginRight: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray || '#E8DDD0',
  },
  quickActionTitle: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.md,
    color: COLORS.burgundy,
    fontWeight: '700',
    marginTop: 10,
  },
  quickActionSub: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  valuesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  valueItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  valueLine: {
    width: 20,
    height: 1,
    backgroundColor: COLORS.gold,
  },
  valueLabel: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});

export default HomeScreen;
