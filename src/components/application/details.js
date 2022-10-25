import React, { useEffect } from 'react';
import { changeApplicationStatus, getApplication } from "../../services/applicationService";

import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { DownloadIcon, BackspaceIcon } from "@heroicons/react/outline";

const config = require('../../config');

function Details() {

    let params = useParams();
    let navigate = useNavigate();

    const applicationId = params.id;

    const [application, setApplication] = React.useState(null);
    const [status, setStatus] = React.useState(null);



    useEffect(() => {
        async function fetchData() {
            return (await getApplication(applicationId));
        }

        fetchData().then(app => setApplication(app.data));


    }, [applicationId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        changeApplicationStatus(applicationId, status)
            .then(() => {
                setApplication(application => ({ ...application, status: status }));
                toast.success("Status changed successfully");
                navigate("/applications");
            });
    };
    useEffect(() => {
    }, [application])


    return (
        <div className="container tw-my-10">
            <div className="d-flex justify-content-between">
            <h4>Application Details</h4>
                <h3>
                    <Link to="/applications" className="navbar-brand tw-text-gray-400">
                        Back to Applications
                        <BackspaceIcon className="tw-h-5 tw-w-5" />
                    </Link>
                </h3>
            </div>
            {
                application &&

                <div className="tw-space-y-3">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>First Name</strong>: {application.data.firstName}
                        </div>
                        <div className="col-md-6">
                            <strong>Last Name</strong>: {application.data.lastName}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Email</strong>: {application.data.email}
                        </div>
                        <div className="col-md-6">
                            <strong>Phone</strong>: {application.data.phoneNumber}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Address</strong>: {application.data.address}
                        </div>
                        <div className="col-md-6">
                            <strong>Date Of Birth</strong>: {application.data.dob}
                        </div>
                    </div>
                    <div className="row">

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <strong>
                                    <a href={`${application.data.cv}`}
                                    className="btn btn-danger tw-font-semibold tw-rounded-lg" target="_blank" rel="noreferrer">
                                    <DownloadIcon className="tw-h-5 tw-w-5" />
                                    Download CV
                                </a>
                            </strong>
                        </div>
                        <div className="col-md-6">
                            <strong>Status</strong>: {application.data.status}
                        </div>
                    </div>
                    <hr className="tw-border-gray-200 tw-border tw-border-2 " />
                    <h5 className="tw-mb-5">
                        Change Application Status
                    </h5>
                    {
                        application.data.status === "Pending" ?
                            <div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="tw-mb-3">
                                                <label htmlFor="status">Status</label>
                                                <select onChange={event => setStatus(event.target.value)}
                                                    required className="form-control" id="status">
                                                    <option value=""> select status</option>
                                                    <option value="Dropped">Dropped</option>
                                                    <option value="Passed">Passed</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                            : <div className="alert alert-info">Decision has been made</div>
                    }


                </div>
            }

        </div>
    );
}


export default Details;