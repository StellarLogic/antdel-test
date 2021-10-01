import PropTypes from 'prop-types';
// material
import { visuallyHidden } from '@material-ui/utils';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@material-ui/core';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'created At', label: 'Created At', alignRight: false },
  { id: 'updated At', label: 'Updated At', alignRight: false },
  { id: '' }
];

TagsHeader.propTypes = {};

export default function TagsHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          /> */}
        </TableCell>
        {TABLE_HEAD.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'left'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
