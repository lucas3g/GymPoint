import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Plans from '../pages/Plans';
import Students from '../pages/Students';
import Enrollments from '../pages/Enrollments';
import Tickets from '../pages/Tickets';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/enrollments" component={Enrollments} isPrivate />
      <Route path="/tickets" component={Tickets} isPrivate />
    </Switch>
  );
}
