import axios from "axios";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";

export default class MeteorScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            meteors: {}
        }
    }
   

    getMeteors =()=>{
        axios.get("http://api.nasa.gov/neo/rest/v1/neo/3542519?api_key=UEG79o7VuN1AvC2nm6N7ze0clLmLOUaAHrKej06i")
        .then(response =>{
            this.setState({
                meteors: response.data.near_earth_objects
            })
        })

        .catch(error =>{
            console.log(error.message)
        })
    }


    componentDidMount(){
        this.getMeteors()
    }


    render() {
        if(Object.keys(this.state.meteors).length == 0){
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Carregando...</Text>
                </View>
            )
        } else{
            let meteors_arr = Object.keys(this.state.meteors).map(meteors_date =>{
                return this.state.meteors[meteors_date]
            })

            let meteor = [].concat.apply([],meteors_arr);

            meteor.forEach( element =>{
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min +
                                element.estimated_diameter.kilometers.estimated_diameter_max) / 2 

               let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometer) * 1000000000
               element.threat_score = threatScore
            })

            meteor.sort( function(a,b){
                return b.threat_score - a.threat_score
            })

            meteor.slice(0,5);

            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Tela dos Meteoros!</Text>
                </View>
            )
        } 
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    titleBar: {
      flex: 0.15,
      justifyContent: "center",
      alignItems: "center"
    },
    titleText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "white"
    },
    meteorContainer: {
      flex: 0.85
    },
    listContainer: {
      backgroundColor: 'rgba(52, 52, 52, 0.5)',
      justifyContent: "center",
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
      borderRadius: 10,
      padding: 10
    },
    cardTitle: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: "bold",
      color: "white"
    },
    cardText: {
      color: "white"
    },
    threatDetector: {
      height: 10,
      marginBottom: 10
    },
    gifContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1
    },
    meteorDataContainer: {
      justifyContent: "center",
      alignItems: "center",
  
    },
    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }
  });

  
