import * as React from 'react';
import BlankLayout from '../../layouts/authorized/BlankLayout';
import LoginView from '../../modules/auth/LoginView';
import { NextPageWithLayout } from '../../types';

const LoginPage: NextPageWithLayout = () => <LoginView />;

export default LoginPage;

LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
