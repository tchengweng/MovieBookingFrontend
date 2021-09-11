import { Fragment } from "react";
import Header from "./Header";

//Layout component with Header
const Layout = (props) => {
  return (
    <Fragment>
      <Header/>
      <main >{props.children}</main>
    </Fragment>
  );
};

export default Layout;
