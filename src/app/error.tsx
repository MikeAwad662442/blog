"use client";
// if there error in data in the page
import React from "react";

const error = () => {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-5 px-3 text-center">
      <h1 className="H1">Error</h1>
      <p>An unexpected error occurred.</p>
    </main>
  );
};

export default error;
