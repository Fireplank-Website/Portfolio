import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

const CustomModal = ({ title, body, icon }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
        <IconButton onClick={onOpen} icon={icon}/>
    
        <Modal returnFocusOnClose={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody whiteSpace={"pre-line"}>
                {body}
            </ModalBody>
    
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}
export default CustomModal;