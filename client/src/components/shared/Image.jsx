/* ----------------------------------------------------------------------------------------------
Image.jsx
Common component for displaying an image
------------------------------------------------------------------------------------------------- */

import { Avatar, AvatarImage } from "@/components/ui/avatar";

function Image({ src, alt, title, size, className }) {
  return (
    <Avatar
      size={size}
      className={`w-30 h-30 md:w-40 md:h-40 rounded-full shadow-lg shadow-black object-cover ${className}`}
    >
      <AvatarImage
        src={src || "https://github.com/shadcn.png"}
        alt={alt}
        title={title}
      />
    </Avatar>
  );
}

export default Image;
