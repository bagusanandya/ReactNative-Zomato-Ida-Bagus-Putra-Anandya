import React, { Component } from 'react';
import axios from 'axios';
import {  Fab, Container,  Header,  Content,  Footer,  Thumbnail,  Text,  Icon,  Button,  Item,  Input,  View,  Card,  CardItem,  List,  ListItem,  Left,  Right,  Body,} from 'native-base';
import { ScrollView, Image }from 'react-native'


class App extends Component{

  constructor(){
    super();
    this.state={food:[],menu:''};
  }

  klik(){
    var src=this.state.menu;
    var url ='https://developers.zomato.com/api/v2.1/search?q='+src;
    var config = {
      headers:{'user-key':'a57e9bc78552a4f504ff51a452143a37'}
    };
    axios.get(url,config).then((ambilData)=>{
      console.log(ambilData.data);
      this.setState({
        food:ambilData.data.restaurants
      })
    })
  }
  
  componentDidMount(){
  }
  render() {
    const data=this.state.food.map((item,index)=>{
      var name=item.restaurant.name;
      var city =item.restaurant.location.city;
      var address =item.restaurant.location.address;
      var prc=item.restaurant.average_cost_for_two;
      var price=prc/2
      var picture = item.restaurant.thumb;
      if (picture==''){
        picture='http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg'
      }
      return( <Card avatar key={index}>
      <CardItem header>
        <Left>
          <Thumbnail source={{uri:picture}}/>
          <Body>
            <Text>{name}</Text>
            <Text note>{city}</Text>
          </Body>
        </Left>
        <Right>
          <Text> Price {price} IDR</Text>
        </Right>
      </CardItem>
      <CardItem cardBody>
        <Image source={{uri:picture}} style={{height:350,width:350,flex:1}}/>
      </CardItem>
      <CardItem footer>
        <Left><Button transparent>
          <Icon name="navigate"/>
          </Button>
          <Text>{address}</Text>
        </Left>
      </CardItem>
      </Card>
      )
    })
    return (
     <Container>
       <Header searchBar rounded>
        <Item>
        <Button transparent onPress={()=>this.klik()}><Icon name="search"/></Button>
          <Input placeholder="Find your favorite dish!" onChangeText={(x)=>{this.setState({menu:x})}} />
          <Icon name="search"/> 
        </Item>
       </Header>
       <ScrollView>
         {data}
       </ScrollView>
     </Container>
    );
  }
}
export default App;