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
import TagsList from './TagsList/TagsList';
import { useStyles } from './style';
import AddTag from './AddTag/AddTag';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const Tags = (props) => {
  const [addTagModal, setAddTagModal] = useState({ show: false, id: null });
  const classes = useStyles();

  const handleTagModal = (value, id) => {
    setAddTagModal({ ...addTagModal, show: value, id });
  };
  console.log(`addTagModal`, addTagModal);
  const modal = (
    <Dialog
      open={addTagModal.show}
      onClose={() => handleTagModal(false)}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogContent className={classes.modalContent}>
        <Box sx={classes.modal}>
          <AddTag handleClose={() => handleTagModal(false)} id={addTagModal.id} />
        </Box>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {modal}
      <TagsList handleModal={handleTagModal} />
    </>
  );
};

Tags.propTypes = {};

export default Tags;
