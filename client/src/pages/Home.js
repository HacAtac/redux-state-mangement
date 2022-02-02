import React from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
// import { UPDATE_SERVICE } from "../utils/mutations";
import { REMOVE_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Home = () => {
  //use mutation function to remove service when the user clicks on the delete button
  const [removeUser] = useMutation(REMOVE_USER, {
    update(cache, { data: { removeService } }) {
      //update is a function that takes in the cache and the data that is being returned from the mutation and updates the cache with the new data from the mutation
      console.log(cache);
      //readQuery is a function that takes in the query and returns the data from the cache
      const { user } = cache.readQuery({ query: QUERY_USERS });
      cache.writeQuery({
        query: QUERY_USERS,
        data: {
          user: user.filter((user) => user._id !== removeUser._id),
        },
      });
    },
  });

  const { loading, error, data } = useQuery(QUERY_USERS);
  //what is useQuery and where does it come from?
  //it is a hook that allows us to use the query from the utils/queries file and get the data to show up on the page
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container">
      <div className="row">
        {data.users.map((user) => (
          <div className="col-md-4" key={user._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.firstName}</h5>
                <p className="card-text">{user.lastName}</p>
                <p className="card-text">{user.email}</p>
                <p className="card-text">{user.address}</p>
                <p className="card-text">{user.city}</p>
                <p className="card-text">{user.state}</p>
                <p className="card-text">{user.zip}</p>
                <Link to={`/updateuser/${user._id}`}>
                  <button className="btn btn-primary">Update</button>
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => removeUser({ variables: { _id: user._id } })}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
