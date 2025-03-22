
import { ProtectedRoute } from '@vestido-ecommerce/auth/client';

import EditProfileView from '../../../modules/user/EditProfileForm';

const Profile = () => {
  return (
    <ProtectedRoute>
      <EditProfileView />
    </ProtectedRoute>
  );
};

export default Profile;
