import React, { Component } from 'react';
import './SMSForm.css';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect, withRouter } from 'react-router-dom';


// function SMScheck(check){
//     if (check === 'success'){

//     } else {
//         console.log('something went wrong');
//         this.context.router.history.push('/error');
//     }
// }

// function SMScheck(check) {
//     let history = useHistory();

//     function handlecheck(check) {
//       if (check === 'success'){

//       } else {
//           console.log('something went wrong');
//           this.context.router.history.push('/error');
//       }
//     }
// }


class SMSForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: {
                phone: ''
            },
            submitting: false,
            error: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
    }
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };



    onSubmit(event) {
        // let history = useHistory();
        event.preventDefault();

        this.setState({ submitting: true });
        fetch('/api/concert-promo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.message)
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {
                    // SMScheck('success');
                    this.setState({
                        error: false,
                        submitting: false,
                        message: {
                            phone: ''
                        }
                    });
                    this.props.history.push('/success');
                } else {
                    // this.context.router.history.push('/error');


                    console.log('something went wrong!');
                    this.setState({
                        error: true,
                        submitting: false
                    });
                    this.props.history.push('/error');
                }

            });
    }


    onHandleChange(event) {
        const name = event.target.getAttribute('name');

        this.setState({
            message: { ...this.state.message, [name]: event.target.value }
        });
    }


    render() {
        return (
            <div className="row">
                <div className="col"></div>
                <div className="col-md-5">
                <img src="promo.png" className="App-logo" alt="promo" />
                    <form
                        onSubmit={this.onSubmit}
                        className="sms-form"
                    >
                        <div className="row">
                            <div className="col-md-4">
                                <label htmlFor="phone">Your phone number:</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={this.state.message.phone}
                                    onChange={this.onHandleChange}
                                />
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-6 form-check">
                                <label htmlFor="agreed" className="form-check-label">I am over 18: </label>
                            </div>
                            <div className="col-md-2">
                                <input className="form-check-input" type="checkbox" required name="agreed" />
                            </div>
                            <div className="col"></div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 form-check">
                                <label htmlFor="agreed" className="form-check-label">I accept the terms and conditions: </label>
                            </div>
                            <div className="col-md-2">
                                <input className="form-check-input" type="checkbox" required name="agreed" />
                            </div>
                            <div className="col"></div>
                        </div>

                        <div className="row">
                            <div className="col"></div>
                            <div className="col-sm-6">
                                <button type="submit" >
                                    Send Me My Promo
                                </button>
                            </div>
                            <div className="col"></div>
                        </div>

                    </form>
                </div>
                <div className="col"></div>
            </div>

        );
    }

}
// disabled={this.state.submitting}
// export default SMSForm;
export default withRouter(SMSForm);