import React,{Component} from "react";
import './css/style.css';



// components
import Form from "./components/Form";
import Weather from "./components/Weather";
import Error from "./components/Error";
import Loading from "./components/Loading";

const API_KEY = 'c23b7fd08aef347098dd37479858ee5b';

export default class App extends Component {


  state = {
    city:'Damascus',
    country:'Syria',
    icon:'',
    temp:0,
    temp_min:0,
    temp_max:0,
    description:'',
    status:false,
    error:false,
    loading:false,
  }



  getData = async (e)=>{e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    this.setState({loading:true})



    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
    const data = await response.json()

    if(response.status == 200)
    {
      this.setState({
        city:city,
        country:country,
        temp:this.convertToSilsious(data.main.temp), 
        temp_min:this.convertToSilsious(data.main.temp_min), 
        temp_max:this.convertToSilsious(data.main.temp_max),
        description:data.weather[0].description,
        icon:data.weather[0].icon,
        status:true,
        error:false,
        loading:false,
      })
    }
    else
    {
      this.setState({error:true,loading:false})
    }
  
  }


  convertToSilsious = (temp)=>{
    return Math.floor(temp - 273.15)     
  }


  render(){
    return (
      <div className="app">
        {/* <div className="overlay"></div> */}
        <Form  getData={this.getData} />
        
        
          {this.state.loading  ? <Loading/> : '' }
          {this.state.error  ? <Error/> : '' }
          {this.state.status  ? <Weather  data={this.state} /> : '' }
      </div>
    );
  }
  
}






