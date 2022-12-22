import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import playersData from '../assets/data.json';
import {COLORS} from '../assets/colors';

const PlayerSelection = ({navigation}) => {
  const width = Dimensions.get('screen').width;
  const [credits, setCredits] = useState(100);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  // playersData.forEach(players => {
  //   console.log(players.role);
  // });
  // console.log(selectedPlayers);

  const PlayerCard = ({data}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (selectedPlayers.includes(data.player_id)) {
            setSelectedPlayers(players => {
              return players.filter((value, i) => value !== data.player_id);
            });
          } else {
            setSelectedPlayers(players => [...players, data.player_id]);
          }
        }}
        style={{
          height: '100%',
          width: 120,
          borderColor: selectedPlayers.includes(data.player_id)
            ? COLORS.green
            : COLORS.grey,
          borderWidth: 2,
          borderRadius: 15,
          paddingTop: 15,
          marginRight: 16,
        }}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: data.team_logo}}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              borderWidth: 2,
              borderColor: selectedPlayers.includes(data.player_id)
                ? COLORS.green
                : COLORS.grey,
            }}
          />
          <Text style={{color: '#354354', fontWeight: '600', fontSize: 12}}>
            {data.name}
          </Text>
          <Text style={{color: '#354354', fontWeight: '600', fontSize: 12}}>
            {data.role}
          </Text>
          <Text style={{color: '#354354', fontWeight: '600', fontSize: 12}}>
            {data.event_player_credit}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flex}>
        <Text style={styles.roleHeading}>
          Batsman <Text style={styles.hint}>(Select 3-7 Batsman)</Text>
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{height: 120, paddingLeft: 16}}
          horizontal>
          {playersData.map((item, index) => {
            if (item.role !== 'Batsman') {
              return null;
            }
            return <PlayerCard data={item} key={index} />;
          })}
        </ScrollView>
        <Text style={styles.roleHeading}>
          Wicket-Keeper{' '}
          <Text style={styles.hint}>(Select 1-5 Wicket-Keeper)</Text>
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{height: 120, paddingLeft: 16}}
          horizontal>
          {playersData.map((item, index) => {
            if (item.role !== 'Wicket-Keeper') {
              return null;
            }
            return <PlayerCard data={item} key={index} />;
          })}
        </ScrollView>
        <Text style={styles.roleHeading}>
          All-Rounder <Text style={styles.hint}>(Select 0-4 All-Rounder)</Text>
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{height: 120, paddingLeft: 16}}
          horizontal>
          {playersData.map((item, index) => {
            if (item.role !== 'All-Rounder') {
              return null;
            }
            return <PlayerCard data={item} key={index} />;
          })}
        </ScrollView>
        <Text style={styles.roleHeading}>
          Bowler <Text style={styles.hint}>(Select 3-7 Bowler)</Text>
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{height: 120, paddingLeft: 16}}
          horizontal>
          {playersData.map((item, index) => {
            if (item.role !== 'Bowler') {
              return null;
            }
            return <PlayerCard data={item} key={index} />;
          })}
        </ScrollView>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('PlayerViewScreen', {
            selectedPlayers: selectedPlayers,
          });
        }}
        style={{
          width: width - 32,
          position: 'absolute',
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.background,
          bottom: 20,
          left: 16,
          borderRadius: 12,
          opacity: false ? 0.5 : 1,
        }}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: 20,
            fontWeight: '700',
            marginHorizontal: 16,
          }}>
          COMPLETE
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.bac,
  },
  flex: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  roleHeading: {
    marginLeft: 16,
    marginTop: 20,
    color: '#354354',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  hint: {
    marginTop: 20,
    color: COLORS.grey,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
});

export default PlayerSelection;
