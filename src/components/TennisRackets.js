import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const TennisRacket = ({ rotation, style }) => {
  return (
    <View style={[styles.racketContainer, { transform: [{ rotate: rotation }] }, style]}>
      {/* Racket Head - oval shape */}
      <View style={styles.racketHead}>
        {/* String grid horizontal lines */}
        <View style={[styles.stringLine, styles.stringH1]} />
        <View style={[styles.stringLine, styles.stringH2]} />
        <View style={[styles.stringLine, styles.stringH3]} />
        <View style={[styles.stringLine, styles.stringH4]} />
        {/* String grid vertical lines */}
        <View style={[styles.stringLine, styles.stringV1]} />
        <View style={[styles.stringLine, styles.stringV2]} />
        <View style={[styles.stringLine, styles.stringV3]} />
        <View style={[styles.stringLine, styles.stringV4]} />
      </View>
      {/* Neck / throat */}
      <View style={styles.racketNeck} />
      {/* Handle */}
      <View style={styles.racketHandle} />
      {/* Grip end cap */}
      <View style={styles.racketGrip} />
    </View>
  );
};

const TennisRackets = ({ size = 120, color = COLORS.burgundy, accentColor = COLORS.gold }) => {
  const scale = size / 120;

  const dynamicStyles = StyleSheet.create({
    wrapper: {
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
    },
    racketContainer: {
      position: 'absolute',
      alignItems: 'center',
    },
    racketHead: {
      width: 44 * scale,
      height: 54 * scale,
      borderRadius: 22 * scale,
      borderWidth: 3 * scale,
      borderColor: color,
      overflow: 'hidden',
      backgroundColor: 'transparent',
    },
    stringLine: {
      position: 'absolute',
      backgroundColor: accentColor,
      opacity: 0.6,
    },
    stringH1: {
      width: 40 * scale,
      height: 1 * scale,
      left: 2 * scale,
      top: 14 * scale,
    },
    stringH2: {
      width: 40 * scale,
      height: 1 * scale,
      left: 2 * scale,
      top: 21 * scale,
    },
    stringH3: {
      width: 40 * scale,
      height: 1 * scale,
      left: 2 * scale,
      top: 28 * scale,
    },
    stringH4: {
      width: 40 * scale,
      height: 1 * scale,
      left: 2 * scale,
      top: 35 * scale,
    },
    stringV1: {
      width: 1 * scale,
      height: 50 * scale,
      left: 10 * scale,
      top: 2 * scale,
    },
    stringV2: {
      width: 1 * scale,
      height: 50 * scale,
      left: 16 * scale,
      top: 2 * scale,
    },
    stringV3: {
      width: 1 * scale,
      height: 50 * scale,
      left: 22 * scale,
      top: 2 * scale,
    },
    stringV4: {
      width: 1 * scale,
      height: 50 * scale,
      left: 28 * scale,
      top: 2 * scale,
    },
    racketNeck: {
      width: 16 * scale,
      height: 10 * scale,
      backgroundColor: color,
      borderBottomLeftRadius: 4 * scale,
      borderBottomRightRadius: 4 * scale,
    },
    racketHandle: {
      width: 9 * scale,
      height: 32 * scale,
      backgroundColor: color,
      borderRadius: 3 * scale,
    },
    racketGrip: {
      width: 11 * scale,
      height: 6 * scale,
      backgroundColor: accentColor,
      borderRadius: 3 * scale,
    },
  });

  return (
    <View style={dynamicStyles.wrapper}>
      {/* Left racket — rotated left */}
      <View style={[dynamicStyles.racketContainer, { transform: [{ rotate: '-30deg' }] }]}>
        <View style={dynamicStyles.racketHead}>
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringH1]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringH2]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringH3]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringH4]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringV1]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringV2]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringV3]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringV4]} />
        </View>
        <View style={dynamicStyles.racketNeck} />
        <View style={dynamicStyles.racketHandle} />
        <View style={dynamicStyles.racketGrip} />
      </View>

      {/* Right racket — rotated right */}
      <View style={[dynamicStyles.racketContainer, { transform: [{ rotate: '30deg' }] }]}>
        <View style={dynamicStyles.racketHead}>
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringH1]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringH2]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringH3]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringH4]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringV1]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringV2]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringV3]} />
          <View style={[dynamicStyles.stringLine, dynamicStyles.stringV4]} />
        </View>
        <View style={dynamicStyles.racketNeck} />
        <View style={dynamicStyles.racketHandle} />
        <View style={dynamicStyles.racketGrip} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TennisRackets;
