// import * as client from "./client";
// import { useEffect, useState } from "react";
// import { setCurrentUser } from "./reducer";
// import { useDispatch } from "react-redux";

// export default function Session({ children }: { children: any }) {
//   const [pending, setPending] = useState(true);
//   const dispatch = useDispatch();
//   const fetchProfile = async () => {
//     try {
//       const currentUser = await client.profile();
//       dispatch(setCurrentUser(currentUser));
//     } catch (err: any) {
//       console.error(err);
//     }
//     setPending(false);
//   };
//   useEffect(() => {
//     fetchProfile();
//   }, []);
//   if (!pending) {
//     return children;
//   }
// }

import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  
  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      // Don't log as an error - this is expected when not logged in
      console.log("Not logged in or session expired");
      // Optionally dispatch an action to clear the user if needed
      dispatch(setCurrentUser(null));
    } finally {
      setPending(false);
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  if (pending) {
    return <div>Loading...</div>; // Or any loading indicator
  }
  
  return children;
}