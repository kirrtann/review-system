const About = () => {
  return (
    <section className="p-6 pt-10 max-w-3xl mx-auto h-screen text-gray-200">
      <h1 className="text-2xl font-bold mb-6">About This App</h1>
      <p className="mb-4">
        This is a
        <span className="font-semibold">
          Movie & Web Series Review and Recommendation System
        </span>
        . It allows users to explore reviews and ratings from the public,
        including insights on:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Movies and Web Series reviews</li>
        <li>Actor performance reviews</li>
        <li>Director reviews</li>
        <li>Audience ratings & responses</li>
        <li>Personalized recommendations</li>
      </ul>
      <p className="mt-6">
        The goal of this platform is to bring together movie lovers and provide
        <span className="font-semibold">authentic public feedback</span> to help
        you decide what to watch next.
      </p>
      <p className="mt-4 text-blue-300">
        When you watch or search for any movie, the system will also suggest
        similar movies and web series — so you always find something new to
        enjoy!
      </p>
    </section>
  );
};
export default About;
