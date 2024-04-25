import * as React from 'react';
import BlankLayout from '../../layouts/BlankLayout';
import LoginView from '../../modules/Auth/LoginView';
import { NextPageWithLayout } from '../../types';

const LoginPage: NextPageWithLayout = () => <LoginView />;

export default LoginPage;

LoginPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
