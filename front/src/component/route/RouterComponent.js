import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UserListComponent from '../user/UserListComponent';
import AddUserComponent from "../user/AddUserComponent";
import EditUserComponent from "../user/EditUserComponent";

const AppRouter = () => {
    return(
        <>
            <BrowserRouter>
            <div style={style}>
                <Routes>
                    <Route exact path="/" component={UserListComponent}/>
                    <Route path="/users" component={UserListComponent}/>
                    <Route path="/add-users" component={AddUserComponent}/>
                    <Route path="/edit-users" component={EditUserComponent}/>
                </Routes>
            </div>
            </BrowserRouter>
        </>
    );
}

const style = {
    color: 'red',
    margin: '10px',
}

export default AppRouter;