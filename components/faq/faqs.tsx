"use client";
import React, { useState, useEffect } from "react";
import { Category, FAQ } from "@/types";
import FaqItem from "@/components/faq/faqItem";
import classNames from "classnames";

interface FaqProps {
  categories: Category[];
}

const filterCategories = (value: string, categories: Category[]) => {
  return categories.filter((category) => {
    return category.title.toLowerCase().indexOf(value.toLowerCase()) > -1;
  });
};

const Faqs = ({ categories }: FaqProps) => {
  const [activeCategory, setActiveCategory] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    console.log(activeCategory);
    setFilteredCategories(filterCategories(activeCategory, categories));
  }, [categories, activeCategory]);

  const toggleActiveCategory = (category: string) => {
    console.log("toggleActiveCategory", category);
    if (category !== "" && category === activeCategory) {
      setActiveCategory("");
    } else {
      console.log("setActiveCategory", category);
      setActiveCategory(category);
    }
  };

  return (
    <div className="flex mt-8 xl:mt-16 lg:-mx-12 gap-4">
      <aside className="md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky top-12 flex flex-col gap-2 p-2">
          <h3 className="text-white">Table of Content</h3>
          <div className="space-y-2 mt-2">
            {categories &&
              categories.map((category) => (
                <a
                  key={category.id}
                  // className="block text-gray-300 rounded bg:gray-800 hover:bg-gray-700 p-2 "
                  className={classNames(
                    "block text-gray-300 border border-transparent rounded hover:bg-white/20 p-2 cursor-pointer",
                    {
                      "text-white bg-white/50 border-gray-500 hover:border-grey-200":
                        category.title === activeCategory,
                    }
                  )}
                  onClick={() => toggleActiveCategory(category.title)}
                >
                  {category.title}
                  <svg
                    className="w-6 h-6 text-white inline float-right rotate-45"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {category.title === activeCategory ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      ></path>
                    ) : (
                      <></>
                    )}
                  </svg>
                </a>
              ))}
          </div>
        </div>
      </aside>
      <div className="md:w-2/3 lg:w-3/4 w-full min-h-screen">
        {filteredCategories &&
          filteredCategories.map((category) => (
            <div key={category.id} className="flex flex-col gap-2 p-2 mb-14">
              <h3>{category.title}</h3>
              <div className="space-y-4 mt-4">
                {category.faqs.map((faq: FAQ, i: number) => (
                  <div key={faq.id}>
                    <FaqItem faq={faq} />
                    {i + 1 < category.faqs.length && (
                      <hr className="my-8 border-white/25"></hr>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Faqs;
