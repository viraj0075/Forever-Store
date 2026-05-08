import React from "react";
import ContainerLayout from "../layouts/ContainerLayout";

const Subscribe = () => {
  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <ContainerLayout>
      <div className="text-center py-20">
        <p className="text-2xl font-medium text-gray-800">
          Subscribe now & get 20% off
        </p>
        <p className="text-gray-400 mt-3">
          Join our newsletter and stay up to date with our latest collections and exclusive offers.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="w-full sm:w-1/2 flex flex-col sm:flex-row items-center gap-0 mx-auto my-6 border border-gray-300 rounded-md overflow-hidden"
        >
          <input
            className="w-full sm:flex-1 outline-none py-3 px-4 text-sm"
            type="email"
            placeholder="Enter your email"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-black text-white text-xs px-10 py-4 font-bold transition-all hover:bg-gray-800"
          >
            SUBSCRIBE
          </button>
        </form>

      </div>
    </ContainerLayout>
  );
};

export default Subscribe;
