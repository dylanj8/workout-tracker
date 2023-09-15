import { React, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { WorkoutType } from "./Workout";

const DetailedWorkout = () => {
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "workouts"));
      const fetchedDB: WorkoutType[] = [];
      querySnapshot.forEach((doc) => {
        fetchedDB.push({ id: doc.id, ...doc.data() });
      });
      setFilteredWorkouts(fetchedDB);
    };

    fetchData(); // Call the fetchData function inside useEffect
  }, []);

  console.log(filteredWorkouts);

  const { id } = useParams();
  const workout: WorkoutType[] = filteredWorkouts.filter((x) => {
    return x.id === id;
  });

  const deleteDocById = async () => {
    try {
      // Ensure that docRef is correctly defined and points to a valid Firestore document
      const docRef = doc(db, "workouts", workout[0]?.id);

      if (docRef) {
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
        return navigate("/workout");
      } else {
        console.error("Invalid docRef");
      }
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <>
      {workout ? (
        <div>
          {" "}
          {workout.map((work, index) => (
            <div key={index} className="flex flex-col items-center">
              <h1 className="font-bold text-center">
                {work.dbworkout[0].workout_title}
              </h1>
              {work.dbworkout.map((dbworkout, i) => (
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Sets </th>
                        <th>Reps </th>
                        <th>Weight(KG) </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        <th>{dbworkout.name}</th>
                        <td>{dbworkout.sets}</td>
                        <td>{dbworkout.reps}</td>
                        <td>{dbworkout.weight}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
              <div>
                <button onClick={deleteDocById} className="btn btn-error mt-2">
                  delete
                </button>
                <Link to="/workout" className="btn btn-success mt-2 ml-2">
                  Home
                </Link>{" "}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>Error</h2>
          <Link to="/" className="btn btn-success mt-2 ml-2">
            Home
          </Link>{" "}
        </div>
      )}
    </>
  );
};

export default DetailedWorkout;
