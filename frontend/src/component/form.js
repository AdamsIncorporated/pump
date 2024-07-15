
"use client";

import { Label, TextInput } from "flowbite-react";

export default function Form() {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username3" color="success" value="Your name" />
        </div>
        <TextInput
          id="username"
          placeholder="Bonnie Green"
          required
          color="success"
          helperText={
            <>
              <span className="font-medium">Alright!</span> Username available!
            </>
          }
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username4" color="failure" value="Your name" />
        </div>
        <TextInput
          id="username4"
          placeholder="Bonnie Green"
          required
          color="failure"
          helperText={
            <>
              <span className="font-medium">Oops!</span> Username already taken!
            </>
          }
        />
      </div>
    </div>
  );
}
