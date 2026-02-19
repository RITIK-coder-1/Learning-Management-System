/* ----------------------------------------------------------------------------------------------
Image.jsx
Common component for displaying an image
------------------------------------------------------------------------------------------------- */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Image({ src, alt }) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} className="" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default Image;
