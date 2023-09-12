"use client";
import { getCookieUserId } from "@/functions/cookies";
import React, { useEffect, useState } from "react";

type DataProps = {
    name: string;
    description: string;
    image_id: string;
};

type DataJsonExisteFila = {
    statu: "Ok" | "Error";
    messager: string;
};

type DataJsonManageFavorite = {
    statu: "Ok" | "Error";
    messager: string;
};

const page = () => {
    const [data, setData] = useState<DataProps>({
        name: "",
        description: "",
        image_id: "",
    });
    const [isFavorite, setIsFavorite] = useState(false);

    const handleExisteFile = async (id: string | null) => {
        try {
            const user_id = getCookieUserId("login");
            let res = await fetch(
                `http://localhost/book_time_si/api/existe_fila.php?fk_book_id=${id}&fk_user_id=${user_id}`
            );
            const dataJson: DataJsonExisteFila = await res.json();
            setIsFavorite(dataJson.statu == "Ok");
        } catch {}
    };
    const handleManageFavorite = async (id: string | null) => {
        try {
            const user_id = getCookieUserId("login");
            let res = await fetch(
                `http://localhost/book_time_si/api/manage_favorites.php?fk_book_id=${id}&fk_user_id=${user_id}`
            );
            const dataJson: DataJsonManageFavorite = await res.json();
            console.log(dataJson);
        } catch {}
    };
    useEffect(() => {
        let url_string = window.location.href; // www.test.com?filename=test
        let url = new URL(url_string);
        let paramValue = url.searchParams.get("id");
        fetch(
            `http://localhost/book_time_si/api/get_book_by_id.php?id=${paramValue}`
        )
            .then((x) => x.json())
            .then((x) => {
                setData(x["data"]);
            });
        handleExisteFile(paramValue);
    }, []);
    return (
        <main className="max-w-screen-lg h-full mx-auto">
            <div className="grid md:grid-cols-2 h-full w-full gap-4">
                <div className="bg-blue-500 p-4 flex flex-col gap-8 rounded-xl shadow-lg">
                    <h2 className="h-24 flex justify-center items-center text-2xl text-center font-bold">
                        {data.name}
                    </h2>
                    <div className="h-96 w-full px-4 flex justify-center items-center">
                        <img
                            src={`http://localhost/book_time_si/api/get_image_by_id.php?id=${data.image_id}`}
                            alt="imagen producto"
                            className=""
                        />
                    </div>
                    <p className="flex-1 p-4 font-medium">{data.description}</p>
                </div>
                <div className="bg-blue-500 rounded-xl shadow-lg flex flex-col w-full p-4">
                    <div className="grid grid-cols-1  px-6 h-44 justify-center items-center w-full">
                        <button
                            type="button"
                            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={() => {
                                setIsFavorite((value) => !value);
                                if (!getCookieUserId("login") == null) {
                                    return;
                                }
                                let url_string = window.location.href; // www.test.com?filename=test
                                let url = new URL(url_string);
                                let paramValue = url.searchParams.get("id");
                                handleManageFavorite(paramValue);
                            }}
                        >
                            {isFavorite
                                ? "Eliminar Favoritos"
                                : "Agregar a Favoritos"}
                        </button>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        >
                            Pedir Prrestamos a domicilio
                        </button>
                    </div>
                    <div className="flex-1 bg-white w-full h-full px-6"></div>
                </div>
            </div>
        </main>
    );
};

export default page;
