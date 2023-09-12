"use client";
// import CardBook from "@/components/CardBook";
import BookCard from "@/components/test/BookCard";
import { useEffect, useState } from "react";

type ListBook = {
    id: string;
    image: string;
    title: string;
    autor: string;
    description: string;
};

type jsonResonseGetBooks = {
    statu: "Ok" | "Error";
    data: ListBook[];
};

const Page = () => {
    const [listBook, setListBook] = useState<ListBook[]>();

    const handleGetBooks = async () => {
        let res = await fetch(
            "http://localhost/book_time_si/api/get_books.php"
        );
        const dataJson: jsonResonseGetBooks = await res.json();

        if (dataJson.statu == "Ok") {
            setListBook(dataJson.data);
        }
    };
    useEffect(() => {
        handleGetBooks();
    }, []);

    return (
        <main>
            <h1 className="text-white bg-amber-500 font-semibold text-center text-xl font-serif w-full">
                Libros
            </h1>
            <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-blue-400">
                {listBook?.map((book) => (
                    <BookCard
                        key={book.id}
                        id={book.id}
                        url={"product?id=" + book.id}
                        image={
                            "http://localhost/book_time_si/api/get_image_by_id.php?id=" +
                            book.image
                        }
                        title={book.title}
                        autor={book.autor}
                        description={book.description}
                    />
                ))}
            </div>
        </main>
    );
};

export default Page;
