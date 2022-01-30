import React from 'react';
import NavbarComponent from './Navbar';
//import FooterController from './Footer';

function Layout(props) {
    //const children = props.children;
    return (
        <React.Fragment>
            <NavbarComponent />
            {props.children}
            {/* <FooterController /> */}
        </React.Fragment>
    );
}

export default Layout;