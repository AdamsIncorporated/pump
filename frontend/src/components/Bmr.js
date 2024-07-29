// https://codesandbox.io/s/calorie-calculator-5tdyb

import React, { Component } from "react";

class Bmr extends Component {
  constructor() {
    super();
    this.state = {
      gender: "",
      weight: "",
      age: "",
      heightFeet: "",
      heightInches: "",
      activity: "",
      bmr: "",
      sugggestion: "",
      pal: "",
      weightType: ""
    };
  }
  handleAgeChange = (event) => {
    this.setState({ age: event.target.value });
  };

  handleWeightChange = (event) => {
    this.setState({ weight: event.target.value });
  };

  handleheightFeetChange = (event) => {
    this.setState({ heightFeet: event.target.value });
  };

  handleheightInchesChange = (event) => {
    this.setState({ heightInches: event.target.value });
  };

  handlegenderChange = (event) => {
    this.setState({ gender: event.target.value });
  };

  handleactivityChange = (event) => {
    this.setState({ activity: event.target.value });
  };

  handleweightTypeChange = (event) => {
    this.setState({ weightType: event.target.value });
  };

  calculateBMR() {
    let age = this.state.age;
    let gender = this.state.gender;
    let heightFeet = this.state.heightFeet;
    let heightInches = this.state.heightInches;
    let weight = this.state.weight;
    let weightType = this.state.weightType;

    if (
      age === "" ||
      gender === "" ||
      heightFeet === "" ||
      heightInches === "" ||
      weight === ""
    ) {
      this.setState({ error: "All Fields are Required" });
      return;
    }

    let bmrCalc = "";
    let height = heightFeet * 30.48 + heightInches * 2.54;
    if (weightType === 1) {
      if (gender === 2) {
        bmrCalc = 66 + 6.2 * weight + 12.7 * height - 6.76 * age;
      } else if (gender === 1) {
        bmrCalc = 655.1 + 4.35 * weight + 4.7 * height - 4.7 * age;
      }
    } else if (weightType === 2) {
      if (gender === 2) {
        bmrCalc = 66.5 + 13.75 * weight + 5.003 * height - 6.755 * age;
      } else if (gender === 1) {
        bmrCalc = 655 + 9.563 * weight + 1.85 * height - 4.676 * age;
      }
    }
    this.setState({ bmr: bmrCalc });

    let activitySug = ";";
    if (bmrCalc <= 1926) {
      activitySug = "Suggestion: little or no exercise.";
    } else if (bmrCalc > 1926 && bmrCalc <= 2207) {
      activitySug = "Suggestion: Exercise 1-3 times/week.";
    } else if (bmrCalc > 2207 && bmrCalc <= 2351) {
      activitySug = "Suggestion: Exercise 4-5 times/week.";
    } else if (bmrCalc > 2351 && bmrCalc <= 2488) {
      activitySug =
        "Suggestion: Daily exercise or intense exercise 3-4 times/week.";
    } else if (bmrCalc > 2488 && bmrCalc <= 2796) {
      activitySug = "Suggestion: Intense exercise 6-7 times/week.";
    } else if (bmrCalc > 2796) {
      activitySug = "Very intense exercise daily, or physical job.";
    }
    this.setState({ sugggestion: "Suggestion: " + activitySug });

    this.setState({ error: "" });
    console.log(this.state.weight);
  }

  calculateKCalories() {
    let resultPAL;
    if (this.state.activity) {
      resultPAL = (
        <div className="resultPAL">{this.state.bmr * this.state.activity}</div>
      );
    }
    this.setState({ pal: resultPAL });
  }

