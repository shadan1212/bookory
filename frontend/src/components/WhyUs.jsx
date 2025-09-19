import { Library, Mail, User } from "lucide-react";

const features = [
  {
    icon: <Library className="h-10 w-10" />,
    title: "Extensive Collection",
    description:
      "Discover thousands of titles across all genres, from bestsellers to rare finds.",
  },
  {
    icon: <Mail className="h-10 w-10" />,
    title: "Fast Delivery",
    description:
      "Get your books delivered quickly and safely to your doorstep.",
  },
  {
    icon: <User className="h-10 w-10" />,
    title: "Personalized Recommendations",
    description:
      "Get tailored book suggestions based on your reading history and preferences.",
  },
];

const WhyUs = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold font-playflair tracking-tight text-[#7a5b3a] sm:text-4xl">
            Why Choose Bookory
          </h2>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-yellow-100 text-burgandy">
                {feature.icon}
              </div>
              {/* Title */}
              <h3 className="mt-6 text-lg font-bold text-stone-900">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="mt-2 text-base text-stone-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
