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
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import TennisRackets from '../components/TennisRackets';
import { EVENTS } from '../data/mockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

const EventsScreen = () => {
  const featuredEvent = EVENTS[0];

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

          <Text style={styles.headerTitle}>ÉVÉNEMENTS</Text>

          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => Alert.alert('Notifications', 'Aucune nouvelle notification.')}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications-outline" size={24} color={COLORS.darkBrown} />
          </TouchableOpacity>
        </View>

        {/* Featured Event Card */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredBg}>
            {/* Gradient overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.85)']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />

            {/* Top row */}
            <View style={styles.featuredTop}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeDay}>{featuredEvent.dateShort}</Text>
                <Text style={styles.dateBadgeMonth}>{featuredEvent.month}</Text>
              </View>
              <TouchableOpacity
                onPress={() => Alert.alert('Favori', 'Ajouté à vos favoris ♥')}
                activeOpacity={0.8}
              >
                <Ionicons name="heart-outline" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            {/* Bottom content */}
            <View style={styles.featuredBottom}>
              <Text style={styles.featuredTitle}>{featuredEvent.title}</Text>
              <Text style={styles.featuredSubtitle}>{featuredEvent.subtitle}</Text>

              <View style={styles.featuredDetail}>
                <Ionicons name="time-outline" size={13} color={COLORS.cream} />
                <Text style={styles.featuredDetailText}>{featuredEvent.dayLabel}</Text>
              </View>
              <View style={styles.featuredDetail}>
                <Ionicons name="location-outline" size={13} color={COLORS.cream} />
                <Text style={styles.featuredDetailText}>{featuredEvent.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Vamos Club Card */}
        <TouchableOpacity
          style={styles.clubCard}
          activeOpacity={0.8}
          onPress={() => Alert.alert('Vamos Club', 'Bienvenue dans le Vamos Club exclusif.')}
        >
          <View style={styles.clubLeft}>
            <TennisRackets size={54} color={COLORS.gold} accentColor={COLORS.cream} />
          </View>
          <View style={styles.clubCenter}>
            <Text style={styles.clubTitle}>VAMOS CLUB</Text>
            <Text style={styles.clubDesc}>
              Tournois privés, soirées et expériences exclusives.
            </Text>
          </View>
          <View style={styles.clubRight}>
            <View style={styles.arrowCircle}>
              <Ionicons name="chevron-forward" size={16} color={COLORS.burgundy} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Rencontres Card */}
        <TouchableOpacity
          style={styles.rencontresCard}
          activeOpacity={0.8}
          onPress={() => Alert.alert('Rencontres', 'Trouvez votre prochain partenaire de jeu.')}
        >
          <View style={styles.rencontresLeft}>
            <Ionicons name="people" size={40} color={COLORS.burgundy} />
          </View>
          <View style={styles.rencontresCenter}>
            <Text style={styles.rencontresTitle}>RENCONTRES</Text>
            <Text style={styles.rencontresDesc}>
              Trouvez votre prochain partenaire de jeu.
            </Text>
          </View>
          <View style={styles.rencontresRight}>
            <View style={styles.goldArrowCircle}>
              <Ionicons name="chevron-forward" size={16} color={COLORS.burgundy} />
            </View>
          </View>
        </TouchableOpacity>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert(
              'Vous êtes invité?',
              'Partagez votre code d\'invitation pour rejoindre les événements exclusifs Vamos Tennis.',
              [
                { text: 'Plus tard', style: 'cancel' },
                { text: 'J\'ai un code', style: 'default' },
              ]
            )
          }
        >
          <Text style={styles.ctaButtonText}>VOUS ÊTES INVITÉ?</Text>
        </TouchableOpacity>

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

  // Featured card
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 220,
    marginBottom: 14,
  },
  featuredBg: {
    flex: 1,
    backgroundColor: '#2C3E2D',
    padding: 16,
    justifyContent: 'space-between',
  },
  featuredTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  dateBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  dateBadgeDay: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.xxl,
    color: COLORS.white,
    fontWeight: '700',
    lineHeight: 30,
  },
  dateBadgeMonth: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.cream,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  featuredBottom: {
    gap: 4,
  },
  featuredTitle: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.xl,
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  featuredSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.sm,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 6,
  },
  featuredDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  featuredDetailText: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 0.5,
  },

  // Vamos Club card
  clubCard: {
    backgroundColor: COLORS.burgundy,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  clubLeft: {
    marginRight: 12,
  },
  clubCenter: {
    flex: 1,
  },
  clubTitle: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.lg,
    color: COLORS.gold,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  clubDesc: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 17,
  },
  clubRight: {
    marginLeft: 10,
  },
  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Rencontres card
  rencontresCard: {
    backgroundColor: COLORS.creamLight,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 110, 0.25)',
  },
  rencontresLeft: {
    marginRight: 12,
  },
  rencontresCenter: {
    flex: 1,
  },
  rencontresTitle: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.lg,
    color: COLORS.burgundy,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  rencontresDesc: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.darkBrown,
    lineHeight: 17,
  },
  rencontresRight: {
    marginLeft: 10,
  },
  goldArrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // CTA Button
  ctaButton: {
    backgroundColor: COLORS.burgundy,
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  ctaButtonText: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.md,
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: '700',
  },
});

export default EventsScreen;
