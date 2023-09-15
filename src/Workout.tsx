import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { format } from "date-fns";
import SingleWorkout from "./SingleWorkout";
import { useAuth } from "./UserProvider";
import { Link } from "react-router-dom";

export type WorkoutType = {
  workout_title: string;
  date: Date | string;
  name: string;
  reps: number;
  sets: number;
  weight: number;
};

const Workout = () => {
  const { user, signOut } = useAuth();
  const [exercises, setExercises] = useState<WorkoutType>({
    workout_title: "",
    date: "",
    name: "",
    reps: 0,
    sets: 0,
    weight: 0,
  });
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [workoutTitle, setWorkoutTitle] = useState<string | "">("");

  const [fetchedWorkouts, setFetchedWorkouts] = useState<WorkoutType[] | []>(
    []
  );

  const workoutTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setWorkoutTitle(title);
  };

  const exerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExercises({ ...exercises, [name]: value });
  };

  const addWorkout = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentDate = format(new Date(), "dd/MM/yyyy");

    const Workout: WorkoutType = {
      workout_title: workoutTitle,
      date: currentDate,
      name: exercises.name,
      reps: exercises.reps,
      sets: exercises.sets,
      weight: exercises.weight,
    };

    setWorkouts([...workouts, Workout]);
  };

  const sendWorkout = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "workouts"), {
        dbworkout: workouts,
      });

      setWorkouts([]);
      setWorkoutTitle("");
      const newDocumentId = docRef.id;
      console.log("Workout added successfully with id:", newDocumentId);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "workouts"));
      const fetchedDB: WorkoutType[] = [];
      querySnapshot.forEach((doc) => {
        fetchedDB.push({ id: doc.id, ...doc.data() });
      });

      setFetchedWorkouts(fetchedDB);
    };

    fetchData();
  }, [workouts]);

  const filteredWorkouts = fetchedWorkouts.map((workout) => {
    return [workout.id, ...workout.dbworkout];
  });

  return (
    <div>
      {user ? (
        <>
          <div>
            <form className="container flex flex-col justify-center px-4">
              <h1 className="mx-auto text-4xl font-bold mt-2">Add Exercises</h1>
              <label htmlFor="">Workout title</label>
              <input
                type="text"
                value={workoutTitle}
                name="workouttitle"
                onChange={workoutTitleChange}
                className="input input-bordered input-info w-full max-w-xs"
              />
              <label htmlFor="">Exercise</label>
              <input
                type="text"
                value={exercises.name}
                name="name"
                onChange={exerChange}
                className="input input-bordered input-info w-full max-w-xs"
              />
              <label htmlFor="">Weight</label>
              <input
                type="number"
                value={exercises.weight}
                name="weight"
                onChange={exerChange}
                className="input input-bordered input-info w-full max-w-xs"
              />
              <label htmlFor="">Reps</label>
              <input
                type="number"
                value={exercises.reps}
                name="reps"
                onChange={exerChange}
                className="input input-bordered input-info w-full max-w-xs"
              />
              <label htmlFor="">Sets</label>
              <input
                type="number"
                value={exercises.sets}
                name="sets"
                onChange={exerChange}
                className="input input-bordered input-info w-full max-w-xs"
              />
              <div className="flex flex-col gap-2 mt-2">
                <button onClick={addWorkout} className="btn btn-info max-w-xs">
                  Add Exercise
                </button>
                <button
                  onClick={sendWorkout}
                  className="btn btn-success max-w-xs"
                >
                  Add Workout
                </button>
              </div>
            </form>
          </div>

          {filteredWorkouts.length > 0 && (
            <div className="px-4 flex flex-col gap-2 mt-2">
              {filteredWorkouts.map((workout, index) => (
                <SingleWorkout workout={workout} key={index} />
              ))}
              <button onClick={signOut} className="btn btn-error max-w-xs">
                Sign out
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col mx-auto px-2">
          <h3 className="font-bold text-center p-2">You are not signed in</h3>
          <Link to="/" className="btn btn-accent max-w-xs">
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default Workout;
