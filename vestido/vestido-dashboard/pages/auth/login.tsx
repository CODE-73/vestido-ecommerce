import * as React from 'react';
import BlankLayout from '../../../vestido-storefront/layouts/BlankLayout';
import LoginView from '../../modules/auth/LoginView';
import { NextPageWithLayout } from '../../../vestido-storefront/types';

const LoginPage: NextPageWithLayout = () => <LoginView />;

export default LoginPage;

LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
