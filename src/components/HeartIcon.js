import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const HeartIcon = ({ size = 16, color = COLORS.gold, style }) => {
  return (
    <Text style={[styles.heart, { fontSize: size, color }, style]}>♥</Text>
  );
};

const styles = StyleSheet.create({
  heart: {
    fontFamily: 'System',
  },
});

export default HeartIcon;
