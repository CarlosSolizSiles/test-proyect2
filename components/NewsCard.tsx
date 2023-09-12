import React, { FC } from "react";

interface NewsCardProps {
    title: string;
    content: string;
    date: string;
    imageUrl: string;
}

const NewsCard: FC<NewsCardProps> = ({ title, content, date, imageUrl }) => {
    return (
        <a
            href={"notice?date=" + date}
            className="w-full h-48 left-0 top-0 cursor-pointer shadow-lg "
        >
            <img
                src={imageUrl}
                alt={title}
                className="max-w-full max-h-full mx-auto"
            />
            <div className="absolute w-full h-full text-gray-300 z-10 left-0 top-0 p-2 bg-black bg-opacity-50 border-[3px] border-blue-400 rounded-md ">
                <h3 className="news-title text-center text-lg font-semibold">
                    <u>{title}</u>
                </h3>
                <p className="news-text">{content}</p>
            </div>
        </a>
    );
};

export default NewsCard;
