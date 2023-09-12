import React, { useEffect, useState } from "react";
import {
    IoSettingsOutline,
    IoHomeOutline,
    IoStarOutline,
    IoChatbubbleOutline,
} from "react-icons/io5";
import { BiDonateHeart } from "react-icons/bi";
import { ImFire, ImBook } from "react-icons/im";
import Link from "next/link";

interface ToggleValueMap {
    [key: string]: number;
}

const toggleValueMap: ToggleValueMap = {
    "": 1,
    books: 2,
    favorites: 3,
    popular: 4,
    donations: 5,
    contacts: 6,
    settings: 7,
};

const icons = [
    [
        IoHomeOutline,
        ImBook,
        IoStarOutline,
        ImFire,
        BiDonateHeart,
        IoChatbubbleOutline,
    ],
    [IoSettingsOutline],
];

const routes = [
    ["/", "/books", "/favorites", "/popular", "/donations", "/contacts"],
    ["/settings"],
];

const section = [
    ["Inicio", "Libros", "Favoritos", "Populares", "Donaciones", "Contactos"],
    ["Configuraciones"],
];

const getLinkClassName = (index: number, base: number) => {
    return index === base ? "toggle" : "";
};

const AsideBar: React.FC = () => {
    const [toggled, setToggled] = useState(0);

    useEffect(() => {
        const { pathname } = window.location;
        const strippedPathname =
            pathname.split("/").filter(Boolean).pop() || "";
        const toggleValue = toggleValueMap[strippedPathname] || 1;
        setToggled(toggleValue);
    }, []);

    return (
        <aside className="h-[calc(100vh_-_3.5rem)] bg-amber-500 shadow-2xl transition-all ease-in-out duration-500 px-1 py-9 flex flex-col justify-between w-14 max-sm:-left-14 lg:w-64 max-sm:absolute z-10 menu">
            {routes.map((group, groupIndex) => (
                <ul
                    key={groupIndex}
                    className="grid text-white [&>li]:overflow-hidden [&>li]:p-1 [&>li>a]:flex [&>li>a]:w-full [&>li>a]:items-center [&>li>a]:gap-2 [&>li>a>div]:h-10 [&>li>a>div]:w-10 [&>li>a>div]:min-w-[40px] [&>li>a>div]:p-2"
                >
                    {group.map((route, routeIndex) => (
                        <li key={route}>
                            <Link
                                href={route}
                                className={getLinkClassName(
                                    toggled,
                                    groupIndex * 6 + routeIndex + 1
                                )}
                                onClick={() =>
                                    setToggled(groupIndex * 6 + routeIndex + 1)
                                }
                            >
                                <div>
                                    {React.createElement(
                                        icons[groupIndex][routeIndex],
                                        {
                                            className: "w-full h-full",
                                        }
                                    )}
                                </div>
                                {section[groupIndex][routeIndex]}
                            </Link>
                        </li>
                    ))}
                </ul>
            ))}
        </aside>
    );
};

export default AsideBar;
