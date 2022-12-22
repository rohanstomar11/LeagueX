import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../assets/colors';

const SplashScreen = ({navigation}) => {
  const timeoutHelper = action => {
    const timer = setTimeout(() => {
      action();
    }, 1500);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    timeoutHelper(() => {
      navigation.replace('PlayerSelectionScreen');
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.flex}>
        <Image
          source={{
            uri: 'https://leaguex.com/_next/image?url=%2Fimg%2Flogos%2Flx_logo.png&w=3840&q=75',
          }}
          resizeMode={'contain'}
          style={styles.image}
        />
        <Text style={styles.upperTitle}>Pick Best Team</Text>
        <Text style={styles.lowerTitle}>WIN REAL MONEY</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 150,
  },
  upperTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '500',
  },
  lowerTitle: {
    color: COLORS.green,
    fontSize: 28,
    fontWeight: '700',
  },
});

export default SplashScreen;
