"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ setterFunction, disabled = false }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState();

  return (
    <Field
      className="mx-auto w-full"
      required
      disabled={disabled}
      name="dateOfBirth"
    >
      <FieldLabel htmlFor="dateOfBirth" className="text-md">
        Date Of Birth <span className="text-destructive text-red-600">*</span>
      </FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dateOfBirth"
            className="justify-start font-normal bg-black"
          >
            {date ? date.toLocaleDateString() : "Select Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0 bg-black"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(newDate) => {
              setDate(newDate);
              setOpen(false);
              setterFunction(newDate);
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
