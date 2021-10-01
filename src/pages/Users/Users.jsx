import React, { useEffect, useState } from 'react';
import { Modal, Box, Container, Dialog, DialogContent } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { useDispatch } from 'react-redux';
import UserLists from './UserLists/UserLists'; // material
import { useStyles } from './style';
import AddUser from './AddUser/AddUser';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const Users = () => {
  const [addUserModal, setAddUserModal] = useState({ show: false, id: null });
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleUserModal = (value, id = null) => {
    setAddUserModal({ ...addUserModal, show: value, id });
  };

  const modal = (
    <Dialog
      open={addUserModal.show}
      onClose={() => handleUserModal(false)}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      TransitionComponent={Transition}
      fullWidth
      maxWidth="md"
    >
      <DialogContent>
        <Box>
          <AddUser handleClose={() => handleUserModal(false)} id={addUserModal.id} />
        </Box>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={classes.root}>
      {modal}
      <UserLists handleUserModal={handleUserModal} />
    </div>
  );
};

export default Users;
