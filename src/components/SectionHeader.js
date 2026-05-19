import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';

const SectionHeader = ({ title, actionText, onAction, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {actionText && (
        <TouchableOpacity onPress={onAction} activeOpacity={0.8}>
          <Text style={styles.action}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: SIZES.md,
    color: COLORS.darkBrown,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '700',
  },
  action: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.sm,
    color: COLORS.gold,
    fontWeight: '500',
  },
});

export default SectionHeader;
