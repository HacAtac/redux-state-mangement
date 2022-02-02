import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import { QUERY_USERS } from "../utils/queries";

function UpdateUser() {
  // here I need to update current services with the new service data with a form that will be filled out by the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const { loading, error, data } = useQuery(QUERY_USERS);

  // useMutation for UPDATE_SERVICE that updates the data that is being passed in from the form
  const [updateService] = useMutation(UPDATE_USER, {
    variables: {
      _id: "_id",
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      isActive: isActive,
      city: city,
      state: state,
      zip: zip,
    },
    update(cache, { data: { UpdateUser } }) {
      //update is a function that takes in the cache and the data that is being returned from the mutation
      //and updates the cache with the new data from the mutation
      console.log(cache);
      //readQuery is a function that takes in the query and returns the data from the cache
      const { user } = cache.readQuery({ query: QUERY_USERS });
      cache.writeQuery({
        query: QUERY_USERS,
        data: {
          services: user.map(
            (
              user //were mapping through the services and returning the new data that is being returned from the mutation
            ) => (user._id === UpdateUser._id ? UpdateUser : user) //this says if the service._id is equal to the updateService._id then updateService is returned, otherwise the service is returned so that the cache is updated with the new data
          ),
        },
      });
    },
  });

  // app is throwing
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="flex-column justify-flex-start min-100-vh">
      <h1 className="page-title" id="update-title">
        UPDATE USER
      </h1>
      <div className="flex-row justify-space-between">
        <div className="card" id="card">
          <h3 className="card-title">Email</h3>
          <input
            className="input-field"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)} //were using state to update the name state
          />
          <h3 className="card-title">Password</h3>
          <input
            className="input-field"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h3 className="card-title">First Name</h3>
          <input
            className="input-field"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} //what is (e) here? // it is the event that is being passed in
          />
          <h3 className="card-title">Last Name</h3>
          <input
            className="input-field"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <h3 className="card-title">Active?</h3>
          <input
            className="input-field"
            type="boolean"
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
          />
          <h3 className="card-title">Address</h3>{" "}
          <input
            className="input-field"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <h3 className="card-title">City</h3>{" "}
          <input
            className="input-field"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <h3 className="card-title">State</h3>{" "}
          <input
            className="input-field"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <h3 className="card-title">Zip</h3>{" "}
          <input
            className="input-field"
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
          <button
            id="update-btn"
            className="button"
            onClick={() => updateService()}
          >
            {" "}
            Update User Data{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default UpdateUser;
