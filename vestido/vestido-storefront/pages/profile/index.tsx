import { ProtectedRoute } from '@vestido-ecommerce/auth/client';

import ProfileView from '../../modules/profile/profile-view';

const Profile = () => {
  return (
    <ProtectedRoute>
      <ProfileView />
    </ProtectedRoute>
  );
};

export default Profile;
