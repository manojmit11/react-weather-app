import React from "react";
import Title from "./Title";
import Weather from "./Weather";

const Form = props => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.elements.city.value && e.target.elements.country.value) {
            return props.getWeather(e);
        } else {
            return props.getWeather(e, 'INVALID INPUT');
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="city" placeholder="city....."/>
                <input type="text" name="country" placeholder="Country....."/>
                <button>Get Weather</button>
            </form>
            {props.error && <p className="weather__error">Error: {props.errorMessage.toUpperCase()}</p>}
        </div>
    )
};
export default Form;

