/* ----------------------------------------------------------------------------------------------
Image.jsx
Common component for displaying an image
------------------------------------------------------------------------------------------------- */

import { Avatar, AvatarImage, AvatarBadge } from "@/components/ui/avatar";

function Image({ src, alt }) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} className="" />
    </Avatar>
  );
}

export default Image;
