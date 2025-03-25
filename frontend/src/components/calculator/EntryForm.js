import React from 'react';
import { MetricForm } from './MetricForm';
import { ImperialForm } from './ImperialForm';
import { ActivityLevel } from './ActivityLevel';
import { Result } from './Result';

export class EntryForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            age: '', gender: '', weight: '', activity: '', height: '', measurement: '',
            measurementSelected: false, result: '', showResult: false, resultForm: ''
        };
        this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.changeWeight = this.changeWeight.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.changeActivity = this.changeActivity.bind(this);
        this.getCalories = this.getCalories.bind(this);
        this.validEntry = this.validEntry.bind(this);
    }

    handleMeasurementChange(event) {
        this.setState({
            measurement: event.target.value, measurementSelected: true
        });
    }

    changeGender(event) {
        this.setState({
            gender: event.target.value
        });
    }

    changeWeight(newWeight) {
        this.setState({
            weight: newWeight
        });
    }

    changeAge(newAge) {
        this.setState({
            age: newAge
        });
    }

    changeHeight(newHeight) {
        this.setState({
            height: newHeight
        });
    }

    changeActivity(newActivity) {
        this.setState({
            activity: newActivity
        });
    }

    validEntry() {
        // Check that all input fields are valid before getting result
        let fields = [this.state.gender, this.state.age, this.state.weight, this.state.height, this.state.activity];
        var i;

        // check that any of the fields arent empty 
        for (i in fields) {
            if (fields[i].length === 0) {
                return false;
            }
        }

        // check each field is in a valid range
        if (this.state.age < 0 || this.state.age > 120) {
            return false;
        }
        if (this.state.weight < 0) {
            return false;
        }
        if (this.state.height < 0) {
            return false;
        }

        return true;
    }

    getCalories(event) {
        if (this.validEntry()) {
            this.setState({
                showResult: true,
                resultForm: <Result calories={this.calculateCalories()} measurementType={this.state.measurement} />
            });
        } else {
            alert("Please make sure that you have entered valid information in every field.");
        }

    }

    // Calculate BMR from form data using Harris-Benedict Equation
    calculateCalories() {
        let bmr = 0;
        // use equation to get bmr (calroies burned at rest)
        if (this.state.gender === 'male') {
            bmr = 66.473 + (13.75116 * this.state.weight) + (5.033 * this.state.height) - (6.755 * this.state.age);
        } else {
            bmr = 655.0955 + (9.5634 * this.state.weight) + (1.8496 * this.state.height) - (4.6756 * this.state.age);
        }
        // adjust bmr according to activity level
        switch (this.state.activity) {
            case 'none':
                bmr = bmr * 1.2;
                break;
            case 'light':
                bmr = bmr * 1.375;
                break;
            case 'moderate':
                bmr = bmr * 1.55;
                break;
            case 'heavy':
                bmr = bmr * 1.725;
                break;
            case 'v-heavy':
                bmr = bmr * 1.9;
                break;
        }
        return Math.round(bmr);
    }


    render() {
        return (
            <div>
                <div className="z-0 m-5 border-4 border-slate-700 rounded p-5 text-white">
                    <form>
                        <h1 className='text-2xl flex flex-row'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M6.32 1.827a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V4.757c0-1.47 1.073-2.756 2.57-2.93ZM7.5 11.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H8.25Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75H8.25Zm1.748-6a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.007Zm-.75 3a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.007Zm1.754-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.008Zm1.748-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-8.25-6A.75.75 0 0 1 8.25 6h7.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75v-.75Zm9 9a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-2.25Z" clipRule="evenodd" />
                            </svg>
                            Calorie Calculator
                        </h1>
                        <p className='my-5'>Select unit of measurement:</p>
                        <div className="my-5 flex gap-5">
                            <input type="radio" id="metric" value="metric" checked={this.state.measurement === "metric"} onChange={this.handleMeasurementChange} />
                            <label for="metric">Metric (kg/cm)</label>
                            <input type="radio" id="imperial" value="imperial" checked={this.state.measurement === "imperial"} onChange={this.handleMeasurementChange} />
                            <label for="female">Imperial (lbs/feet+inches)</label>
                        </div>

                        <div className='flex flex-col my-5'>
                            <label for='gender'>Gender</label>
                            <select name='gender' id='gender' className="bg-slate-950 my-5" onChange={this.changeGender}>
                                <option value="" disabled selected>Select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        {this.state.measurement === 'metric' && <MetricForm weightChange={this.changeWeight} ageChange={this.changeAge} heightChange={this.changeHeight} />}
                        {this.state.measurement === 'imperial' && <ImperialForm weightChange={this.changeWeight} ageChange={this.changeAge} heightChange={this.changeHeight} />}
                        {this.state.measurementSelected && <ActivityLevel onChange={this.changeActivity} />}
                        {this.state.measurementSelected &&
                            <button type="button" className="btn btn-primary" id="calculate-btn" onClick={this.getCalories}>Calculate my calories</button>}
                    </form>
                </div>
                <div >
                    {this.state.showResult && this.state.resultForm}
                </div>

            </div>
        );
    }
}