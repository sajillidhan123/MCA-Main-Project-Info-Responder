import React, {  useEffect, useState,Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,Button
} from 'react-native'
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import Voice from '@react-native-community/voice';


import soundImg from './mic.png';
import muteImg from './msg.png';
import { color } from 'react-native-reanimated';



// Initialize the Amazon Cognito credentials provider

AWS.config.region = 'ap-southeast-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: 'ap-southeast-1:68e7183f-933f-4ba5-857f-6c90fecabdcb',
})



let lexRunTime = new AWS.LexRuntime()
let lexUserId = 'mediumBot' + Date.now()

let inputText;

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  messages: {
      flex: 1,
      marginTop: 0,
      backgroundColor: '#E5E7E9'
},

  botMessages: {
      color: 'black',
      backgroundColor: 'white',
      padding: 10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      marginBottom: 0,
      marginLeft:10,
      marginTop:10,
      borderTopRightRadius: 20,
      alignSelf: 'flex-start',
      bottom: 10,
      textAlign: 'left',
      width: '75%',
      fontSize:15
  },
userMessages: {
      backgroundColor: '#307ecc',
      color: 'white',
      padding: 10,
      marginBottom: 10,
      marginRight: 10,
      marginTop:20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: '65%',
      alignSelf: 'flex-end',
      textAlign: 'left',
      fontFamily:'skg100',
      fontSize:15,
  },
textInput: {
      flex: 2,
      paddingLeft: 15,
      color:'white'
  },
  responseContainer : {
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 0,
  },
  inputContainer: {
      flexDirection: 'row',
      backgroundColor: '#307ecc',
      borderRadius:200
  },
  optionsImage:
  {
    display:'none',
    height: 19,

  },

  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
  },
  
})

export default class App extends Component {
  constructor(props) {
      super(props)
  this.state = {
          userInput: '',
          messages: [],
          inputEnabled: true,
          showSoundImg: true,
          recognized: '',
          started: '',
          results: [],
          
      };
      
      Voice.onSpeechStart = this.onSpeechStart.bind(this);
      Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
      Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }



  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    });
  }

  async _startRecognition(e) {

    this.setState({
      recognized: '',
      started: '',
      results: [],
    });

    
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }
   
  



//change msg mic icon
  renderImage()  {
    if (this.state.userInput== "") {
      this.state.showSoundImg = true;
    } else {
      this.state.showSoundImg = false;
    }
  var imgSource = this.state.showSoundImg? soundImg : muteImg;
  return (
    <Image
       style={ StyleSheet.optionsImage}
      source={ imgSource }
    />
  );
}

// Sends Text to the lex runtime
  handleTextSubmit() {
      if (this.state.showSoundImg) {

        <TouchableOpacity
         onPress={this._startRecognition()}>
        </TouchableOpacity>

      } 
        inputText = this.state.userInput.trim()
        if (inputText !== '')
          this.showRequest(inputText)
         
  }
// Populates screen with user inputted message
  showRequest(inputText) {
      // Add text input to messages in state
      let oldMessages = Object.assign([], this.state.messages)
      oldMessages.push({from: 'user', msg: inputText})
      this.setState({
          messages: oldMessages,
          userInput: '',
          inputEnabled: false
      })
      this.sendToLex(inputText)
          
  }
// Responsible for sending message to lex
  sendToLex(message) {
      let params = {
          botAlias: '$LATEST',
          botName: 'MakeUsername',
          inputText: message,
          userId: lexUserId,
      }
      lexRunTime.postText(params, (err, data) => {
          if(err) {
              // TODO SHOW ERROR ON MESSAGES
          }
          if (data) {
              this.showResponse(data)
          }
      })
  }
showResponse(lexResponse) {
      let lexMessage = lexResponse.message
      let oldMessages = Object.assign([], this.state.messages)
      oldMessages.push({from: 'bot', msg: lexMessage})
      this.setState({
          messages: oldMessages,
          inputEnabled: true 
      })
  }




//Chat Screen  
renderTextItem(item) {
      let style,
          responseStyle
      if (item.from === 'bot') {
          style = styles.botMessages
          responseStyle = styles.responseContainer
      } else {
          style = styles.userMessages
          responseStyle = {}
      }
      return (
          <View style={responseStyle}>
              <Text style={style}>{item.msg}</Text>
          </View>
      )
  }
  


  render(){
      return(

          <View 
          style={styles.container}>
              <View style={styles.messages}>
                  <FlatList 
                      data={this.state.messages}
                      renderItem={({ item }) =>    this.renderTextItem(item)}
                      keyExtractor={(item, index) => index}
                      extraData={this.state.messages}
                  />

              </View>


              <View style={styles.inputContainer}>
                  


                  <TextInput
                      onChangeText={(text) => this.setState({userInput: text})}
                      value={this.state.userInput}
                      style={styles.textInput}
                      editable={this.state.inputEnabled}
                      placeholder={'Type here to talk!'}
                    
                      autoFocus={true}
                      onSubmitEditing={this.handleTextSubmit.bind(this)}
                  />
                  
                    <TouchableOpacity 
                    onPress={()=>{this.handleTextSubmit()}}>  
                    {this.renderImage()} 

                    </TouchableOpacity>       
             </View>
             
          </View>
          
      )
  }
}