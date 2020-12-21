import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import poster from "../assets/poster.jpg";

function Registro() {
  const [value] = useState(new Date());
  const [userData, setUserData] = useState({});

  const inputHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    console.log("porperty:", property, "value:", value);
    setUserData({ ...userData, [property]: value });
  };

  const calendarHandler = (value, event) => {
    console.log("New date is: ", value);
    let birthdate = moment(value).format("DD-MM-YYYY");
    console.log(birthdate);
    setUserData({ ...userData, birthdate });
  };

  const saveDataUser = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDk3MWE5ZWZlZGRhNWIxYzI0NjJlYSIsImlhdCI6MTYwODA5ODg2NiwiZXhwIjoxNjA5ODI2ODY2fQ.HZ4XM-OvLUFsH10CuEBMipRplwvvdkoGZ381WMjKm7U"
    );

    var raw = JSON.stringify(userData);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/user", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="bg-gray-400">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6 bg-registro-img bg-no-repeat bg-cover">
          <div className="mt-5 md:mt-0 md:col-span-3 flex justify-center ">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md ">
                <div className="px-4 py-5 bg-purple-300 sm:p-6">
                  <div className="flex flex-col gap-6">
                    <h3 className="text-lg  text-2xl text-center font-medium text-2xl text-center font-medium leading-6 text mb-5">
                      Información personal
                    </h3>

                    <div className="col-span-3 sm:col-span-2">
                      <label
                        for="first_name"
                        className="block text-sm font-medium text-gray-500"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 focus:ring-indigo-500  focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={inputHandler}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="last_name"
                        className="block text-sm font-medium text-gray-500"
                      >
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={inputHandler}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        for="last_name"
                        className="block text-sm font-medium text-gray-500 mb-5"
                      >
                        Fecha de nacimiento
                      </label>

                      <div className=" sm:rounded-md sm:overflow-hidden col-span-6 sm:col-span-4 ">
                        <Calendar onChange={calendarHandler} value={value} />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="email_address"
                        className="block text-sm font-medium text-gray-500"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={inputHandler}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        for="password"
                        className="block text-sm font-medium text-gray-500"
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={inputHandler}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-3 flex justify-center mt-5 text-right sm:px-6">
                    <Link to="/pokemon">
                      <button
                        type="button"
                        className=" py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={saveDataUser}
                      >
                        Guardar
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;
