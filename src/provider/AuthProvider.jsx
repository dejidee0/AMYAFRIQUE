// import {
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
// import { createContext, useEffect, useState } from "react";
// import auth from "../firebase/firebase.config";

// export const AuthContext = createContext(null);
// const googleProvider = new GoogleAuthProvider();

// const githubProvider = new GithubAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const signIn = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   const google = () => {
//     return signInWithPopup(auth, googleProvider);
//   };

//   const github = () => {
//     return signInWithPopup(auth, githubProvider);
//   };

//   useEffect(() => {
//     const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//       console.log(currentUser);
//     });
//     return () => {
//       unSubscribe();
//     };
//   }, []);

//   const allInfo = { user, createUser, loading, signIn, logOut, google, github };
//   return (
//     <AuthContext.Provider value={allInfo}>
//       <>{children}</>
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// // import { createContext, useEffect, useState } from "react";

// // export const AuthContext = createContext(null);

// // const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // Fake User Data (Replace with any test data)
// //   const fakeUser = { uid: "12345", email: "test@example.com" };

// //   const createUser = (email, password) => {
// //     console.log("Signup disabled");
// //     return Promise.resolve(); // Prevents Firebase from running
// //   };

// //   const signIn = (email, password) => {
// //     console.log("Login disabled");
// //     return Promise.resolve();
// //   };

// //   const logOut = () => {
// //     console.log("Logout disabled");
// //     return Promise.resolve();
// //   };

// //   const google = () => {
// //     console.log("Google login disabled");
// //     setUser(fakeUser);
// //   };

// //   const github = () => {
// //     console.log("GitHub login disabled");
// //     setUser(fakeUser);
// //   };

// //   useEffect(() => {
// //     // Instead of Firebase, use a fake user
// //     setUser(fakeUser);
// //     setLoading(false);
// //   }, []);

// //   const allInfo = { user, createUser, loading, signIn, logOut, google, github };

// //   return (
// //     <AuthContext.Provider value={allInfo}>{children}</AuthContext.Provider>
// //   );
// // };

// // export default AuthProvider;
