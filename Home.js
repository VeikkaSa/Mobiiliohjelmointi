import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, FlatList, Pressable, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth } from './firebase';

const db = SQLite.openDatabase('coursedb.db');

export default function Home({navigation, route}) {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists booklist (id integer primary key not null, name text, year text, rating text);');
    }, null, updateList); 
  }, []);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists favoritebooks (id integer primary key not null, name text, year text, rating text);');
    }, null, updateFavorites); 
  }, []);

  // Save book
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into booklist (name, year, rating) values (?, ?, ?);', [name, year, rating]);    
      }, null, updateList
    )
    setName("")
    setRating("")
    setYear("")
  }

  // Save favorite
  const saveFavorite = (id, name, year, rating) => {
    if (favorites.filter(e => e.id === id).length > 0) {
      db.transaction(
        tx => {
          tx.executeSql(`delete from favoritebooks where id = ?;`, [id]);
        }, null, updateFavorites
      )      
    } else {
      db.transaction(tx => {
        tx.executeSql('insert into favoritebooks (id, name, year, rating) values (?, ?, ?, ?);', [id, name, year, rating]);    
      }, null, updateFavorites
      )
    }
    console.log(favorites)
  }

  // Update booklist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from booklist;', [], (_, { rows }) =>
        setBooks(rows._array)
      ); 
    });
  }

  // Update favorites
  const updateFavorites = () => {
    db.transaction(tx => {
      tx.executeSql('select * from favoritebooks;', [], (_, { rows }) =>
        setFavorites(rows._array)
      ), null;
    });
  }

  // Delete book
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from booklist where id = ?;`, [id]);
      }, null, updateList
    )  
    db.transaction(
      tx => {
        tx.executeSql(`delete from favoritebooks where id = ?;`, [id]);
      }, null, updateFavorites
    )      
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }

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

  const image = { uri: "https://reactjs.org/logo-og.png" };

  return (
    <View style={styles.container}>
      <View style={{ flex: 2, width: '100%' }}>
      <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingTop: 30 }}>
      <Text
        onPress={handleSignOut}
        style={{ padding: '5%', color:"#007aff", fontSize: 16, lineHeight: 21, fontWeight: 'bold',letterSpacing: 0.25, justifyContent: 'center' }}
      > {<Icon size="20" name={'logout'} style={{color: '#007aff'}}/>}
        Log out
      </Text>
      <Text style={{ padding: '5%', color:"#007aff", fontSize: 16, lineHeight: 21, fontWeight: 'bold',letterSpacing: 0.25, justifyContent: 'center' }} 
        onPress={() => navigation.navigate( 'Favorites', {data:favorites})}>
        {<Icon size="20" name={'heart'} style={{color: '#007aff'}}/>}
           Favorites   
      </Text>
      <Text style={{ padding: '5%', color:"#007aff", fontSize: 16, lineHeight: 21, fontWeight: 'bold',letterSpacing: 0.25, justifyContent: 'center' }} 
        onPress={() => navigation.navigate( 'Search')}>
        {<Icon size="20" name={'search-web'} style={{color: '#007aff'}}/>}
           Search   
      </Text>
      </View>
      <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBackground source={image} resizeMode='cover' style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        </ImageBackground>
      </View>
      <View style={{ flex: 4 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Text style={{fontSize: 20, fontWeight: "bold"}}>Rate a book</Text>
      <TextInput placeholder='Book name' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(name) => setName(name)}
        value={name}/>  
      <TextInput keyboardType={"number-pad"} placeholder='Published (year)' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(year) => setYear(year)}
        value={year}/>    
      <Stars
        default={0}
        update={(rating) => setRating(rating)}
        count={5}
        spacing={4}
        half={false}
        starSize={50}
        fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
        emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
      />
      <Pressable style={styles.button} onPress={saveItem}>
        <Text style={styles.text}>Save</Text>
      </Pressable> 
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <FlatList 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{marginLeft: "5%"}}
        keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <View style={styles.listcontainer}>
        <Text style={{fontSize: 18}}>Name: {item.name}, Published: {item.year}</Text> 
        <Stars
          disabled={true}
          half={false}
          default={item.rating}
          starSize={50}
          fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
          emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}/>
        <Text style={{padding: 3}} onPress={() => saveFavorite(item.id, item.name, item.year, item.rating)}>{<Icon size="20" name={'heart'} style={[styles.myFullHeartStyle]}/>}</Text>
        <Text style={{paddingRight: 3}} onPress={() => deleteItem(item.id)}>{<Icon size="20" name={'trash-can-outline'}/>}</Text></View>} 
        data={books} 
        ItemSeparatorComponent={listSeparator} 
      /> 
      </View>
      <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loggen in as: {auth.currentUser?.email}</Text>
      </View>
      </View>
      </View>
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
   myFullHeartStyle: {
     color: 'red',
   },
   text: {
     fontSize: 16,
     lineHeight: 21,
     fontWeight: 'bold',
     letterSpacing: 0.25,
     color: '#007aff',
   }
});