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
      error = <div className="error">{this.state.error}</div>;
    }

    let resultBMR;
    if (this.state.bmr) {
      resultBMR = <div className="resultBMR">{this.state.bmr}</div>;
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
      <div className="w-1/2 border-4 border-slate-700 rounded-md p-4">
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
          <div className="my-3 flex flex-col gap-4">
            <label className="font-bold">Gender</label>
            <div className="flex items-center">
              <input
                id="femaleRadio"
                checked={this.state.gender === "1"}
                onChange={this.handlegenderChange}
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
              />
              <label for="femaleRadio" class="ms-2 text-sm font-medium">Female</label>
            </div>
            <label>
              <input
                type="radio"
                checked={this.state.gender === "2"}
                onChange={this.handlegenderChange}
                className="ms-2 text-sm font-medium"
                name="gender"
                value="2"
              />
              Male
            </label>
          </div>
          <div className="my-3 flex flex-col gap-4">
            <label className="font-bold">Weight</label>
            <label>
              <input
                type="radio"
                checked={this.state.weightType === "1"}
                onChange={this.handleweightTypeChange}
                className="ms-2 text-sm font-medium accent-orange-500"
                name="wrightT"
                value="1"
              />
              Imperial (in lbs)
            </label>
            <label>
              <input
                type="radio"
                checked={this.state.weightType === "2"}
                onChange={this.handleweightTypeChange}
                className="ms-2 text-sm font-medium accent-orange-500"
                name="wrightT"
                value="2"
              />
              Metric (in KG)
            </label>
            <div className="my-5 relative w-1/4">
              <input
                type="text"
                min="0"
                max="1000"
                id="weightInput"
                value={this.state.weight}
                onChange={this.handleWeightChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-inherit border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="weightInput"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 origin-[0] start-2.5 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                {this.weightType}
                Weight Type
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="label">Height in feet and inches</label>
            <input
              type="number"
              value={this.state.heightFeet}
              onChange={this.handleheightFeetChange}
              name="heightFeet"
              className="heightFeet"
              min="0"
              max="8"
            />
            <input
              type="number"
              value={this.state.heightInches}
              onChange={this.handleheightInchesChange}
              name="heightInches"
              className="heightInches"
              min="0"
              max="11"
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Age in years</label>
            <input
              type="number"
              value={this.state.age}
              onChange={this.handleAgeChange}
              className="age"
              name="age"
              min="0"
              max="120"
            />
          </div>
          <button type="button" onClick={() => this.calculateBMR()}>
            Calculate BMR
          </button>
          {resultBMR}
          {resultSug}
          <div className="workout">
            <div className="inputwrap">
              <label className="label">Workout in a Week</label>
              <select
                className="activity"
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
            </div>
            <button type="button" onClick={() => this.calculateKCalories()}>
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
