import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import React from "react";

export default function Dialog({ hideDialog, dialogData }) {
  if (!dialogData) {
    return null;
  }
  const { title, details } = dialogData;

  // add new line when \n in details
  const newDetails = details.split("\\n").map((item, i) => {
    return <span key={i}>{item}<br /></span>;
  });

  return (
    <div className="dialog">
      <Popover isOpen={true} arrowShadowColor='none' autoFocus={false} onClose={hideDialog}>
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'>{title}</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {newDetails}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}

