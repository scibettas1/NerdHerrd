import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function CustomLink({ to, children }) {
  const history = useHistory();

  function delayAndGo(e) {
    e.preventDefault();
    // const { history: { push } } = this.props;

    setTimeout(() => history.push(to), 1000);
  }

  return (
    <Link to={to} onClick={delayAndGo}>
      {children}
    </Link>
  );
}