import * as React from 'react';

import { ProtectedRoute } from '@vestido-ecommerce/auth/client';

import ProfileView from '../../modules/profile/ProfileView';

const Profile = () => {
  return (
    <ProtectedRoute>
      <ProfileView />
    </ProtectedRoute>
  );
};

export default Profile;
