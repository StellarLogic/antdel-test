/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { serialize } from 'object-to-formdata';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Select,
  MenuItem,
  Card,
  Container,
  CardContent,
  InputLabel,
  Typography,
  Button,
  FormLabel,
  RadioGroup,
  Radio,
  FormControl
} from '@material-ui/core';
import { useAutocomplete } from '@mui/core/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField as MuiTextField } from '@mui/material';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { tags } from './tags';
import { useStyles, Label, InputWrapper, Listbox, StyledTag, Android12Switch } from './style';
import { addUser, getUserListing } from '../../../actions/users/users';
import { fetchTags, fetchTeams } from '../../../actions/config/config';
// import { countries } from './phone-code';

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

let initialValues = {
  image: '',
  user_name: '',
  name: '',
  email: '',
  phone_country: '',
  phone: '',
  password: '',
  assign_team: '',
  permission: '',
  forms: '',
  fleet_schedule: ''
};

const AddUser = ({ config, handleClose, id, users }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTags);
    dispatch(fetchTeams);
    formik.resetForm();
  }, [dispatch]);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const LoginSchema = Yup.object().shape({
    image: Yup.mixed()
      .required('Image is required')
      .test('fileSize', 'File Size is too large', (value) => value && value.size <= 2 * 1024 * 1024)
      .test(
        'fileType',
        'Unsupported File Format',
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
    user_name: Yup.string().required('User Name is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone_country: Yup.string().required('Phone Country is required'),
    phone: Yup.string()
      .min(10, 'Minimum 10 Digits')
      .max(10, 'Maximum 10 Digits')
      .required('Phone Number is required')
      .matches(phoneRegExp, 'Phone number is not valid'),
    password: Yup.string().min(8).required('Password is required'),
    forms: Yup.string().required('Forms is required'),
    assign_team: Yup.string().required('Assign Team is required'),
    permission: Yup.string().required('Permission is required'),
    fleet_schedule: Yup.string().required('Fleet Schedule is required')
  });

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    enableReinitialize: true,
    onSubmit: ({
      image,
      user_name,
      name,
      email,
      phone_country,
      phone,
      password,
      assign_team,
      permission,
      forms,
      fleet_schedule
    }) => {
      const payload = {
        image,
        user_name,
        name,
        email,
        phone_country,
        phone,
        password,
        assign_team,
        permission,
        forms,
        fleet_schedule
      };

      const formData = serialize(payload);
      return addUser(formData).then((res) => {
        console.log(`res`, res);
        formik.setSubmitting(false);
        if (res.status === 1) {
          handleClose();
          dispatch(getUserListing(0, 10));
        }
      });
    }
  });

  useEffect(() => {
    if (id) {
      const user = users.data?.rows?.find((user) => user.id === id);
      const { user_name, name, email, phone_country, phone, image } = user;
      if (user)
        initialValues = {
          user_name,
          name,
          email,
          phone_country,
          phone,
          image
        };
    }
    formik.resetForm();
  }, [users, id]);

  const handleSelectChange = ({ target: { value } }, name) => {
    formik.setFieldValue(name, value);
  };
  const {
    errors,
    touched,
    dirty,
    setFieldValue,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;
  console.log(`{values,initialValues}`, values);

  return (
    <div className={classes.formContainer}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Update' : 'Add'} Agent
        </Typography>
      </Stack>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <InputLabel>User Image</InputLabel>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={classes.imageWrapper}>
                  <label htmlFor="profile-image" className={classes.image}>
                    <AddCircleOutlineIcon className={classes.plusIcon} />
                    <input
                      type="file"
                      name="image"
                      id="profile-image"
                      max={1}
                      onChange={(event) => {
                        setFieldValue('image', event.currentTarget.files[0]);
                      }}
                    />
                  </label>
                  {touched.image && errors.image && (
                    <span className={classes.errorClass}>{errors.image}</span>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                {values.image && values.image !== 'string' && (
                  <img
                    src={URL.createObjectURL(values.image)}
                    alt="avatar"
                    className={classes.imagePreview}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="User Name"
                  autoComplete="false"
                  {...getFieldProps('user_name')}
                  error={Boolean(touched.user_name && errors.user_name)}
                  helperText={touched.user_name && errors.user_name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Name"
                  id="name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  autoComplete="false"
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              {/* <Grid container spacing={3}> */}
              <Grid item xs={12} md={6}>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                {/* <Autocomplete
                  id="country-select-demo"
                  options={config?.countries?.list}
                  autoHighlight
                  value={config?.countries?.list.find(
                    (country) => country.phone === values.phone_country
                  )}
                  error={Boolean(touched.phone_country && errors.phone_country)}
                  helperText={touched.phone_country && errors.phone_country}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('phone_country', newValue?.phone);
                  }}
                  renderInput={(params) => (
                    <MuiTextField
                      fullWidth
                      {...params}
                      label="Choose a country"
                      inputProps={{
                        ...params.inputProps
                      }}
                    />
                  )}
                /> */}
                <FormControl fullWidth>
                  <InputLabel id="phone-code-simple-select-label">Phone Code</InputLabel>
                  <Select
                    labelId="phone-code-simple-select-label"
                    id="phone-code-simple-select"
                    value={values.phone_country}
                    label="Age"
                    {...getFieldProps('phone_country')}
                  >
                    {config?.countries?.list.map((country) => (
                      <MenuItem value={country.calling_code} key={country.calling_code}>
                        {country.name}({country.calling_code})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} md={6}> */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Phone Number"
                  {...getFieldProps('phone')}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  {/* <InputLabel id="assign_team">Assigned Team</InputLabel> */}
                  <InputLabel id="forms-simple-select-autowidth-label">Forms</InputLabel>
                  <Select
                    labelId="forms-simple-select-autowidth-label"
                    id="forms-simple-select-autowidth"
                    label="Forms"
                    onChange={(e) => handleSelectChange(e, 'forms')}
                    // className={classes.select}
                    fullWidth
                    error={Boolean(touched.forms && errors.forms)}
                    helperText={touched.forms && errors.forms}
                  >
                    <MenuItem value="booking.antdel.com">booking.antdel.com</MenuItem>
                    <MenuItem value="Access All Unassigned Tasks (All Teams)">
                      Access All Unassigned Tasks (All Teams)
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  {/* <InputLabel id="assign_team">Assigned Team</InputLabel> */}
                  <InputLabel id="team-simple-select-autowidth-label">Assigned Team</InputLabel>
                  <Select
                    labelId="team-simple-select-autowidth-label"
                    id="team-simple-select-autowidth"
                    label="Assigned Team"
                    onChange={(e) => handleSelectChange(e, 'assign_team')}
                    // className={classes.select}
                    fullWidth
                    error={Boolean(touched.assign_team && errors.assign_team)}
                    helperText={touched.assign_team && errors.assign_team}
                  >
                    {config.teams.list.map((team) => (
                      <MenuItem value={team.id}>{team.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Agent Permission</FormLabel>
                  <RadioGroup
                    row
                    aria-label="permission"
                    name="row-radio-buttons-group"
                    value={`${values.permission}`}
                    {...getFieldProps('permission')}
                    error={Boolean(touched.permission && errors.permission)}
                    helperText={touched.permission && errors.permission}
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Access All Unassigned Task (All Teams)"
                    />
                    <FormControlLabel value="1" control={<Radio />} label="Add Agent" />
                    <FormControlLabel value="2" control={<Radio />} label="Create Task" />
                    <FormControlLabel value="3" control={<Radio />} label="Edit Task" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Fleet Schedule</FormLabel>
                  <RadioGroup
                    row
                    aria-label="fleet_schedule"
                    name="row-radio-buttons-group"
                    value={`${values.fleet_schedule}`}
                    {...getFieldProps('fleet_schedule')}
                    error={Boolean(touched.fleet_schedule && errors.fleet_schedule)}
                    helperText={touched.fleet_schedule && errors.fleet_schedule}
                  >
                    <FormControlLabel value="0" control={<Radio />} label="Can't Access" />
                    <FormControlLabel value="1" control={<Radio />} label="View Only" />
                    <FormControlLabel value="2" control={<Radio />} label="Can View & Edit" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
          <div className={classes.btnWapper}>
            <LoadingButton
              // fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ mt: 2 }}
              disabled={!dirty}
            >
              {id ? 'Update' : 'Add'}
            </LoadingButton>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

AddUser.propTypes = {
  config: PropTypes.object,
  handleClose: PropTypes.func,
  users: PropTypes.object
};

const mapStateToProps = (state) => ({
  config: state.config,
  users: state.users
});

export default connect(mapStateToProps)(AddUser);
