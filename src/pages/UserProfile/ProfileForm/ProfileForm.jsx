/* eslint-disable camelcase */
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { serialize } from 'object-to-formdata';
// material
import { Stack, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@mui/material/Autocomplete';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TextField as MuiTextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useStyles } from './style';
import { countryCode } from './contryCode';
import { updateUserProfile } from '../../../actions/profile/profile';

// material

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const ProfileForm = ({ user, url, config }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      // .required('Image is required')
      .test('fileSize', 'File Size is too large', (value) => {
        if (!value) return true;
        return value && value.size <= 2 * 1024 * 1024;
      })
      .test('fileType', 'Unsupported File Format', (value) => {
        if (!value) return true;
        return value && SUPPORTED_FORMATS.includes(value.type);
      }),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    name: Yup.string().required('Name is required'),
    phone_country_id: Yup.string().required('Phone Country is required'),
    phone: Yup.string()
      .min(10, 'Minimum 10 Digits')
      .max(10, 'Maximum 10 Digits')
      .required('Phone Number is required')
      .matches(phoneRegExp, 'Phone number is not valid')
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone_country_id: user.phone_country_id,
      phone: user.phone,
      image: ''
    },
    validationSchema,
    // enableReinitialize: true,
    onSubmit: ({ name, email, phone_country_id, phone, image }) => {
      const payload = {
        name,
        email,
        phone_country_id,
        phone
      };

      if (image) payload.image = image;

      const formData = serialize(payload);
      return dispatch(updateUserProfile(formData)).then((res) => {
        if (res) formik.setSubmitting(false);
      });
    }
  });

  const {
    errors,
    touched,
    dirty,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;
  // console.log(`values`, values);
  const form = (
    <div className={classes.formContainer}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Grid container spacing={3}>
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
                {!values.image ? (
                  <img src={`${url}/${user.image}`} alt="avatar" className={classes.imagePreview} />
                ) : (
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
                  label="Full Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="phone-code-simple-select-label">Phone Code</InputLabel>
                  <Select
                    labelId="phone-code-simple-select-label"
                    id="phone-code-simple-select"
                    value={values.phone_country_id}
                    label="Age"
                    {...getFieldProps('phone_country_id')}
                  >
                    {config?.countries?.list.map((country) => (
                      <MenuItem value={country.calling_code} key={country.id}>
                        {country.name}({country.calling_code})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Phone Number"
                  {...getFieldProps('phone')}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
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
              disabled={!dirty}
              sx={{ my: 2 }}
            >
              Update
            </LoadingButton>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
  return form;
};

const mapStateToProps = (state) => ({
  config: state.config,
  user: state.auth.user,
  url: state.config.url
});
export default connect(mapStateToProps)(ProfileForm);
