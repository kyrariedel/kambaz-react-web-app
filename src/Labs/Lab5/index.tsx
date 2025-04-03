import EnvironmentVariables from "./environmentvariables.tsx";
import PathParameters from "./pathparameters.tsx";
import QueryParameters from "./queryparameters.tsx";
import WorkingWithObjects from "./workingwithobjects.tsx";
import WorkingWithArrays from "./workingwitharrays.tsx";
import HttpClient from "./httpclient.tsx";
import WorkingWithObjectsAsynchronously from "./workingwithobjectsasynchrously.tsx";
import WorkingWithArraysAsynchronously from "./workingwitharraysasynchrously.tsx";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function Lab5() {
    return (
      <div id="wd-lab5">
        <h2>Lab 5</h2>
        <div className="list-group">
          <a href={`${REMOTE_SERVER}/lab5/welcome`}        
             className="list-group-item">
             Welcome
          </a>
        </div><hr/>
        <EnvironmentVariables />
        <PathParameters />
        <QueryParameters />
        <WorkingWithObjects />
        <WorkingWithArrays />
        <HttpClient />
        <WorkingWithObjectsAsynchronously />
        <WorkingWithArraysAsynchronously />
      </div>
    );
  }
  