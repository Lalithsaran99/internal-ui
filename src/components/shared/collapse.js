import React, { useState } from "react";
import classNames from "classnames";

const Collapse = (props) => {
  const { title, children, className } = props;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`${className} border rounded-lg mb-4`}>
      <div
        className={`${className} p-4 cursor-pointer flex justify-between items-center`}
        onClick={handleToggle}
      >
        <h2 className="text-xl">{title}</h2>
        <svg
          className={classNames("w-6 h-6 transition-transform", {
            "transform rotate-180": isCollapsed,
          })}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
      <div
        className={classNames("p-4 bg-gray-100 overflow-hidden", {
          "slide-right": isCollapsed,
          "slide-left": !isCollapsed,
        })}
      >
        <div
          className={classNames("max-w-0", { "max-w-[200px]": isCollapsed })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapse;
