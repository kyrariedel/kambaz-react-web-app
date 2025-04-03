import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { FormControl } from "react-bootstrap";
import * as client from "./client";
export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };
  useEffect(() => { fetchProfile(); }, []);
  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
  <div>
    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
    
    <div className="mb-2">
      <div>Username</div>
      <FormControl defaultValue={profile.username} id="wd-username"
                   onChange={(e) => setProfile({ ...profile, username: e.target.value })}/>
    </div>
    
    <div className="mb-2">
      <div>Password</div>
      <FormControl defaultValue={profile.password} id="wd-password"
                   onChange={(e) => setProfile({ ...profile, password: e.target.value })}/>
    </div>
    
    <div className="mb-2">
      <div>First Name</div>
      <FormControl defaultValue={profile.firstName} id="wd-firstname"
                   onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/>
    </div>
    
    <div className="mb-2">
      <div>Last Name</div>
      <FormControl defaultValue={profile.lastName} id="wd-lastname"
                   onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}/>
    </div>
    
    <div className="mb-2">
      <div>Date of Birth</div>
      <FormControl defaultValue={profile.dob} id="wd-dob"
                   onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date"/>
    </div>
    
    <div className="mb-2">
      <div>Email</div>
      <FormControl defaultValue={profile.email} id="wd-email"
                   onChange={(e) => setProfile({ ...profile, email: e.target.value })}/>
    </div>
    
    <div className="mb-2">
      <div>Role</div>
      <select onChange={(e) => setProfile({ ...profile, role: e.target.value })}
             className="form-control" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
    </div>
    
    <button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
      Sign out
    </button>
  </div>
)}
</div>);}