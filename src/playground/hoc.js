// Higher order component (HOC) - a component that renders another component
// Reuse code
// Render hijacking
// prop manipulation
// abstract state


import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info} </p>
    </div>
);

const withAdminWarning= (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info, please do not share!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
}

const requireAuthentication= (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (<WrappedComponent {...props}/>) : (<h1>Please login to see the information!</h1>)}
        </div>
    );
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info='React Training' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info='React Training' />, document.getElementById('app'));