"use client";
import { ReactNode } from "react";

const PrintButton = ({ children }: { children: ReactNode }) => {
  return (
    <button
      onClick={() => window.print()}
      className="flex justify-center gap-2 items-center mx-auto my-4 text-white bg-secondary/90 border-0 p-2 pl-4 pr-6 px-8 rounded-lg ease-in-out duration-300 text-sm hover:bg-secondary/100 focus:outline-none"
    >
      <svg
        className="flex-shrink-0 w-6 h-6 text-secondary"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#000000"
        strokeWidth="0.00004000000000000003"
      >
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="#CCCCCC"
          strokeWidth="0.4640000000000001"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.25 3.75H6.75V7.5H4.5L3.75 8.25V16.5L4.5 17.25H6.75V21H17.25V17.25H19.5L20.25 16.5V8.25L19.5 7.5H17.25V3.75ZM8.25 19.5V17.25V15.75V15H15.75V15.75V17.25V19.5H8.25ZM17.25 13.5V15.75H18.75V9H5.25V15.75H6.75V13.5H17.25ZM15.75 7.5V5.25H8.25V7.5H15.75ZM16.5 12V10.5H15V12H16.5Z"
            fill="#ffffff"
          ></path>{" "}
        </g>
      </svg>
      {children}
    </button>
  );
};

export default PrintButton;
