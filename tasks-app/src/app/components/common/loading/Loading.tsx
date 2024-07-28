import React from "react";
import Spinner from "./Spinner";

const Loading = () => {
    return (
        <div className="w-full h-[90vh] flex flex-col items-center justify-center">
            <div className="loading--wrapper flex flex-col items-center">
                <Spinner />
                <div className="text--content text-center font-semibold text-gray-600 mt-2">
                    Fetching details...
                </div>
            </div>
        </div>
    )
} 

export default Loading;
