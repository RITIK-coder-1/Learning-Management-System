/* ----------------------------------------------------------------------------------------------
Spinner.jsx
------------------------------------------------------------------------------------------------- */

import { Spinner } from "@/components/ui/spinner"

export function SpinnerCustom({className}) {
  return (
    <div className="flex items-center gap-4">
      <Spinner className={className}/>
    </div>
  );
}
