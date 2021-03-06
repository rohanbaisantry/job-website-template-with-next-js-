import Router from "next/router";
import React from "react";
import Link from "next/link";

import Loader from "./Loader";

import { resetDB } from "../utils/actions";

export default function Layout({ children }) {
    const [loading, setLoading] = React.useState(false);

    Router.onRouteChangeStart = (url) => {
        url.includes("/jobs/") && setLoading(true);
    };

    Router.onRouteChangeComplete = (url) => {
        setLoading(false);
    };

    Router.onRouteChangeError = (err, url) => {
        setLoading(false);
    };

    const onClickResetDB = async () => {
        setLoading(true);
        const result = await resetDB();
        setLoading(false);
        if (result) {
            Router.reload();
        }
    };

    return (
        <div className="bg-gray-100 w-full min-w-full flex flex-col min-h-screen">
            {/* MenuBar */}
            <div className="sticky top-0 w-full min-w-full z-10">
                <div className="container bg-white p-5 w-full min-w-full shadow opacity-100">
                    <nav className="flex-row md:justify-between">
                        <div className="flex flex-row justify-between text-lg leading-6 font-medium text-blue-500 items-center">
                            <div className="flex-grow">
                                <Link href="/">
                                    <a>HEALTH EXPLORE</a>
                                </Link>
                            </div>
                            <button
                                onClick={onClickResetDB}
                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-regular hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            >
                                Reset DB
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
            {/* Main */}
            <div className="mt-5 flex-grow">
                {loading ? (
                    <div className="flex items-center justify-center mt-10">
                        <Loader />
                    </div>
                ) : (
                    children
                )}
            </div>
            {/* Footer */}
            <div className="mt-10 py-10 px-10 bg-white w-full">
                <div className="text-center sm:text-left max-w-full md:max-w-screen-sm">
                    <div className="text-xl font-extrabold">About Us</div>
                    <div className="text-md">
                        We are a team of nurses, doctors, technologists and executives dedicated to
                        help nurses find jobs that they love.
                    </div>
                    <div className="mt-4 text-sm">
                        All copyrights reserved 2020 - Health Explore
                    </div>
                </div>
            </div>
        </div>
    );
}
