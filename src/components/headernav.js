import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Auth, Hub, Logger } from 'aws-amplify';
import Helmet from "react-helmet"
import { AmplifySignOut } from '@aws-amplify/ui-react';

//Header area of admin dashboard
const Navigator = () => {

    // function to sign out button
    async function signOut() {
        try {
            //calling amplify signout function
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <div class="navbar-nav ml-auto">
                            <AmplifySignOut onClick={signOut} /></div>
                    </Navbar>
                    <br />

                </div>
            </div>
        </div>
    )
}

export default Navigator