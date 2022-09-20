// // import Akord from "../akord";
// // import { AkordWallet } from "@akord/crypto";
// import { Amplify, Auth } from "aws-amplify";
// import awsconfig from "./aws-exports.js";

// Amplify.configure(awsconfig);

// const signIn = async (email, password) => {
//   console.log("Loggin in", email);
//   try {
//     const user = await Auth.signIn(email, password);

//     console.log(user);

//     // const user = await Auth.currentAuthenticatedUser();
//     console.log("attributes:", user.attributes);
//     return user;
//   } catch (error) {
//     console.log("error signing in", error);
//     return null;
//   }

//   // const apiAuthenticator = new ApiAuthenticator();
//   // const jwtToken = await apiAuthenticator.getJWTToken(email, password);
//   // const userAttributes = await apiAuthenticator.getUserAttributes(
//   //   email,
//   //   password
//   // );
//   // const wallet = await AkordWallet.importFromEncBackupPhrase(
//   //   password,
//   //   userAttributes["custom:encBackupPhrase"]
//   // );
//   // return new Akord({}, wallet, jwtToken);
// };

// const currentUser = async () => {
//   try {
//     const user = await Auth.currentAuthenticatedUser();
//     console.log(user);
//     console.log("attributes:", user.attributes);
//     return user;
//   } catch (error) {
//     console.log("error signing in", error);
//     return null;
//   }
// };

// export { signIn, currentUser };
