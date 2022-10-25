import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap";
import http from "../services/httpService";
import { Player } from '@lottiefiles/react-lottie-player';
import { toast } from "react-toastify";


const config = require("../config.json");
const Home = (props) => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        cvAttachment: null
    });
    const [isLoading, setIsLoading] = useState(false);


    // On file select (from the pop up)
    const onFileChange = event => {
        // Update the state
        setFormData({
            ...formData,
            cvAttachment: event.target.files[0]
        });
    };

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let tempFormData = { ...formData };
        tempFormData[name] = value;
        setFormData(tempFormData);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const { tformData } = formData;

        // Create an object of formData
        const jsFormData = new FormData();
        for (let key in tformData) {
            jsFormData.append(key, tformData[key]);
        }

        setIsLoading(true);
        try {
            console.log(formData, "formData$$$$$$$$$$$")
            await http.post(config.apiUrl + "/application", jsFormData, {
                headers: {

                    Accept: "*",
                    "Content-Type": "multipart/form-data",
                }
            });
            toast.success("Application submitted successfully");
            props.history.push("/applications");
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
        }
        setIsLoading(false);
    }





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
                        <Form id="applicationForm" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3" controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" value={formData.firstName}
                                            onChange={handleChange} name="firstName" required
                                            placeholder="First Name" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3" controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" value={formData.lastName}
                                            onChange={handleChange} name="lastName" required
                                            placeholder="Last Name" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row" id="jumpTo">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3" controlId="phone">
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control type="tel" value={formData.phoneNumber} onChange={handleChange} required
                                            name="phoneNumber" placeholder="Phone number" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" value={formData.email}
                                            onChange={handleChange} name="email" required
                                            placeholder="Enter email" />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3" controlId="address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="address" value={formData.address} required
                                            onChange={handleChange}
                                            placeholder="Address" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3" controlId="dateOfBirth">
                                        <Form.Label>Date Of Birth</Form.Label>
                                        <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} required
                                            onChange={handleChange} placeholder="Date of Birth" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Form.Group className="mb-3" controlId="c">
                                        <Form.Label>Upload your CV</Form.Label>
                                        <input name="cv" className="form-control" onChange={onFileChange} accept="application/pdf" required
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
    )
}

export default Home