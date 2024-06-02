import React from 'react'
import { Link } from 'react-router-dom';

const Breadcrumb = ({ paths }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {paths.map((path, index) => (
                    <li key={index} className="inline-flex items-center">
                        {index !== paths.length - 1 ? (
                            <>
                                <Link to={path.href} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    {path.icon && <path.icon className="mr-2 w-4 h-4" />}
                                    {path.name}
                                </Link>

                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12L10 8L6 4" stroke="#C3C6D5" strokeWidth="1.42222" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </>
                        ) : (
                            <span className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
                                {path.icon && <path.icon className="mr-2 w-4 h-4" />}
                                {path.name}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;