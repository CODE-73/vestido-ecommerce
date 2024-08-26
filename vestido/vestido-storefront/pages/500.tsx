import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const InternalServerError: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <Head>
        <title>500 - Internal Server Error | Vestido</title>
        <meta
          name="description"
          content="An unexpected error occurred on our server."
        />
      </Head>

      <main className="max-w-max mx-auto">
        <div className="sm:flex">
          <p className="text-4xl font-extrabold text-red-600 sm:text-5xl">
            500
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Internal Server Error
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Oops! Something went wrong on our end. We&apos;re working to fix
                it.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Go back home
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InternalServerError;
