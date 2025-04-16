import React from "react";

function Navbar() {
  return (
    <main>
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 lg:py-8 px-4 sm:px-8 lg:px-15">
        <div className="flex flex-col sm:flex-row justify-center items-center mb-4 sm:mb-0 w-full sm:w-auto">
          <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-0">
            DENOVO.
          </div>
          <div className="font-medium text-indigo-500 cursor-pointer bg-indigo-200 px-4 py-2 rounded-md  sm:ml-6 lg:ml-25">
            Home
          </div>
          <div className="font-medium text-gray-600 cursor-pointer  sm:ml-6 lg:ml-10">
    
            Hello, User!
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <ul className="flex justify-center sm:justify-end items-center space-x-3 sm:space-x-8">
            <li className="font-medium text-indigo-600 rounded-lg hover:text-indigo-400 cursor-pointer text-sm sm:text-base">
              Log In
            </li>
            <li className="px-4 sm:px-5 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-400 cursor-pointer text-sm sm:text-base">
              Sign Up
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Navbar;
