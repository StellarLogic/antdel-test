/* eslint-disable camelcase */
import { filter } from 'lodash';

import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
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
  Box
} from '@material-ui/core';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// components
import { useDispatch, connect } from 'react-redux';
import { serialize } from 'object-to-formdata';
import { deleteUser, getUserListing } from '../../../actions/users/users';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../components/_dashboard/user';
import dummy from '../data';
import { useStyles } from './style';
import RowSkeleton from './RowSkeleton';
import Loader from '../../../components/Loader/Loader';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array = [], comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'username', label: 'User Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: '' }
];

const UsersList = ({
  handleUserModal,
  url,
  users: {
    loading,
    data: { rows: users, count, total_page }
  }
}) => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListing(page + 1, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users?.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const handleDelete = (id) => {
    deleteUser(id).then((res) => {
      console.log(`res`, res);
      if (res.status === 1) {
        dispatch(getUserListing(0, 10));
      }
    });
  };

  // if (loading) return <p>Loading</p>;
  // console.log(`filteredUsers`, filteredUsers);

  const table = (
    <>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={users?.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {loading ? (
                <RowSkeleton />
              ) : (
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                users &&
                users.map((row, index) => {
                  const { id, name, user_name, email, image, phone, phone_country_id } = row;
                  const { avatar } = dummy[1];
                  const isItemSelected = selected.indexOf(name) !== -1;
                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        {/* <Checkbox
                  checked={isItemSelected}
                  onChange={(event) => handleClick(event, name)}
                /> */}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar alt={name} src={`${url}/${image}`} />
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="left">{user_name}</TableCell>
                      <TableCell align="left">{email}</TableCell>
                      <TableCell align="left">
                        +{phone_country_id}-{phone}
                      </TableCell>
                      <TableCell align="right">
                        <UserMoreMenu
                          onClickDelete={() => handleDelete(id)}
                          onClickEdit={() => handleUserModal(true, id)}
                          hideEdit
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
              {/* {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )} */}
            </TableBody>
            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );

  return (
    <Page>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleUserModal(true)}
          startIcon={<Icon icon={plusFill} />}
        >
          New User
        </Button>
      </Stack>
      <Card className={classes.card}>
        {/* <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}
        {loading ? <Loader /> : table}
      </Card>
    </Page>
  );
};

UsersList.propTypes = {
  users: PropTypes.object,
  handleUserModal: PropTypes.func,
  url: PropTypes.string
};

const mapStateToProps = (state) => ({
  users: state.users,
  url: state.config.url
});

export default connect(mapStateToProps)(UsersList);
