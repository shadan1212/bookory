import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";
import BookList from "../components/BookList";
import FeaturedBookList from "../components/FeaturedBookList";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import WhyUs from "../components/WhyUs";
import { useEffect } from "react";

const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get("scroll");

    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="mt-18">
      <Hero />
      <WhyUs />
      <BookList />
      <FeaturedBookList />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Homepage;
