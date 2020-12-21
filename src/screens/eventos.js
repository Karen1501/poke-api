import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import firebase from "../firebase/firebase";
import poster from "../assets/poster.jpg";

function Eventos() {
  const [value, onChange] = useState(new Date());
  const [eventData, setEventData] = useState({});

  const [eventImg, setEventImg] = useState(null);

  const fileChangeHandler = (event) => {
    let file = event.target.files[0];
    console.log("event:", event.target);
    console.log("file:", file);
    setEventImg(file);
  };

  const inputHandler = (event) => {
    let property = event.target.name;
    let value = event.target.value;

    console.log("property: ", property, "value: ", value);
    setEventData({ ...eventData, [property]: value });
  };

  const calendarHandler = (value, event) => {
    console.log("New date is: ", value);
    let date = moment(value).format("DD-MM-YYYY");
    console.log(date);
    setEventData({ ...eventData, date });
  };

  const uploadFileHandler = () => {
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child(`banners/${eventImg.name}`).put(eventImg);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          setEventData({ ...eventData, image: downloadURL });
          console.log("event data", eventData);

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append(
            "Authorization",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZDk3MWE5ZWZlZGRhNWIxYzI0NjJlYSIsImlhdCI6MTYwODA5ODg2NiwiZXhwIjoxNjA5ODI2ODY2fQ.HZ4XM-OvLUFsH10CuEBMipRplwvvdkoGZ381WMjKm7U"
          );

          var raw = JSON.stringify(eventData);

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch("http://localhost:8080/event", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        });
      }
    );
  };

  return (
    <div className="bg-gray-400 ">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6 bg-hero-pattern bg-no-repeat bg-cover ">
          <div className="mt-5 md:mt-0 md:col-span-3 flex justify-center ">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md ">
                <div className="px-4 py-5 bg-pink-300 sm:p-6">
                  <div className=" flex flex-col gap-6">
                    <h3 className="text-lg font-medium  text-2xl text-center font-medium leading-6 text-black mb-5">
                      Información del evento
                    </h3>
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        for="first_name"
                        className="block text-sm font-medium text-gray-500"
                      >
                        Categoría
                      </label>
                      <input
                        type="text"
                        name="category"
                        id="first_name"
                        autocomplete="given-name"
                        className="mt-1 focus:ring-indigo-500 w-full focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={inputHandler}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        for="last_name"
                        className="block text-sm font-medium text-gray-500"
                      >
                        Tipo de evento
                      </label>

                      <input
                        type="text"
                        name="event_type"
                        id="last_name"
                        autocomplete="family-name"
                        className="mt-1 focus:ring-indigo-500 w-full focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={inputHandler}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        for="last_name"
                        className="block text-sm text-center font-medium text-gray-500 mb-5"
                      >
                        Fecha
                      </label>

                      <div className=" sm:rounded-md flex justify-center sm:overflow-hidden col-span-6 sm:col-span-4   ">
                        <Calendar onChange={calendarHandler} value={value} />
                      </div>

                      <label
                        for="last_name"
                        className="block text-sm font-medium text-gray-500 mb-5 mt-5"
                      >
                        Hora
                      </label>
                      <input
                        type="text"
                        name="time"
                        id="time"
                        autocomplete="family-name"
                        className="mt-1 focus:ring-indigo-500 w-full focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={inputHandler}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4 mb-5">
                      <label className="block text-sm font-medium text-gray-700">
                        ¡Sube una imagen para tu evento!
                      </label>
                    </div>
                  </div>

                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <form action="#" method="POST">
                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Subir foto
                            </label>
                            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                              <div className="space-y-1 text-center">
                                <svg
                                  className="mx-auto h-12 w-12 text-gray-400"
                                  stroke="currentColor"
                                  fill="none"
                                  viewBox="0 0 48 48"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                  <label
                                    for="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                  >
                                    <span>Carga una imagen</span>
                                    <input
                                      id="file-upload"
                                      name="file-upload"
                                      type="file"
                                      className="sr-only"
                                      onChange={fileChangeHandler}
                                    />
                                  </label>
                                  <p className="pl-1">o arrastrala y carga</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="button"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={uploadFileHandler}
                          >
                            Guardar
                          </button>
                        </div>
                      </div>
                    </form>
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

export default Eventos;
