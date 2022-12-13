import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Stars from 'react-native-stars';


export default function Favorites({ route, navigation }) {
    const { data } = route.params;

    const listSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#CED0CE",
          }}
        />
      );
    };
    return (
      <View style={{ backgroundColor:"white", flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 20 }}>Favorites</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
        <Text style={{fontSize: 18}}>Name: {item.name}, Published: {item.year}
         <Stars
          disabled={true}
          half={false}
          default={item.rating}
          starSize={50}
          fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
          emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}/>
        </Text>}
        data={data}
        ItemSeparatorComponent={listSeparator} 
      />
      </View>
    );
  }

const styles = StyleSheet.create({
    myFullHeartStyle: {
      color: 'red',
    },
    myStarStyle: {
      color: 'yellow',
      backgroundColor: 'transparent',
      textShadowColor: 'black',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 2,
    },
    myEmptyStarStyle: {
      color: '#fff',
    }
 });