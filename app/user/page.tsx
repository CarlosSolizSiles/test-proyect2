"use client";
import {
    checkCookie,
    createCookie,
    deleteCookie,
    getCookieUserId,
} from "@/functions/cookies";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

type Data = {
    DNI: string;
    name: string;
    last_name: string;
    addres: string;
    email: string;
};

type jsonResonseGetUserById = {
    statu: "Ok" | "Error";
    data: Data;
};

type jsonResonseUpdateUser = {
    statu: "Ok" | "Error";
    message: string;
};

const page = () => {
    const [data, setData] = useState<Data>({
        DNI: "",
        name: "",
        last_name: "",
        addres: "",
        email: "",
    });
    const handleGetUser = async () => {
        try {
            const valueId = getCookieUserId("login");
            let res = await fetch(
                `http://localhost/book_time_si/api/get_user_by_id.php?id=${valueId}`
            );
            const dataJson: jsonResonseGetUserById = await res.json();
            console.log(dataJson);

            if (dataJson.statu == "Ok") {
                setData(dataJson.data);
            } else {
                throw dataJson.statu;
            }
        } catch {}
    };
    const handleOnSUbmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const valueId = getCookieUserId("login");
        const formulario = new FormData(event.target as HTMLFormElement);
        formulario.append("id", valueId as string);
        let res = await fetch(
            "http://localhost/book_time_si/api/update_user.php",
            {
                method: "post",
                body: formulario,
            }
        );

        const dataJson: jsonResonseUpdateUser = await res.json();

        if (dataJson.statu == "Ok") {
            deleteCookie("login");
            createCookie("login", formulario.get("DNI") as string, 2);
            swal(
                "Se aplico los nuevos cambios",
                "Presione 'Ok' para continuar",
                "success"
            );
        } else {
            swal(
                "Hubo un error con los datos enviados",
                "Presione 'Ok' para continuar",
                "error"
            );
        }
    };
    useEffect(() => {
        let isLogin = checkCookie("login");
        if (!isLogin) {
            window.location.href = "/login";
        }
        handleGetUser();
    }, []);

    return (
        <main className="h-full">
            <form
                className="flex flex-col h-full"
                action="post"
                onSubmit={handleOnSUbmit}
            >
                <div className="flex-1 w-full grid sm:grid-cols-2 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-8 gap-4">
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label
                                htmlFor="DNI"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Tu DNI
                            </label>
                            <input
                                type="text"
                                name="DNI"
                                id="DNI"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="DNI"
                                required
                                defaultValue={data.DNI}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Tu Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name"
                                required
                                defaultValue={data.name}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="last_name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Tu Apellido
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="last name"
                                required
                                defaultValue={data.last_name}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Tu Direcion
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="street number"
                                required
                                defaultValue={data.addres}
                            />
                        </div>
                    </div>
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Nuevo email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                required
                                defaultValue={data.email}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password_check"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Confirmar Contraseña
                            </label>
                            <input
                                type="password"
                                name="password_check"
                                id="password_check"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                        <div className="h-9 flex justify-center items-center p-8">
                            <button
                                type="button"
                                className="w-28 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="w-28 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                Aplicar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default page;
