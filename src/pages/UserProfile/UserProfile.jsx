import React from 'react';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../../components/Page';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../components/_dashboard/blog';
import ProfileForm from './ProfileForm';

const UserProfile = () => (
  <Page title="Dashboard: Blog | Minimal-UI">
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Button variant="contained">Edit</Button>
      </Stack>
      <ProfileForm />
    </Container>
  </Page>
);

export default UserProfile;
