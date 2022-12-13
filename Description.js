import React from 'react';
import { Text, View, Image, ImageBackground, ScrollView } from 'react-native';

export default function DescriptionScreen({route, navigation}) {
    const { data } = route.params;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Book Details</Text>
        </View>
        <ImageBackground source={{uri: data.volumeInfo.imageLinks.thumbnail}} resizeMode='cover' style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, opacity: 0.3 }}>
        </ImageBackground>
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 5 }}>
        <Image resizeMode='contain' style={{width:120, height:180 }} source={{uri: data.volumeInfo.imageLinks.thumbnail}}/>
        </View>
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>{data.volumeInfo.title}</Text>
          <Text>{data.volumeInfo.authors}</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingVertical: 20, backgroundColor: 'rgba(0, 0, 0, 0.3)', margin: 20, borderRadius: 8}}>
        <View style={{ paddingHorizontal: '10%', alignItems: 'center'}}>
          <Text style={{ fontWeight: '600' }}>{data.volumeInfo.averageRating}</Text>
          <Text>Rating</Text>
        </View>
        <View style={{ paddingHorizontal: '10%', alignItems: 'center'}}>
          <Text style={{ fontWeight: '600' }}>{data.volumeInfo.pageCount}</Text>
          <Text>Pages</Text>
        </View>
        <View style={{ paddingHorizontal: '10%', alignItems: 'center'}}>
          <Text style={{ fontWeight: '600' }}>{data.volumeInfo.language}</Text>
          <Text>Language</Text>
        </View>
        </View>
        </View>
        <ScrollView style={{ flex: 2, padding: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Description</Text>
          <Text>{data.volumeInfo.description}</Text>
        </ScrollView>
      </View>
    );
  }