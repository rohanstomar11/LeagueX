import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import playersData from '../assets/data.json';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const PlayerView = ({navigation, route}) => {
  const width = Dimensions.get('screen').width;
  const selectedPlayersData = playersData.filter(item => {
    return route?.params?.selectedPlayers.some(element => {
      return element === item.player_id && item.player_id === element;
    });
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width,
          paddingHorizontal: 16,
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: COLORS.background,
        }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.pop();
          }}>
          <Icon
            name={'ios-chevron-back-circle-sharp'}
            size={32}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <Image
          source={{
            uri: 'https://leaguex.com/_next/image?url=%2Fimg%2Flogos%2Flx_logo.png&w=3840&q=75',
          }}
          resizeMode={'contain'}
          style={{height: 30, width: '25%'}}
        />
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {selectedPlayersData.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: COLORS.background,
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 6,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: item.team_logo}}
                  style={{
                    height: 32,
                    width: 32,
                    borderRadius: 16,
                  }}
                />
                <Text
                  style={{
                    color: '#354354',
                    marginLeft: 8,
                    fontWeight: '700',
                    fontSize: 20,
                  }}>
                  {item.name}
                </Text>
              </View>
              <Text
                style={{color: COLORS.green, fontSize: 18, fontWeight: '500'}}>
                {item.role}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default PlayerView;
