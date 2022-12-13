import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Image, Alert, Pressable } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Search({ navigation, route }) {

  const [data, setData] = useState([]);
  const [keyWord, setKeyWord] = useState("");

  const searchItem = () => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=" + keyWord)
    .then(response => response.json())
    .then(data => setData(data.items))
    .catch(err => Alert.alert("Error", err))
    console.log(data)
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
      <View style={styles.container}>
        <View style={styles.listcontainer}>
        <TextInput
          style={{fontSize: 18, width: 200, borderColor: "gray",
          borderWidth: 1}}
          placeholder="Book name"
          onChangeText={text => setKeyWord(text)}
        />
        <Pressable style={styles.button} onPress={searchItem}>
          <Text style={styles.text}>Search</Text>
        </Pressable>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => <View style={styles.container}>
          <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '30%', paddingLeft: 10 }}>
          <Image resizeMode='contain' style={{ width: 100, height: 150}}
            source={{ uri:item.volumeInfo.imageLinks.smallThumbnail }}
          />
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '70%' }}>
          <Text style={{fontSize:18}}>{item.volumeInfo.title}</Text>
          <Text>{item.volumeInfo.authors}</Text>
          <Text>{item.volumeInfo.publishedDate}</Text>
          <Stars
            disabled={true}
            half={true}
            default={item.volumeInfo.averageRating}
            starSize={50}
            fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
            emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
            halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}/>
            <Text onPress={() => navigation.navigate( 'DescriptionScreen', {data:item})}>
              {<Icon color="#007aff" size="20" name={'dots-horizontal'}/>}
            </Text>
          </View>
          </View>
          </View>
          }
          ItemSeparatorComponent={listSeparator} 
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
  },
  listcontainer: {
   flexDirection: 'row',
   backgroundColor: '#fff',
   alignItems: 'center'
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
 },
 text: {
   fontSize: 16,
   lineHeight: 21,
   fontWeight: 'bold',
   letterSpacing: 0.25,
   color: '#007aff',
 },
 description: {
   flex: 1,
   backgroundColor: '#fff',
   padding: "2%"
 }
 });