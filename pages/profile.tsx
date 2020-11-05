import { withPrivateRoute } from "../helpers/authContext";


function Profile() {
  return (
    <div>
      Profile
    </div>
  )
}

export default withPrivateRoute(Profile);
