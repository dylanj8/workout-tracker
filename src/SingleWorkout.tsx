import React from "react";
import { Link } from "react-router-dom";

const SingleWorkout = ({ workout }) => {
  return (
    <div className="rounded-md border-sky-400 border flex flex-col px-2 max-w-xs p-2">
      <div className="flex gap-2">
        <p className="font-bold">{workout[1].workout_title}</p>
        <p className="font-bold text-gray-400">{workout[1].date}</p>
      </div>

      <Link
        to={`/workout/${workout[0]}`}
        className="btn btn-accent px-2 mb-1 mt-2"
      >
        View Workout
      </Link>
    </div>
  );
};

export default SingleWorkout;
