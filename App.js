import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,Image } from 'react';
import { Header } from 'react-native-elements';
import db from './localdb'
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word: 'Loading...',
      phonicSounds: [],
    };
  }
  render() {
    return (
      <View style={ styles.container }>
        <Header
          backgroundColor={'#ff6600'}
          centerComponent={{
            text: 'Phonic Dictionary',
            style: { color: '#000000', fontSize: 20 },
          }}
        />

        <Image
         style={styles.imageicon}
         source={{
           uri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY6pJdr-D5W0zoEVwwxiF2NcN4E5XW1ZfgpA&usqp=CAU'
         }}
      />

      <TextInput
       style={styles.inputBox}
       onChangeText={text =>{
         this.setState({text: text})
       }}
       value={this.state.text}
       />
       <TouchableOpacity
         style={styles.findButton}
         onPress={() => {
           var word = this.state.text.toLowerCase().trim();
           db[word]?(
           this.setState({ phonicSounds: db[word].phone})  
           ):
           Alert.alert("The words does not exist in our database");
         }}>
         <Text style={styles.buttonText}>Find</Text>
       </TouchableOpacity>
       <View>
          {this.state.phonicSounds.map((item, index)=>{
            return (
              <PhonicSoundButton
               soundChunk={this.state.phonicSounds[index]}
               buttonIndex={index}
               />
             );
          })}
       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFFFFF',
  },
  imageicon: {
    width: 100,
    height: 100,
    marginLeft: 85,
  },
  inputBox: {
    marginTop: 60,
    width: "90%",
    alignSelf: 'center',
    height: 50,
    textAlign:'centre',
    borderWidth: 5,
    outline: 'none' ,
},
findButton: {
  width: "40%",
  height: 45,
  alignSelf: 'center',
  padding: 9,
  margin: 9,
},
buttonText: {
  textAlign: 'centre',
  fontSize: 30,
  fontWeight: 'bold',
}
})