import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';
import TennisRackets from '../components/TennisRackets';
import HeartIcon from '../components/HeartIcon';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Logo */}
        <TennisRackets size={150} color={COLORS.burgundy} accentColor={COLORS.gold} />

        {/* Title */}
        <Text style={styles.title}>VAMOS TENNIS</Text>

        {/* Decorative subtitle with lines */}
        <View style={styles.subtitleRow}>
          <View style={styles.decorLine} />
          <Text style={styles.subtitle}>PLUS QUE DU TENNIS</Text>
          <View style={styles.decorLine} />
        </View>

        {/* Heart */}
        <HeartIcon size={20} color={COLORS.gold} style={styles.heart} />

        {/* Tagline */}
        <Text style={styles.tagline}>
          Le tennis nous rassemble.{'\n'}Plus que du tennis.
        </Text>
      </Animated.View>

      {/* Bottom brand mark */}
      <View style={styles.bottomMark}>
        <View style={styles.goldLine} />
        <Text style={styles.bottomText}>EST. 2023 · PARIS</Text>
        <View style={styles.goldLine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.xxxl,
    color: COLORS.burgundy,
    letterSpacing: 6,
    textTransform: 'uppercase',
    marginTop: 24,
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
    justifyContent: 'center',
  },
  decorLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gold,
    maxWidth: 60,
    marginHorizontal: 10,
  },
  subtitle: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.sm,
    color: COLORS.gold,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  heart: {
    marginTop: 14,
  },
  tagline: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
  },
  bottomMark: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 40,
    width: '100%',
    justifyContent: 'center',
  },
  goldLine: {
    width: 30,
    height: 1,
    backgroundColor: COLORS.gold,
    marginHorizontal: 8,
  },
  bottomText: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    color: COLORS.textSecondary,
    letterSpacing: 2,
  },
});

export default SplashScreen;
