import { Book, ShoppingBag, UserCheck } from "lucide-react";
import React from "react";

const WhyUs = () => {
  return (
    <section className="p-15">
      <div className="flex flex-col space-y-20 justify-center items-center">
        <h1 className="text-brown-1 text-4xl font-bold font-playflair">
          Why Choose Bookory
        </h1>
        <div className="flex flex-col lg:flex-row gap-35">
          <div className="space-y-4 flex flex-col items-center">
            <div className="h-18 w-18 bg-cream-1 rounded-full flex items-center justify-center">
              <Book className="w-8 h-8 text-burgandy" />
            </div>

            <h1 className="font-playflair text-xl font-bold">
              Extensive Collection
            </h1>
            <p className="text-center text-gray-500">
              Discover thousands of titles across all genres, <br />
              from bestsellers to rare finds.
            </p>
          </div>
          <div className="space-y-4 flex flex-col items-center">
            <div className="h-18 w-18 bg-cream-1 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-burgandy" />
            </div>

            <h1 className="font-playflair text-xl font-bold">Fast Delivery</h1>
            <p className="text-center text-gray-500">
              Get your books delivered quickly and safely to <br /> your
              doorstep.
            </p>
          </div>
          <div className="space-y-4 flex flex-col items-center">
            <div className="h-18 w-18 bg-cream-1 rounded-full flex items-center justify-center">
              <UserCheck className="w-8 h-8 text-burgandy" />
            </div>

            <h1 className="font-playflair text-xl font-bold">
              Personalized Recommendations
            </h1>
            <p className="text-center text-gray-500">
              Get tailored book suggestions based on your <br /> reading history
              and preferences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
