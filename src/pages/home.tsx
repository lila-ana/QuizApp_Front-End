import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="m-4 p-4 rounded-full bg-gray-200">
      <Link className="underline underline-offset-8" to="./quizPage">
        <p>Go to Quiz Page</p>
      </Link>
    </div>
  );
};

export default Home;
