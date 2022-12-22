import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import playersData from '../assets/data.json';

const PlayerView = ({navigation, route}) => {
  const selectedPlayers = route?.params?.selectedPlayers;

  return (
    <View>
      {selectedPlayers.map((item, index) => {
        return <Text key={index}>{item}</Text>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default PlayerView;
