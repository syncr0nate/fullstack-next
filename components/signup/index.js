import { useState } from "react";
import Router from "next/router";
import Loading from "../Loading";
import Link from "next/link";

export default function SignUp() {
  const [fields, setFields] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState(null);
  function fieldHandler(e) {
    const fieldName = e.target.getAttribute("name");
    setFields({
      ...fields,
      [fieldName]: e.target.value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    setStatus("Loading");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const data = await res.json();
    setStatus(data.message);
    setFields({
      fullName: "",
      email: "",
      password: "",
    });
    // Redirect
    if (res.ok) {
      Router.push("/auth/signin");
    }
  }

  if (status === "Loading") {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
        <form
          onSubmit={submitHandler}
          className="bg-primary rounded-lg p-7 w-11/12 lg:w-1/3 shadow-neumorph pb-16"
        >
          <h1 className="text-2xl underline text-center mb-5 font-semibold text-gray-700">
            Sign Up
          </h1>
          <div className="space-y-3">
            <input
              value={fields.fullName}
              className="bg-primary w-full focus:outline-none shadow-neumorph-concave-sm py-1.5 px-3 rounded-full text-sm"
              type="text"
              name="fullName"
              placeholder="Fullname"
              required
              onChange={fieldHandler}
            />{" "}
            <input
              value={fields.email}
              className="bg-primary w-full focus:outline-none shadow-neumorph-concave-sm py-1.5 px-3 rounded-full text-sm"
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={fieldHandler}
            />{" "}
            <input
              value={fields.password}
              className="bg-primary w-full focus:outline-none shadow-neumorph-concave-sm py-1.5 px-3 rounded-full text-sm"
              type="password"
              name="password"
              placeholder="Password"
              required
              min={8}
              onChange={fieldHandler}
            />{" "}
          </div>

          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-700 px-10 shadow-xl py-1.5 rounded-full text-white text-sm mt-7"
            onClick={submitHandler}
          >
            Go!
          </button>
        </form>
        <span className="text-sm underline text-gray-500 mt-5">
          <Link href="/">
            <a>Back to Home</a>
          </Link>
        </span>
      </div>
    </>
  );
}
