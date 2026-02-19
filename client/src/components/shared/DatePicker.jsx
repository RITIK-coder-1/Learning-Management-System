/* ---------------------------------------------------------------------------------------
DatePicker.jsx
The component to choose the date of birth
------------------------------------------------------------------------------------------ */

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DatePicker({ dateSelectionMethod, disabled = false }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState();

  return (
    <Field className="mx-auto w-full" name="dateOfBirth">
      <FieldLabel htmlFor="dateOfBirth">
        Date Of Birth <span className="text-destructive text-red-600">*</span>
      </FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dateOfBirth"
            className="justify-start border-0 focus:ring-1 font-normal bg-black sm:text-lg lg:text-xl"
            disabled={disabled}
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
              dateSelectionMethod(newDate.toISOString()); // to pass the date selected by the user to the parent component
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}

export default DatePicker;
