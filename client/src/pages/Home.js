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

  //here I need to return the data from the query and map through it if user is logged in, if not, show a message saying you need to log in
  //using Auth to check if the user is logged in or not and if they are, show the data, if not, show a message saying you need to log in
  return (
    <div className="container">
      {Auth.loggedIn() ? (
        <>
          <h1>Welcome {Auth.loggedIn().firstName}</h1>
          <h2>Here are all the users</h2>
          <div className="row">
            {data.users.map((user) => (
              <div className="col-md-4" key={user._id}>
                <div className="card">
                  <div className="card-body" id="user-cards">
                    <h5 className="card-title">{user.firstName}</h5>
                    <p className="card-text"> {user.lastName}</p>
                    <p className="card-text">Email : {user.email}</p>
                    <p className="card-text">Address : {user.address}</p>
                    <p className="card-text">City : {user.city}</p>
                    <p className="card-text">State : {user.state}</p>
                    <p className="card-text">Zip : {user.zip}</p>
                    <Link to={`/updateuser/${user._id}`}>
                      <button className="btn btn-primary">Update</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        removeUser({ variables: { _id: user._id } })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1 id="logout-view">
          Please sign up, or login to view/update the Users Data.
        </h1>
      )}
    </div>
  );
};

export default Home;
