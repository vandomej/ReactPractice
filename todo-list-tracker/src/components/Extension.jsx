import React, { Component } from 'react';

/* Javascript Objects */

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function toCelsius(f) {
    return (f - 32) * (5 / 9);
}

function toFahrenheit(celsius) {
    return (celsius * (9 / 5)) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }

    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

////////////////////////

/* 2nd Level Subfunctions */

        function BoilingVerdict(props) {
            if(props.celsius >= 100) {
                return <p>The water would boil.</p>
            }
            return <p>The water would not boil.</p>
        }

        class TemperatureInput extends Component {
            constructor(props) {
                super(props);
                this.handleChange = this.handleChange.bind(this);
            }

            handleChange(e) {
                this.props.onTemperatureChange(e.target.value);
            }

            render() {
                const { temperature, scale } = this.props;

                return (
                    <fieldset>
                        <legend>Enter temperature in {scaleNames[scale]}:</legend>
                        <input
                            value={temperature}
                            onChange={this.handleChange} />
                    </fieldset>
                );
            }
        }

////////////////////////////

/* 1st Level Subfunctions */

    class Calculator extends Component {
        constructor(props) {
            super(props);
            this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
            this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
            this.state = {temperature: '', scale: 'c'};
        }

        handleCelsiusChange(temperature) {
            this.setState({scale: 'c', temperature});
        }

        handleFahrenheitChange(temperature) {
            this.setState({scale: 'f', temperature});
        }

        render() {
            const { scale, temperature } = this.state;
            const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
            const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

            return (
                <div>
                    <TemperatureInput 
                        scale="c"
                        temperature={celsius}
                        onTemperatureChange={this.handleCelsiusChange} />
                    <TemperatureInput 
                        scale="f"
                        temperature={fahrenheit}
                        onTemperatureChange={this.handleFahrenheitChange} />
                    <BoilingVerdict
                        celsius={parseFloat(celsius)} />
                </div>
            );
        }
    }

////////////////////////////

function Extension(props) {
    return (
        <Calculator />
    );
}

export default Extension;