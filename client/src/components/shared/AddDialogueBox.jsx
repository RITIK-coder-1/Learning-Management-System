/* ----------------------------------------------------------------------------------------------
AddDialogueBox.jsx
dialogue for adding new data 
------------------------------------------------------------------------------------------------- */

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form, CommonButton } from "../index.components";

function AddDialogueBox({ label, children, onSubmit }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-green-400 hover:bg-green-800 cursor-pointer"
        >
          {label}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-linear-to-br from-white/10 via-black/40 to-green-900/30 backdrop-blur-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Add New Data</AlertDialogTitle>
          <AlertDialogDescription className="w-full">
            <Form className="flex flex-col gap-3 lg:w-full bg-transparent" onSubmit={onSubmit}>
              {children}

              <AlertDialogFooter className="flex flex-row justify-center items-center">
                <AlertDialogCancel className="hover:bg-red-700 w-30">
                  Cancel
                </AlertDialogCancel>
                <CommonButton
                  className="bg-green-800 hover:bg-green-950 border border-white w-30 font-normal p-0 text-sm"
                  type="submit"
                  label="Continue"
                />
              </AlertDialogFooter>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddDialogueBox;
