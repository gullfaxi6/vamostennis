import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { FONTS, SIZES } from '../constants/typography';

const TABS = [
  {
    name: 'Home',
    label: 'Accueil',
    iconActive: 'home',
    iconInactive: 'home-outline',
  },
  {
    name: 'Events',
    label: 'Événements',
    iconActive: 'calendar',
    iconInactive: 'calendar-outline',
  },
  {
    name: 'Community',
    label: 'Communauté',
    iconActive: 'people',
    iconInactive: 'people-outline',
  },
  {
    name: 'Profile',
    label: 'Profil',
    iconActive: 'person',
    iconInactive: 'person-outline',
  },
];

const BottomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      {state.routes.map((route, index) => {
        const tab = TABS.find((t) => t.name === route.name);
        if (!tab) return null;

        const isFocused = state.index === index;
        const color = isFocused ? COLORS.burgundy : COLORS.textSecondary;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={tab.label}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.8}
            style={styles.tabItem}
          >
            <Ionicons
              name={isFocused ? tab.iconActive : tab.iconInactive}
              size={22}
              color={color}
            />
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
            {isFocused && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.cream,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.gold,
    height: 70,
    paddingTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.darkBrown,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabLabel: {
    fontFamily: FONTS.sans,
    fontSize: SIZES.xs,
    marginTop: 3,
    letterSpacing: 0.3,
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    width: 24,
    height: 2,
    backgroundColor: COLORS.burgundy,
    borderRadius: 1,
  },
});

export default BottomTabBar;
