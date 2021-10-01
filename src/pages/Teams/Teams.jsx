import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
import Slide from '@material-ui/core/Slide';
import TeamsList from './TeamsList/TeamsList';
import { useStyles } from './style';
import AddTeam from './AddTeam/AddTeam';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const Teams = (props) => {
  const [addTeamModal, setAddTeamModal] = useState({ show: false, id: null });
  const classes = useStyles();

  const handleTeamModal = (value, id) => {
    setAddTeamModal({ ...addTeamModal, show: value, id });
  };
  console.log(`addTagModal`, addTeamModal);
  const modal = (
    <Dialog
      open={addTeamModal.show}
      onClose={() => handleTeamModal(false)}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogContent className={classes.modalContent}>
        <Box sx={classes.modal}>
          <AddTeam handleClose={() => handleTeamModal(false)} id={addTeamModal.id} />
        </Box>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {modal}
      <TeamsList handleModal={handleTeamModal} />
    </>
  );
};

Teams.propTypes = {};

export default Teams;
