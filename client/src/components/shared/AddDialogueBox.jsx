/* ----------------------------------------------------------------------------------------------
AddDialogueBox.jsx
dialogue for adding new data 
------------------------------------------------------------------------------------------------- */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

function AddDialogueBox({ label, children, onClick }) {
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

      <AlertDialogContent className="border-green-700 bg-linear-to-br from-white/10 via-black/40 to-green-900/30 backdrop-blur-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Add New Data</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-3">
            {children}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-center items-center">
          <AlertDialogCancel className="hover:bg-red-700 w-30">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="hover:bg-purple-950 border border-white w-30"
            onClick={onClick}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddDialogueBox;
