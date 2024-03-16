import {IconButton, Tooltip} from "@chakra-ui/react";

interface FloatingActionButtonProps {
  icon: React.ReactElement;
  onClick: () => void;
}


export function FloatingActionButton({onClick, icon}: FloatingActionButtonProps) {
  return (
    <Tooltip
      label="Create a Post"
      aria-label="Create a Post"
    >
      <IconButton
        zIndex={999}
        rounded={'full'}
        colorScheme={'blue'}
        w={62}
        h={62}
        onClick={onClick}
        dropShadow={'lg'}
        icon={icon}
        aria-label={'Create Post Button'}
        position={'fixed'}
        bottom={0}
        right={0}
        m={5}
      />
    </Tooltip>
  )

}
