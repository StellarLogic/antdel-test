import React from 'react';
import { connect, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { serialize } from 'object-to-formdata';
// material
import { Stack, TextField, Select, MenuItem } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './style';
import { countryCode } from './contryCode';
import { updateUserProfile } from '../../../actions/profile/profile';

// material

const ProfileForm = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, 'Invalid phone')
      .max(10, 'Invalid phone')
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      phone_country_id: user.phone_country_id,
      phone: user.phone
    },
    validationSchema: LoginSchema,
    // eslint-disable-next-line camelcase
    onSubmit: ({ name, email, phone_country_id, phone }) => {
      // const changesProperties = {};
      // if (name !== user.name) changesProperties.name = name;
      // if (email !== user.email) changesProperties.email = email;
      // // eslint-disable-next-line camelcase
      // if (phone_country_id !== user.phone_country_id)
      //   // eslint-disable-next-line camelcase
      //   changesProperties.phone_country_id = phone_country_id;
      // if (phone !== user.phone) changesProperties.phone = phone;
      const payload = {
        name,
        email,
        phone_country_id,
        phone
      };

      const formData = serialize(payload);

      dispatch(updateUserProfile(formData)).then((res) => {
        if (res) formik.setSubmitting(false);
      });
    }
  });

  const { errors, touched, dirty, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const form = (
    <div className={classes.formContainer}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Grid container spacing={3}>
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
                <Grid container spacing={3}>
                  <Grid item xs={4} md={3}>
                    {/* <TextField
                      fullWidth
                      type="phone_country_id"
                      label="Country Code"
                      {...getFieldProps('phone_country_id')}
                      error={Boolean(touched.phone_country_id && errors.phone_country_id)}
                      helperText={touched.phone_country_id && errors.phone_country_id}
                    /> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="phone_country_id"
                      // value={countryCode.find((country) => country.name === 'India')?.code}
                      value={
                        // values.phone_country_id ||
                        countryCode.find((country) => country.name === 'India')?.code
                      }
                      label="Country Code"
                      // onChange={handleChange}
                    >
                      {countryCode.map((country) => (
                        <MenuItem key={country.code} value={country.code}>
                          {country.code}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={8} md={9}>
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
  user: state.auth.user
});
export default connect(mapStateToProps)(ProfileForm);
