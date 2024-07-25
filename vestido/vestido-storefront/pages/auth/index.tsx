import * as React from 'react';

import BlankLayout from '../../layouts/BlankLayout';
import AuthView from '../../modules/Auth/AuthView';
import { NextPageWithLayout } from '../../types';

const AuthPage: NextPageWithLayout = () => <AuthView />;

export default AuthPage;

AuthPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