  render() {
    let error;
    if (this.state.error) {
      error = <div className="text-red-800">{this.state.error}</div>;
    }

    let resultBMR;
    if (this.state.bmr) {
      resultBMR = <div className="text-white">{this.state.bmr}</div>;
    }

    let resultSug;
    if (this.state.sugggestion) {
      resultSug = <div className="resultSug">{this.state.sugggestion}</div>;
    }

    let resultPAL;
    if (this.state.pal) {
      resultPAL = <div className="resultSug">{this.state.pal}</div>;
    }

    return (
      <div className="w-1/2 border-4 border-slate-700 rounded-md p-5">
        <div className="text-white whitespace-nowwrap overflow-auto">
          <span className="flex gap-2 items-center text-3xl mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6">
              <path
                fillRule="evenodd"
                d="M6.32 1.827a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V4.757c0-1.47 1.073-2.756 2.57-2.93ZM7.5 11.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H8.25Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75H8.25Zm1.748-6a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.007Zm-.75 3a.75.75 0 0 1 .75-.75h.007a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.007a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.335.75.75.75h.007a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.007Zm1.754-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-.75 3a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V18a.75.75 0 0 0-.75-.75h-.008Zm1.748-6a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 1.5a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75h-.008Zm-8.25-6A.75.75 0 0 1 8.25 6h7.5a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75v-.75Zm9 9a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-2.25Z"
                clipRule="evenodd" />
            </svg>
            Calculator
          </span>
          {error}
          <h1 className="font-bold border-b-4 border-slate-700">Gender</h1>
          <div className="my-3 flex flex-col gap-4 p-2">
            <div className="flex items-center">
              <input
                checked={this.state.gender === "1"}
                onChange={this.handlegenderChange}
                id="femaleRadioBtn"
                type="radio"
                value="1"
                name="gender"
                className="w-4 h-4"
              />
              <label htmlFor="femaleRadioBtn" className="ms-2 text-lg">Female</label>
            </div>
            <div className="flex items-center">
              <input
                checked={this.state.gender === "2"}
                onChange={this.handlegenderChange}
                id="maleRadioBtn"
                type="radio"
                value="2"
                name="gender"
                className="w-4 h-4"
              />
              <label htmlFor="maleRadioBtn" className="ms-2 text-lg">Male</label>
            </div>
          </div>
          <h1 className="font-bold border-b-4 border-slate-700">Weight</h1>
          <div className="my-3 flex flex-col gap-4 p-2">
            <div className="flex items-center">
              <input
                checked={this.state.weightType === "1"}
                onChange={this.handleweightTypeChange}
                id="imperialRadioBtn"
                type="radio"
                value="1"
                name="weight"
                className="w-4 h-4"
              />
              <label htmlFor="imperialRadioBtn" className="ms-2 text-lg">Imperial (in lbs)</label>
            </div>
            <div className="flex items-center">
              <input
                checked={this.state.weightType === "2"}
                onChange={this.handleweightTypeChange}
                id="metricRadioBtn"
                type="radio"
                value="2"
                name="weight"
                className="w-4 h-4"
              />
              <label htmlFor="metricRadioBtn" className="ms-2 text-lg">Metric (in KG)</label>
            </div>
            <input
              type="number"
              value={this.state.weight}
              onChange={this.handleWeightChange}
              name="heightFeet"
              className="p-2 bg-inherit text-lg text-white w-1/4 border rounded border-slate-700 focus:border-slate-500 focus:outline-none focus:ring-0"
              min="0"
              max="8"
            />
          </div>
          <h1 className="font-bold border-b-4 border-slate-700">Height in feet and inches</h1>
          <div className="flex flex-row gap-4 my-3 p-2">
            <input
              type="number"
              value={this.state.heightFeet}
              onChange={this.handleheightFeetChange}
              name="heightFeet"
              className="p-2 bg-inherit text-lg text-white w-1/4 border rounded border-slate-700 focus:border-slate-500 focus:outline-none focus:ring-0"
              min="0"
              max="8"
            />
            <input
              type="number"
              value={this.state.heightInches}
              onChange={this.handleheightInchesChange}
              name="heightInches"
              className="p-2 bg-inherit text-lg text-white w-3/4 border rounded border-slate-700 focus:border-slate-500 focus:outline-none focus:ring-0"
              min="0"
              max="11"
            />
          </div>
          <h1 className="font-bold border-b-4 border-slate-700">Age in years</h1>
          <div className="flex flex-col gap-4 my-3 p-2">
            <input
              type="number"
              value={this.state.age}
              onChange={this.handleAgeChange}
              className="p-2 bg-inherit text-lg text-white w-3/4 border rounded border-slate-700 focus:border-slate-500 focus:outline-none focus:ring-0"
              name="age"
              min="0"
              max="120"
            />
            <button
              type="button"
              onClick={() => this.calculateBMR()}
              className="w-1/2 inline-flex items-center justify-center p-2 my-3 me-3 text-lg rounded group bg-gradient-to-br from-orange-700 to-orange-500 group-hover:from-orange-600 group-hover:to-orange-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-orange-500"
            >
              Calculate BMR
            </button>
            {resultBMR}
            {resultSug}
          </div>
          <h1 className="font-bold border-b-4 border-slate-700">Workout in a Week</h1>
          <div className="flex flex-col gap-4 my-3 p-2">
            <select
              className="bg-slate-950 border border-slate-700 text-lg rounded focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              value={this.state.activity}
              onChange={this.handleactivityChange}
              name="activity"
            >
              <option value="">Select your Activity</option>
              <option value="1.2">
                Sedentary (Very little or no exercise, and desk job)
              </option>
              <option value="1.375">
                Lightly Active (Light exercise 1 to 3 days per week)
              </option>
              <option value="1.55">
                Moderately Active (Moderate exercise 3 to 5 days per week)
              </option>
              <option value="1.725">
                Very Active (Heavy exercise 6 to 7 days per week)
              </option>
              <option value="1.9">
                Extremely Active (Very intense exercise, and physical job,
                exercise multiple times per day)
              </option>
            </select>
            <button
              type="button"
              onClick={() => this.calculateKCalories()}
              className="w-1/2 inline-flex items-center justify-center my-3 p-2 mb-2 me-2 overflow-hidden text-lg rounded group bg-gradient-to-br from-orange-700 to-orange-500 group-hover:from-orange-600 group-hover:to-orange-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-orange-500"
            >
              Calculate Calories
            </button>
            {resultPAL}
          </div>
        </div>
      </div>
    );
  }
}

export default Bmr;
