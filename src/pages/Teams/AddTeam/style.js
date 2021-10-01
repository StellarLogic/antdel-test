import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper
    backgroundColor: '#fff'
  },
  listWrapper: {},
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  },
  btnWapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  image: {
    height: 300,
    width: 250,
    background: '#ddd',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    cursor: 'pointer',
    '& input': {
      display: 'none'
    }
  },
  tagsWapper: {
    position: 'relative'
  },
  plusIcon: {
    height: 30,
    width: 30
  },
  imagePreview: {
    height: 300,
    width: `100%`,
    objectFit: 'contain'
  },
  errorClass: {
    lineHeight: 1.5,
    fontSize: '0.75rem',
    fontWeight: 400,
    textAlign: 'left',
    margin: '0 14px',
    color: '#FF4842'
  },
  select: {
    width: '100%'
  }
}));
