import { withPrivateRoute } from "../helpers/authContext";


function Profile() {
  return (
    <div className="page-container">
      <h1 className="page-title">Profile</h1>
    </div>
  )
}

export default withPrivateRoute(Profile);
