import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from "axios"

export default class MeteorScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            meteors: {}
        }
    }


    getMeteors =()=>{
        axios
        .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=UEG79o7VuN1AvC2nm6N7ze0clLmLOUaAHrKej06i")
        .then(response =>{
            this.setState({
                meteors: response.data.near_earth_objects
            });
         console.log(this.state.meteors)
        })

        .catch(error=>{
            console.log(error.message)
        })

       
    }

    componentDidMount(){
        this.getMeteors()
       
        
    }
   

    render() {
        if(Object.keys(this.state.meteors).length === 0){
            return(
                <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>Carregando...</Text>
                </View> 
            )
        }
        else{
            let meteors_arr = Object.keys(this.state.meteors).map( meteors_date =>{
                return this.state.meteors[meteors_date]
            })

            let meteor = [].concat.apply([], meteors_arr)

            meteor.forEach(element => {
                let diameter = (
                                 element.estimated_diameter.kilometers.estimated_diameter_min +
                                 element.estimated_diameter.kilometers.estimated_diameter_max
                               ) / 2

        
                  let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                  element.threat_score = threatScore
            });

            meteor.sort( function (a,b){
                return b.threat_score - a.threat_score
            })

            meteor.slice (0,5)

            console.log(meteor)

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
