"use client";
import React, { useState, useRef, useEffect } from "react";
import { createSlug } from "@/lib/utils";
import { FAQ } from "@/types";

interface FaqItemProps {
  faq: FAQ;
}

const FaqItem = ({ faq }: FaqItemProps) => {
  const [open, setOpen] = useState(false);
  const contentContainer = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const toggleOpen = () => {
    if (contentContainer.current && contentContainer.current.offsetHeight) {
      setContentHeight(contentContainer.current.offsetHeight);
    }
    setOpen((cur) => !cur);
  };

  useEffect(() => {
    if (contentContainer.current && contentContainer.current.offsetHeight) {
      setContentHeight(contentContainer.current.offsetHeight);
    }

    if (typeof window !== "undefined") {
      // Access the anchor using window.location.hash
      const anchor = window.location.hash;
      if (anchor === `#${createSlug(faq.title)}`) {
        toggleOpen();
      }
    }
  }, [faq.title]);

  return (
    <div key={faq.id} className="faq-item" id={createSlug(faq.title)}>
      <div onClick={toggleOpen}>
        <button className="flex items-center focus:outline-none">
          <svg
            className="flex-shrink-0 w-6 h-6 text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H4"
              ></path>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            )}
          </svg>

          <h5 className="mx-4 text-white text-left">{faq.title}</h5>
        </button>
        <div
          className="transition-all duration-300 ease-in-out overflow-hidden"
          style={{
            transition: "height 0.3s ease-in-out 0s",
            height: open ? contentHeight : 0,
          }}
        >
          <div
            className="flex pt-8 mx-8"
            style={{ height: "auto" }}
            ref={contentContainer}
          >
            <div
              className="max-w-3xl px-2 text-gray-300"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
