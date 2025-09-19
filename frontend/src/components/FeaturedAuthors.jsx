import nasim from "../assets/authors/nasim.jpeg";
import orwell from "../assets/authors/orwell.jpg";
import dostoevsky from "../assets/authors/dostoevsky.jpg";
import hawking from "../assets/authors/hawking.jpg";
import harari from "../assets/authors/harari.jpg";
import daniel from "../assets/authors/daniel.jpg";

const FeaturedAuthors = () => {
  const authors = [
    {
      name: "Nassim Nicholas Taleb",
      imageUrl: nasim,
    },
    {
      name: "George Orwell",
      imageUrl: orwell,
    },
    {
      name: "Fyodor Dostoevsky",
      imageUrl: dostoevsky,
    },
    {
      name: "Stephen Hawking",
      imageUrl: hawking,
    },
    {
      name: "Daniel Kahnamen",
      imageUrl: daniel,
    },
    {
      name: "Yuval Noah Harari",
      imageUrl: harari,
    },
  ];

  return (
    <section className="bg-red-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold font-playflair tracking-tight text-white sm:text-4xl">
          Featured Authors
        </h2>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {authors.map((author) => (
            <div key={author.name} className="flex flex-col items-center">
              <img
                className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-lg"
                src={author.imageUrl}
                alt={`Portrait of ${author.name}`}
              />
              <h3 className="mt-4 text-md font-medium text-white">
                {author.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAuthors;
