import React from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ForgotPassword, Login, ResetPassword, SetPassword } from "./auth";
import { routes } from "../utils";
import { AuthenticationStatus } from "../redux/reducers/auth";
import { OnlyWith } from "../components";
import Dashboard from "./dashboard";

const Screens: React.FC = () => {
  return (
    <>
      <OnlyWith status={AuthenticationStatus.AUTHENTICATED}>
        <Switch>
          
        </Switch>
      </OnlyWith>
      <OnlyWith status={AuthenticationStatus.NOT_AUTHENTICATED}>
        <Switch>
          <Route path={routes.login} component={Login} />
          <Route path={routes.forgotPassword} component={ForgotPassword} />
          <Route path={routes.resetPassword} component={ResetPassword} />
          <Route path={routes.setPassword} component={SetPassword} />
          <Route path={routes.dashboard.root} component={Dashboard} />
          
          <Route component={() => <Redirect to={routes.login} />} />
        </Switch>
      </OnlyWith>
    </>
  );
};

export default Screens;
