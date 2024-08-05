import React from "react";

export class MetricForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
  }

  handleWeightChange(e) {
    const weight = e.target.value;
    this.props.weightChange(weight);
  }

  handleAgeChange(e) {
    const age = e.target.value;
    this.props.ageChange(age);
  }

  handleHeightChange(e) {
    const height = e.target.value;
    this.props.heightChange(height);
  }

  render() {
    return (
      <div className="my-5 w-full z-0">
        <div class="w-1/2 my-10">
          <div class="relative w-full min-w-[200px] h-10">
            <input
              class="peer w-full h-full bg-slate-950 text-white font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-inherit disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-700 placeholder-shown:border-t-slate-700 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-border-slate-700 focus:border-slate-500"
              id="product_name"
              type="text"
              maxLength="6"
              onChange={this.handleWeightChange}
              placeholder=" " />
            <label
              class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-slate-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-slate-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-slate-700 before:border-blue-gray-200 peer-focus:before:!border-slate-700 after:border-blue-gray-200 peer-focus:after:!border-slate-700">Weight
            </label>
          </div>
        </div>

        <label for="product_name">Age</label>
        <input id="product_name" type="text" maxlength="3" placeholder="(years 0-120)" class="form-control" onChange={this.handleAgeChange} />

        <label for="product_name">Height</label>
        <input id="product_name" type="text" maxlength="5" placeholder="(cm)" class="form-control" onChange={this.handleHeightChange} />
      </div>
    );
  }
}
