import HeroImage from "../assets/hero_books.jpg";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Hero = () => {
  const { user } = useAuthStore();

  return (
    <section
      className="bg-gradient-to-r from-cream-1 to-white min-h-[90vh]
    pt-16 px-6 lg:px-20 pb-6 flex items-center overflow-hidden"
    >
      <div className="flex flex-col space-y-6 lg:flex-row items-center justify-between w-full gap-8 z-10">
        <div className="max-w-2xl space-y-6 text-center lg:text-left">
          <h1 className="text-[65px] font-bold text-brown-1 leading-tight font-playflair">
            Discover Your Next <br /> Favorite Book
          </h1>
          <p className="text-gray-500 text-xl">
            Explore our vast collection of books across all genres. From <br />
            bestsellers to hidden gems, find the perfect read for any <br />
            occasion.
          </p>

          {user ? (
            <div className="flex flex-col font-medium sm:flex-row gap-6 justify-center lg:justify-start">
              <Link to={"/search"}>
                <button className="bg-burgandy text-white px-10 py-3 rounded-md hover:bg-burgandy/90 cursor-pointer">
                  Browse Books →
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col font-medium sm:flex-row gap-6 justify-center lg:justify-start">
              <Link to={"/search"}>
                <button className="bg-burgandy text-white px-10 py-3 rounded-md hover:bg-burgandy/90 cursor-pointer">
                  Browse Books →
                </button>
              </Link>
              <Link to={"/signup"}>
                <button className="bg-gray-100 border border-gray-200 px-8 py-3 rounded-md hover:shadow-md cursor-pointer">
                  Join Today
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="w-full max-w-2xl bg-[linear-gradient(to_right,_white,_#D4AF37,_white)] py-5 relative rounded-2xl">
          <img
            src={HeroImage}
            alt="Hero Books"
            className="w-full h-[65vh] rotate-[-5deg] rounded-2xl object-cover z-10 relative  shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
