import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  Box,
  CircularProgress
} from '@material-ui/core';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import Scrollbar from '../../../components/Scrollbar';
import Page from '../../../components/Page';
import { fetchTags } from '../../../actions/config/config';
import TagsHeader from './TagsHeader';
import { UserMoreMenu } from '../../../components/_dashboard/user';
import { deleteTags } from '../../../actions/tags/tags';
import { useStyles } from './style';
import Loader from '../../../components/Loader/Loader';

const TagsList = ({ handleModal, tags }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTags);
  }, [dispatch]);

  const handleDelete = (id) => {
    const updatedTagsList = tags.list.filter((tag) => tag.id !== id);

    dispatch(deleteTags(id)).then((res) => {
      dispatch(fetchTags);
    });
  };

  const table = (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <TagsHeader />
          <TableBody>
            {
              // filteredUsers
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              tags &&
                tags.list.map((row, index) => {
                  const { id, name, createdAt, updatedAt } = row;

                  return (
                    <TableRow hover key={id} tabIndex={-1} role="checkbox">
                      <TableCell padding="checkbox">
                        {/* <Checkbox
                  checked={isItemSelected}
                  onChange={(event) => handleClick(event, name)}
                /> */}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {moment(createdAt).format('DD/MM/YYYY H:mm A')}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {moment(updatedAt).format('DD/MM/YYYY H:mm A')}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <UserMoreMenu
                          onClickDelete={() => handleDelete(id)}
                          onClickEdit={() => handleModal(true, id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
            }
            {/* {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );

  return (
    <Page>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Tags
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleModal(true)}
          startIcon={<Icon icon={plusFill} />}
        >
          New Tag
        </Button>
      </Stack>
      <Card>
        {tags.loading ? <Loader /> : table}

        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Card>
    </Page>
  );
};

TagsList.propTypes = {
  tags: PropTypes.object,
  handleModal: PropTypes.func
};

const mapStateToProps = (state) => ({
  tags: state.config.tags
});

export default connect(mapStateToProps)(TagsList);
