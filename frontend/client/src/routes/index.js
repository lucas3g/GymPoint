import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Plans from '../pages/Plans';
import Students from '../pages/Students';
import StudentsStore from '../pages/Students/studentsStore';
import PlanStore from '../pages/Plans/planStore';
import Enrollments from '../pages/Enrollments';
import EnrollmentStore from '../pages/Enrollments/enrollmentStore';
import HelpOrders from '../pages/helpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/plans" component={Plans} isPrivate />
      <Route path="/planStore" component={PlanStore} isPrivate />
      <Route path="/students" component={Students} isPrivate />
      <Route path="/studentsStore" component={StudentsStore} isPrivate />
      <Route path="/enrollments" component={Enrollments} isPrivate />
      <Route path="/enrollmentStore" component={EnrollmentStore} isPrivate />
      <Route path="/helpOrders" component={HelpOrders} isPrivate />
    </Switch>
  );
}
