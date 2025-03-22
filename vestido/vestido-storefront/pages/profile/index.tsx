import { ProtectedRoute } from '@vestido-ecommerce/auth/client';

import ProfileView from '../../modules/user/profile-view';

const Profile = () => {
  return (
    <ProtectedRoute>
      <ProfileView />
    </ProtectedRoute>
  );
};

export default Profile;
