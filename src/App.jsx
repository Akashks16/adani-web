// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./apps/HomePage";
import { useEffect, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "invoice-uploader",
        element: <HomePage />,
      },
      {
        path: "payment-approval",
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  // const [count, setCount] = useState(0)

  const [messageFromChild, setMessageFromChild] = useState(null);

  useEffect(() => {
    // Function to handle messages from child iframe
    const handleMessage = (event) => {
      // Verify the origin is your child app

      // Log received messages
      console.log("Message received from child:", event?.data);

      // Handle specific message types
      if (event?.data?.type === "REQUEST_LOCATION") {
        // Send location data back to child
        event?.source.postMessage(
          {
            type: "LOCATION_DATA",
            data: { url: window.location.pathname },
          },
          event.origin
        );

        setMessageFromChild("Child requested location data");
      }
    };

    // Add event listener
    window.addEventListener("message", handleMessage);

    // Clean up
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  console.log("messageFromChild: ", messageFromChild);

  return <RouterProvider router={router} />;
}

export default App;
