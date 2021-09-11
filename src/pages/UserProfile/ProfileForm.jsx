import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './style';

// material

const ProfileForm = ({ user }) => {
  const classes = useStyles();

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
    initialValues: user,
    validationSchema: LoginSchema,
    onSubmit: () => {}
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const form = (
    <div className={classes.formContainer}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="text"
                  label="Full Name"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email address"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      type="phone_country_id"
                      label="Country Code"
                      {...getFieldProps('phone_country_id')}
                      error={Boolean(touched.phone_country_id && errors.phone_country_id)}
                      helperText={touched.phone_country_id && errors.phone_country_id}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      fullWidth
                      type="phone"
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

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ my: 2 }}
          >
            Save
          </LoadingButton>
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
