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

const Agent = () => {
  const [addAgentModal, setAddAgentModal] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    const formData = serialize({ page: 2, per_page: 10 });
    dispatch(getAgentListing(formData));
  }, []);

  const handleAgentModal = (value) => {
    setAddAgentModal(value);
  };

  const modal = (
    <Dialog
      open={addAgentModal}
      onClose={() => handleAgentModal(false)}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      TransitionComponent={Transition}
    >
      <DialogContent>
        <Box sx={classes.modal}>
          <AddAgent />
        </Box>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className={classes.root}>
      {modal}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Agents
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleAgentModal(true)}
            startIcon={<Icon icon={plusFill} />}
          >
            New Agent
          </Button>
        </Stack>
        <AgentList />
      </Container>
    </div>
  );
};

export default Agent;
