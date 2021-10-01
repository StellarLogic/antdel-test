import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
// material
import { styled } from '@material-ui/core/styles';
//
import { Container } from '@material-ui/core';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: 1500
    }
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle className={classes.root}>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '50px',
      paddingRight: '50px'
    }
  }
}));
