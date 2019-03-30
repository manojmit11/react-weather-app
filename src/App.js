import React from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = '0ed3f7b5f14c52b036282cd02a384bd0';

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined,
        errorMessage: undefined
    };
    handleErrorScenario = (errorMessage) => {
        this.setState({
            error: true,
            errorMessage: errorMessage
        });
    };
    handleSuccessScenario = (data) => {
        this.setState({
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            error: false,
            errorMessage: ''
        });
    };
    getWeather = async (e, error) => {
        if (error) {
            this.handleErrorScenario('Invalid Input');
        } else {
            const city = e.target.elements.city.value;
            const country = e.target.elements.country.value;
            const API_CALL = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
            const data = await API_CALL.json();
            console.log(data);
            if( data.cod !== '404') {
                this.handleSuccessScenario(data);
            } else {
                this.handleErrorScenario(data.message);
            }
        }
    };

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-5 title-container">
                                    <Title/>
                                </div>
                                <div className="col-xs-7 form-container">
                                    <Form getWeather={this.getWeather} error={this.state.error} errorMessage={this.state.errorMessage}/>
                                    <Weather
                                        temperature={this.state.temperature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                        error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
