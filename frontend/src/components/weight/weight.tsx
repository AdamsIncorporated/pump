import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TiTick } from "react-icons/ti";

type Inputs = {
  example: string;
  exampleRequired: string;
};

function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form className="flex flex-col gap-4 p-6 border border-white rounded-md shadow-md w-80">
      <div>
        <label
          htmlFor="example"
          className="block text-sm font-bold mb-2"
        >
          Example Input
        </label>
        <input
          id="example"
          defaultValue="test"
          {...register("example")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <label
          htmlFor="exampleRequired"
          className="block text-sm font-bold mb-2"
        >
          Required Input
        </label>
        <input
          id="exampleRequired"
          {...register("exampleRequired", {
            required: "This field is required",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.exampleRequired && (
          <span className="text-red-500 text-xs italic">
            {errors.exampleRequired.message}
          </span>
        )}
      </div>

      <div className="w-fit flex items-center bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
        <input type="submit" className="hidden" />{" "}
        <button type="submit" className="flex items-center space-x-2">
          <span>Submit</span>
          <TiTick className="text-white text-xl" />
        </button>
      </div>
    </form>
  );
}

export default function Weight() {
  return (
    <div className="text-white my-5">
      <Form />
    </div>
  );
}
