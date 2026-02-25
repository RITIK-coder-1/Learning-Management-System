/* ----------------------------------------------------------------------------------------------
DeleteDialogueBox.jsx
Warning dialogue for deleting important data 
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

function DeleteDialogueBox({ label, description, onClick }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-red-400 hover:bg-red-800 cursor-pointer"
        >
          {label}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="border-red-600 bg-linear-to-br from-white/10 via-black/40 to-red-900/30 backdrop-blur-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-center items-center">
          <AlertDialogCancel className="hover:bg-white/10 w-30">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-900 hover:bg-red-950 w-30"
            onClick={onClick}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDialogueBox;
