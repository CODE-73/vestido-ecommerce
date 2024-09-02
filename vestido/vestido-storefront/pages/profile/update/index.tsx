import * as React from 'react';

import { ProtectedRoute } from '@vestido-ecommerce/auth/client';

import EditProfileView from '../../../modules/User/EditProfileForm';

const Profile = () => {
  return (
    <ProtectedRoute>
      <EditProfileView />
    </ProtectedRoute>
  );
};

export default Profile;
