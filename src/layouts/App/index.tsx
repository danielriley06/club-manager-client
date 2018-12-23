import * as React from "react";
import { connect } from "react-redux";
import childRouteSelector from "../../store/selectors/childRoute";

export interface IAppProps {
  childRoute: React.ReactNode;
}

const App: React.FunctionComponent<IAppProps> = ({ childRoute }) => (
  <div>{childRoute}</div>
);

export default connect(childRouteSelector())(App);
