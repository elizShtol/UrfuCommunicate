import React from 'react'
import {connect} from "react-redux";
import Auth from "../components/Auth/Auth";
import {hideAlert, setError} from "../redux/actions/sessionActions";

const AuthContainer = ({...rest}) => {
    return (
        <Auth {...rest} />
    )
}

const mapStateToProps = state => ({
    error: state.session.errorMsg
})

const mapDispatchToProps = dispatch => {
    return ({
        setError: (data) => dispatch(setError(data)),
        hideAlert: () => dispatch(hideAlert())
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthContainer);