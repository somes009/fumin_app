import React from 'react';
import {View, StyleSheet} from 'react-native';

import {AlertDialog, Center} from 'native-base';

const FMPopUp = ({refPop, children, containerStyles, underChildren}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const handleShow = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    onClose();
  };
  refPop.handleShow = handleShow;
  refPop.handleClose = handleClose;
  return (
    <Center>
      <AlertDialog
        motionPreset="scal"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered>
        <View style={[styles.container, containerStyles]}>{children}</View>
        {underChildren}
      </AlertDialog>
    </Center>
  );
};
export default FMPopUp;
const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
});
