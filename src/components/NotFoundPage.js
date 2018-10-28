import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const NotFoundPage = () => (
  <div>
    404 -{" "}
    <Link to="/">
      <FormattedMessage id="NotFoundPage.goHome" defaultMessage="Go Home" />
    </Link>
  </div>
);

export default NotFoundPage;
