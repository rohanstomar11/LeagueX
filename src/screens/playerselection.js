import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import playersData from '../assets/data.json';
import {COLORS} from '../assets/colors';
import {coin} from '../assets/images/index';

const width = Dimensions.get('screen').width;

const PlayerSelection = ({navigation}) => {
  const [credits, setCredits] = useState(100);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [batsmanCount, setBatsmanCount] = useState(0);
  const [wicketKeeperCount, setWicketKeeperCount] = useState(0);
  const [allRounderCount, setAllRounderCount] = useState(0);
  const [bowlerCount, setBowlerCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage2, setErrorMessage2] = useState(false);
  const [teamCount1, setTeamCount1] = useState(0);
  const [teamCount2, setTeamCount2] = useState(0);

  useEffect(() => {
    if (selectedPlayers.length === 11) {
      if (teamCount1 <= 7 && teamCount2 <= 7) {
        if (batsmanCount >= 3 && wicketKeeperCount >= 1 && bowlerCount >= 3) {
          setButtonDisabled(false);
          setErrorMessage('');
          setErrorMessage2(false);
        } else {
          if (batsmanCount < 3) {
            setButtonDisabled(true);
            setErrorMessage(' Please Select Atleast 3 Batsman');
          } else if (wicketKeeperCount < 1) {
            setButtonDisabled(true);
            setErrorMessage(' Please Select Atleast 1 Wicket Keeper');
          } else if (bowlerCount < 3) {
            setButtonDisabled(true);
            setErrorMessage(' Please Select Atleast 3 Bowlers');
          } else {
            setErrorMessage('');
          }
        }
      } else {
        setErrorMessage2(true);
      }
    } else {
      setButtonDisabled(true);
    }
    if (teamCount1 >= 7 || teamCount2 >= 7) {
      setErrorMessage2(true);
    } else {
      setErrorMessage2('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlayers]);

  const PlayerCard = ({data, disabled, onPress, count}) => {
    return (
      <TouchableOpacity
        disabled={selectedPlayers.includes(data.player_id) ? false : disabled}
        activeOpacity={1}
        onPress={() => {
          if (data.team_short_name === 'MS') {
            setTeamCount1(teamCount1 - 1);
          } else {
            setTeamCount2(teamCount2 - 1);
          }
          if (selectedPlayers.includes(data.player_id)) {
            setSelectedPlayers(players => {
              setCredits(credits + parseInt(data.event_player_credit, 10));
              onPress(count - 1);
              return players.filter((value, i) => value !== data.player_id);
            });
          } else {
            if (data.team_short_name === 'MS') {
              setTeamCount1(teamCount1 + 1);
            } else {
              setTeamCount2(teamCount2 + 1);
            }
            setCredits(credits - parseInt(data.event_player_credit, 10));
            onPress(count + 1);
            setSelectedPlayers(players => [...players, data.player_id]);
          }
        }}
        style={[
          styles.card,
          disabled ? styles.opacity50p : styles.opacity100p,
          selectedPlayers.includes(data.player_id)
            ? styles.borderGreen
            : styles.borderGrey,
        ]}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: data.team_logo}}
            style={[
              styles.cardLogo,
              selectedPlayers.includes(data.player_id)
                ? styles.borderGreen
                : styles.borderGrey,
            ]}
          />
          <Text style={styles.text}>{data.name}</Text>
          <Text style={styles.text}>{data.role}</Text>
          <Text style={styles.text}>{data.event_player_credit} credits</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://leaguex.com/_next/image?url=%2Fimg%2Flogos%2Flx_logo.png&w=3840&q=75',
          }}
          resizeMode={'contain'}
          style={styles.image}
        />
        <Text style={styles.headerText}>{selectedPlayers.length}/11</Text>
        <View style={styles.creditsContainer}>
          <Text style={styles.headerText}>{credits}</Text>
          <Image source={coin} style={styles.size30} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flex}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <Text style={[styles.roleHeading, styles.margin0]}>
          Batsman{' '}
          <Text
            style={[
              styles.hint,
              {color: batsmanCount < 3 ? COLORS.red : COLORS.grey},
            ]}>
            {batsmanCount < 3 ? '(Select Atleast 3)' : 'Max Limit: 7'}
          </Text>
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          horizontal>
          {playersData.map((item, index) => {
            if (item.role !== 'Batsman') {
              return null;
            }
            return (
              <PlayerCard
                data={item}
                key={index}
                disabled={
                  batsmanCount >= 7 || credits < item.event_player_credit
                }
                onPress={setBatsmanCount}
                count={batsmanCount}
              />
            );
          })}
        </ScrollView>
        <Text style={styles.roleHeading}>
          Wicket-Keeper{' '}
          <Text
            style={[
              styles.hint,
              {color: wicketKeeperCount < 1 ? COLORS.red : COLORS.grey},
            ]}>
            {wicketKeeperCount < 1 ? '(Select Atleast 1)' : 'Max Limit: 5'}
          </Text>
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          horizontal>
          {playersData.map((item, index) => {
            if (item.role !== 'Wicket-Keeper') {
              return null;
            }
            return (
              <PlayerCard
                data={item}
                key={index}
                disabled={
                  wicketKeeperCount >= 5 || credits < item.event_player_credit
                }
                onPress={setWicketKeeperCount}
                count={wicketKeeperCount}
              />
            );
          })}
        </ScrollView>
        <Text style={styles.roleHeading}>
          All-Rounder <Text style={styles.hint}>Max Limit: 4</Text>
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          horizontal>
          {playersData.map((item, index) => {
            if (item.role !== 'All-Rounder') {
              return null;
            }
            return (
              <PlayerCard
                data={item}
                key={index}
                disabled={
                  allRounderCount >= 4 || credits < item.event_player_credit
                }
                onPress={setAllRounderCount}
                count={allRounderCount}
              />
            );
          })}
        </ScrollView>
        <Text style={styles.roleHeading}>
          Bowler{' '}
          <Text
            style={[
              styles.hint,
              {color: bowlerCount < 3 ? COLORS.red : COLORS.grey},
            ]}>
            {bowlerCount < 3 ? '(Select Atleast 3)' : 'Max Limit: 7'}
          </Text>
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          horizontal>
          {playersData.map((item, index) => {
            if (item.role !== 'Bowler') {
              return null;
            }
            return (
              <PlayerCard
                data={item}
                key={index}
                disabled={
                  bowlerCount >= 7 || credits < item.event_player_credit
                }
                onPress={setBowlerCount}
                count={bowlerCount}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
      {errorMessage2 === true && (
        <Text style={styles.errorMessage2}>
          Cannot Select more than 7 Players From a Team
        </Text>
      )}
      <TouchableOpacity
        disabled={buttonDisabled}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('PlayerViewScreen', {
            selectedPlayers: selectedPlayers,
          });
        }}
        style={[
          styles.button,
          buttonDisabled ? styles.opacity50p : styles.opacity100p,
        ]}>
        <Text style={styles.buttonText}>COMPLETE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  flex: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  scrollView: {height: 120, paddingLeft: 16},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: COLORS.background,
  },
  size30: {height: 30, width: 30},
  headerText: {color: '#FFFFFF', fontWeight: '700', fontSize: 17},
  image: {
    height: '100%',
    width: '25%',
  },
  creditsContainer: {flexDirection: 'row', alignItems: 'center'},
  card: {
    height: '100%',
    width: 120,
    borderWidth: 2,
    borderRadius: 15,
    paddingTop: 15,
    marginRight: 16,
  },
  cardLogo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  roleHeading: {
    marginLeft: 16,
    marginTop: 20,
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  hint: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  text: {
    color: COLORS.text,
    fontWeight: '600',
    fontSize: 12,
  },
  button: {
    width: width - 32,
    position: 'absolute',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    bottom: 20,
    left: 16,
    borderRadius: 12,
  },
  errorMessage: {
    alignSelf: 'center',
    fontSize: 14,
    color: COLORS.red,
    paddingTop: 4,
  },
  errorMessage2: {
    position: 'absolute',
    bottom: 0,
    color: COLORS.red,
    alignSelf: 'center',
    fontWeight: '500',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 16,
  },
  opacity100p: {
    opacity: 1,
  },
  opacity50p: {
    opacity: 0.5,
  },
  margin0: {marginTop: 0},
  borderGreen: {
    borderColor: COLORS.green,
  },
  borderGrey: {
    borderColor: COLORS.grey,
  },
});

export default PlayerSelection;
