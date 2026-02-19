/* ----------------------------------------------------------------------------------------------
Image.jsx
Common component for displaying an image
------------------------------------------------------------------------------------------------- */

import { Avatar, AvatarImage } from "@/components/ui/avatar";

function Image({ src, alt, title }) {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} title={title} />
    </Avatar>
  );
}

export default Image;
