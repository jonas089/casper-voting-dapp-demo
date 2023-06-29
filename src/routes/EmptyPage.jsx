import React from 'react';
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';

// This page only exists to showcase the Navbar

class EmptyPage extends React.Component {
  render() {
    return (
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <h1>This could be another page.</h1>
      </div>
    );
  }
}

export default EmptyPage;
