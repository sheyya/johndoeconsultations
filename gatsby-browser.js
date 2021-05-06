import "bootstrap/dist/css/bootstrap.css"
import Amplify, { Auth } from "aws-amplify"
import awsConfig from "./src/aws-exports"
Amplify.configure(awsConfig);