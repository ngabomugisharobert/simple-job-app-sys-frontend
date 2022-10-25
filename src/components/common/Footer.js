import {Component} from "react";

class Footer extends Component {
    render() {
        return <footer
            className="bg-light tw-text-dark tw-text-center tw-py-4 tw-flex tw-justify-center tw-items-center tw-text-sm tw-mt-5">
            <div>
            <p className="tw-mb-0">
                    &copy; Copyright {new Date().getFullYear()}
            </p>
                <p>Designed by
                    <a href="https://nmrobert.com" target="_blank" rel="noreferrer">NMRobert</a>
                </p>
            </div>
        </footer>;
    }
}

export default Footer;