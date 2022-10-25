import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import http from "../services/httpService";
import { Player } from '@lottiefiles/react-lottie-player';
import { toast } from "react-toastify";


const config = require("../config.json");


class Home extends Component {

    emptyForm = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        cvAttachment: null
    };

    constructor(props) {
        super(props);
        this.state = {
            formData: this.emptyForm,
            isLoading: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // On file select (from the pop up)
    onFileChange = event => {
        // Update the state
        this.setState({
            formData: {
                ...this.state.formData,
                cvAttachment: event.target.files[0]
            }
        });
    };

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let formData = { ...this.state.formData };
        formData[name] = value;
        this.setState({ formData });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { formData } = this.state;

        // Create an object of formData
        const jsFormData = new FormData();
        for (let key in formData) {
            jsFormData.append(key, formData[key]);
        }

        this.setState({ isLoading: true });
        console.log(jsFormData, "jsFormData");
        http.post(config.apiUrl + "/application/", jsFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                this.setState({ isLoading: false });
                toast.success("Application submitted successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                this.setState({ formData: this.emptyForm });
            })
            .catch(error => {
                this.setState({ isLoading: false });
                toast.error("Error submitting application");
            });
    };


    render() {
        const { formData, isLoading } = this.state;
        return (
            <>
                <section className="py-5 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">
                                Apply Here
                            </h1>
                            <Player loop autoplay style={{ width: '200px', height: '200px' }}
                                src='https://assets6.lottiefiles.com/packages/lf20_3x2klxoo.json'
                                className="player"
                            />
                        </div>
                    </div>
                </section>

                <section className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-9 col-lg-8">

                            <p className="lead text-muted">
                                Fill in the form below to apply for the job
                            </p>
                            <Form id="applicationForm" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3" controlId="firstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" value={formData.firstName}
                                                onChange={this.handleChange} name="firstName" required
                                                placeholder="First Name" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3" controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" value={formData.lastName}
                                                onChange={this.handleChange} name="lastName" required
                                                placeholder="Last Name" />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row" id="jumpTo">
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3" controlId="phone">
                                            <Form.Label>Phone number</Form.Label>
                                            <Form.Control type="tel" value={formData.phoneNumber} onChange={this.handleChange} required
                                                name="phoneNumber" placeholder="Phone number" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" value={formData.email}
                                                onChange={this.handleChange} name="email" required
                                                placeholder="Enter email" />
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3" controlId="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" name="address" value={formData.address} required
                                                onChange={this.handleChange}
                                                placeholder="Address" />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group className="mb-3" controlId="dateOfBirth">
                                            <Form.Label>Date Of Birth</Form.Label>
                                            <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} required
                                                onChange={this.handleChange} placeholder="Date of Birth" />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Form.Group className="mb-3" controlId="c">
                                            <Form.Label>Upload your CV</Form.Label>
                                            <input name="cv" className="form-control" onChange={this.onFileChange} accept="application/pdf" required
                                                type="file" />
                                        </Form.Group>
                                    </div>
                                </div>




                                <Button variant="primary" type="submit" disabled={isLoading}>
                                    Apply
                                </Button>
                            </Form>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Home;