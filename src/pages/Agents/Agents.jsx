import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { serialize } from 'object-to-formdata';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import Slide from '@material-ui/core/Slide';
import { useDispatch } from 'react-redux';
import { getAgentListing } from '../../actions/agent/agent';
import AgentList from './AgentList/AgentList'; // material
import { useStyles } from './style';
import AddAgent from './AddAgent/AddAgent';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const Agents = () => {
  const [addAgentModal, setAddAgentModal] = useState({ show: false, id: null });
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAgentModal = (value, id = null) => {
    setAddAgentModal({ ...addAgentModal, show: value, id });
  };
  console.log(`addAgentModal`, addAgentModal);
  const modal = (
    <Dialog
      open={addAgentModal.show}
      onClose={() => handleAgentModal(false)}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      TransitionComponent={Transition}
      fullWidth
      maxWidth="md"
    >
      <DialogContent className={classes.modalContent}>
        <Box className={classes.modal}>
          <AddAgent handleClose={() => handleAgentModal(false)} id={addAgentModal.id} />
        </Box>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={classes.root}>
      {modal}
      <AgentList handleAgentModal={handleAgentModal} />
    </div>
  );
};

export default Agents;
