import React, { Fragment, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { menuList } from "@/utils/fackData/menuList";
import getIcon from "@/utils/getIcon";

const Menus = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openSubDropdown, setOpenSubDropdown] = useState(null);
    const [activeParent, setActiveParent] = useState("");
    const [activeChild, setActiveChild] = useState("");
    const pathName = useLocation().pathname;

    const handleMainMenu = (e, name) => {
        e.preventDefault();
        if (openDropdown === name) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(name);
        }
    };

    const handleDropdownMenu = (e, name) => {
        e.preventDefault();
        e.stopPropagation();
        if (openSubDropdown === name) {
            setOpenSubDropdown(null);
        } else {
            setOpenSubDropdown(name);
        }
    };

    useEffect(() => {
        if (pathName !== "/") {
            const x = pathName.split("/");
            setActiveParent(x[1]);
            setActiveChild(x[2]);
            setOpenDropdown(x[1]);
            setOpenSubDropdown(x[2]);
        } else {
            setActiveParent("dashboards");
            setOpenDropdown("dashboards");
        }
    }, [pathName]);

    return (
        <>
            {menuList.map(({ dropdownMenu, id, name, path, icon }) => {
                return (
                    <li
                        key={id}
                        className={`nxl-item nxl-hasmenu ${activeParent === name ? "active nxl-trigger" : ""}`}
                    >
                        <Link 
                            to={path} 
                            className="nxl-link text-capitalize"
                            onClick={(e) => handleMainMenu(e, name)}
                        >
                            <span className="nxl-micon">{getIcon(icon)}</span>
                            <span className="nxl-mtext" style={{ paddingLeft: "2.5px" }}>
                                {name}
                            </span>
                            {dropdownMenu && dropdownMenu.length > 0 && (
                                <span className="nxl-arrow fs-16">
                                    <FiChevronRight />
                                </span>
                            )}
                        </Link>
                        {dropdownMenu && dropdownMenu.length > 0 && (
                            <ul
                                className={`nxl-submenu ${openDropdown === name ? "nxl-menu-visible" : "nxl-menu-hidden"}`}
                            >
                                {dropdownMenu.map(({ id, name, path, subdropdownMenu }) => {
                                    const x = name;
                                    return (
                                        <Fragment key={id}>
                                            {subdropdownMenu && subdropdownMenu.length > 0 ? (
                                                <li
                                                    className={`nxl-item nxl-hasmenu ${activeChild === name ? "active" : ""}`}
                                                >
                                                    <Link 
                                                        to={path} 
                                                        className="nxl-link text-capitalize"
                                                        onClick={(e) => handleDropdownMenu(e, x)}
                                                    >
                                                        <span className="nxl-mtext">{name}</span>
                                                        <span className="nxl-arrow">
                                                            <FiChevronRight />
                                                        </span>
                                                    </Link>
                                                    <ul
                                                        className={`nxl-submenu ${openSubDropdown === x
                                                            ? "nxl-menu-visible"
                                                            : "nxl-menu-hidden"
                                                            }`}
                                                    >
                                                        {subdropdownMenu.map(({ id, name, path }) => (
                                                            <li
                                                                key={id}
                                                                className={`nxl-item ${pathName === path ? "active" : ""}`}
                                                            >
                                                                <Link
                                                                    className="nxl-link text-capitalize"
                                                                    to={path}
                                                                >
                                                                    {name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ) : (
                                                <li
                                                    className={`nxl-item ${pathName === path ? "active" : ""}`}
                                                >
                                                    <Link className="nxl-link" to={path}>
                                                        {name}
                                                    </Link>
                                                </li>
                                            )}
                                        </Fragment>
                                    );
                                })}
                            </ul>
                        )}
                    </li>
                );
            })}
        </>
    );
};

export default Menus;