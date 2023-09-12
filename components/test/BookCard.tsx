import { getCookieUserId } from "@/functions/cookies";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type PropsBookCard = {
    id: string;
    url: string;
    image: string;
    autor: string;
    title: string;
    description: string;
};

type DataJsonExisteFila = {
    statu: "Ok" | "Error";
    messager: string;
};

type DataJsonManageFavorite = {
    statu: "Ok" | "Error";
    messager: string;
};

const BookCard = ({
    id,
    url,
    image,
    autor,
    title,
    description,
}: PropsBookCard) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const handleExisteFile = async () => {
        try {
            const user_id = getCookieUserId("login");
            let res = await fetch(
                `http://localhost/book_time_si/api/existe_fila.php?fk_book_id=${id}&fk_user_id=${user_id}`
            );
            const dataJson: DataJsonExisteFila = await res.json();
            setIsFavorite(dataJson.statu == "Ok");
        } catch {}
    };
    const handleManageFavorite = async () => {
        try {
            const user_id = getCookieUserId("login");
            console.log(
                `http://localhost/book_time_si/api/manage_favorites.php?fk_book_id=${id}&fk_user_id=${user_id}`
            );
            let res = await fetch(
                `http://localhost/book_time_si/api/manage_favorites.php?fk_book_id=${id}&fk_user_id=${user_id}`
            );
            const dataJson: DataJsonManageFavorite = await res.json();
            console.log(dataJson);
        } catch {}
    };
    useEffect(() => {
        handleExisteFile();
    }, []);
    return (
        <div className="flex flex-col items-center w-300 p-10 px-6 border-2 border-solid border-gray-300 rounded-md">
            <img
                src={image}
                alt="Portada del libro"
                className="w-200 h-300 object-cover rounded-sm"
            />
            <h3 className="text-xl font-bold mt-10">{title}</h3>
            <p className="text-base mt-2">{autor}</p>
            <div className="flex justify-between mb-2 gap-4">
                <button
                    className="bg-pink-500 text-white py-2 px-4 rounded-sm focus:outline-none"
                    onClick={() => {
                        console.log(getCookieUserId("login"));
                        setIsFavorite((value) => !value);
                        if (!getCookieUserId("login") == null) {
                            return;
                        }
                        handleManageFavorite();
                    }}
                >
                    {isFavorite ? "Eliminar Favoritos" : "Agregar a Favoritos"}
                </button>
                <Link
                    href={url}
                    className="bg-blue-500 text-white py-2 px-4 rounded-sm focus:outline-none"
                >
                    Ver Producto
                </Link>
            </div>
        </div>
    );
};

export default BookCard;
