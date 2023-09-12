import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const Notifications = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const toggleClosed = () => {
        setIsOpen(false);
    };

    return (
        <button
            onClick={toggle}
            onBlur={(event) => {
                if (event.relatedTarget == null) {
                    toggleClosed();
                }
            }}
            className="w-10 h-10 relative p-2 hover:bg-amber-400 transition ease-in-out duration-500"
        >
            <IoNotificationsOutline className="w-full h-full" />
            <div
                className={`w-64 bg-amber-400 absolute top-11 right-0 rounded-md shadow-lg ${
                    isOpen ? "" : "hidden"
                }`}
            >
                <div className="h-36 w-full"></div>
            </div>
        </button>
    );
};

export default Notifications;
