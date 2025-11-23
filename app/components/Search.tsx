"use client";
import { useState, FormEvent } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function Search() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/search?timkiem=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 md:px-6 lg:px-8">
      <div className="shadow_search w-full flex items-stretch relative text-center rounded border border-[#ced4da] max-w-270 mx-auto">
        <input
          type="text"
          name="timkiem"
          placeholder="Search Stores"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-[#FFFFEE] search_input block leading-6 border-r border-[#ced4da] focus:border-[#86b7fe] px-4 py-2.5 text-[1.25rem] w-full focus:bg-white rounded-tl rounded-bl"
        />
        <button
          type="submit"
          className="px-10 flex items-center justify-center cursor-pointer"
        >
          <FiSearch />
        </button>
      </div>
    </form>
  );
}
