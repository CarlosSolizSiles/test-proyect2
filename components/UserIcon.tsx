import { checkCookie, deleteCookie } from "@/functions/cookies";
import React, { useEffect, useState } from "react";

const UserIcon = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    const toggleClosed = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        let isLogin = checkCookie("login");
        if (isLogin) {
            setIsLogin(true);
        }
    }, []);

    return (
        <button
            onClick={toggle}
            onBlur={(event) => {
                if (event.relatedTarget == null) {
                    toggleClosed();
                }
            }}
            className="w-10 h-10 relative"
        >
            <img
                src="https://images.vogue.it/users/my/avatar/riccardo_cara.png?v=1604258912"
                alt=""
                className="w-10 h-10 rounded-full"
            />
            <div
                className={`w-36 bg-amber-400 absolute top-11 right-0 rounded-md shadow-lg ${
                    isOpen ? "" : "hidden"
                }`}
            >
                <ul className="[&>li>a]:text-sm [&>li>a]:text-white grid p-2 text-left">
                    <li>
                        <a href="user">Ver cuenta</a>
                    </li>
                    <li>
                        <a href="">Configuraciones</a>
                    </li>
                    {isLogin ? (
                        <li>
                            <a
                                href="/"
                                onClick={() => {
                                    deleteCookie("login");
                                }}
                            >
                                Cerrar sesión
                            </a>
                        </li>
                    ) : (
                        <li>
                            <a href="login">Iniciar sesión</a>
                        </li>
                    )}
                </ul>
            </div>
        </button>
    );
};

export default UserIcon;
