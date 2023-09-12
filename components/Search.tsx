import React, { useId, useState } from "react";
import { LuSearch } from "react-icons/lu";

const Search = () => {
    const [textForm, setTextForm] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(true);
    };

    const toggleClosed = () => {
        setIsOpen(false);
    };
    const formId = useId();
    return (
        <form
            className="flex sm:bg-white sm:shadow-lg rounded-md relative hola"
            onClick={toggle}
            onBlur={(event) => {
                if (event.relatedTarget == null) {
                    toggleClosed();
                }
            }}
        >
            <label htmlFor={formId} className="text-black w-10 h-10 p-2 max-sm:hover:bg-amber-400 sm:w-8 sm:h-8 max-sm:text-white">
                <LuSearch className="w-full h-full" />
            </label>
            <input
                type="search"
                id={formId}
                placeholder="Buscar..."
                className="p-1 pl-0 pr-2 outline-none sm:text-black bg-transparent font-light text-sm max-sm:w-0 max-sm:p-0 max-sm:pr-0"
                onChange={(e) => setTextForm(e.target.value)}
                value={textForm}
                autoComplete="false"
            />
            <div
                className={`absolute w-full h-64 bg-white top-14 sm:top-10 shadow-lg sm:rounded-md ${
                    isOpen && textForm !== "" ? "": "hidden"
                }`}
            ></div>
        </form>
    );
};

export default Search;
