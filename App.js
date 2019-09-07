import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, Button } from 'react-native'
// import { createStackNavigator, createAppContainer } from "react-navigation";
import _ from "lodash"
// import Card from './pages/Card'

import { createStackNavigator, createAppContainer } from "react-navigation";
import {createBottomTabNavigator} from 'react-navigation-tabs';

import icon from "./assets/icon.png";
// import gambar1 from "./assets/satu.png";
import gambar2 from "./assets/dua.png";
import { ScrollView } from 'react-native-gesture-handler';

class App extends Component {
  state = {
    text: [],
    data: [
        {
            nama: 'Pondok Programmer',
            gambar : "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80"
        },
        {
            nama: 'Pondok Koki',
            gambar : "https://images.unsplash.com/photo-1488992783499-418eb1f62d08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=853&q=80"
        },
        {
            nama: 'Pondok Multimedia',
            gambar : "https://images.unsplash.com/photo-1551302175-952301267d19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
        }]
  }
  renderItems = ({ item, index }) => {
      const {nama}=item
      const {gambar}=item
      return(
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Details', {
          text: "Detail Page",
          imagenya: {gambar}
          })}>
          <View style={{flexDirection:'column',padding:10}}>
              <View style={{flexDirection:'row',marginBottom:20}}>
                  <Image source={icon} style={{width:50,height:50,borderRadius:50}}/>  
                  <Text style={{fontSize:20,paddingLeft:10}}>{nama}</Text>
              </View>
              <Image source={{uri: gambar}} style={{width:'100%',height:200}} />
          </View>
        </TouchableOpacity>
      )
  }
  render() {
    return (
      <View>
        <View style={{backgroundColor:"#CECECE", height:60}}>
          <Text style={{fontSize:35, textAlign:"center",lineHeight:60,color:"#969696"}}>Header</Text>
        </View>
        <ScrollView>
          <FlatList
            data={_.take(this.state.data,2)}
            keyExtractor={item => item.toString()}
            renderItem={this.renderItems}
          />
        </ScrollView>
      </View>
    )
  }
}

class Flastlist extends Component {
  
  state = {
    data: []
  }
  test = () => {
      if (_.isEmpty(this.state.data)) {
          alert('data ini kosong')
      }
      else {
          alert('data ini ada')
      }
  }
  render() {
    return (
      <View>
        <View style={{backgroundColor:"#CECECE", height:60}}>
          <Text style={{fontSize:35, textAlign:"center",lineHeight:60,color:"#969696"}}>Header</Text>
        </View>
        <Button 
        title="Cek Data"
        onPress={() => this.test()}/>
      </View>
    )
  }
}

class DetailsScreen extends Component {
  render(){
    const { navigation } = this.props;
    const judul = navigation.getParam('text', 'No Title');
    // const gambar = navigation.getParam('imagenya','No Image').toString();
    return(
      <View>
          <Image 
              style={{width:"100%", height:200, paddingBottom:20}}
              source={gambar2}
          />
          <Text style={{textAlign:"center",fontSize:30}}>{judul}</Text>
            
      </View>
    )
  }
}


const TopNav = createBottomTabNavigator({
  Home: {
    screen: App,
  },
  Lodash: Flastlist,
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: TopNav,
    navigationOptions:()=>({
      header:null
    })
  },
  Details: DetailsScreen,
});

export default createAppContainer(AppNavigator);