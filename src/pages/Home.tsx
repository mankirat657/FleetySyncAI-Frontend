import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { userLogout } from "../store/actions/auth.actions";
import { toast } from "react-toastify";

const Home = () => {
  const { user,loading } = useSelector(( state: RootState ) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const logout = async() =>{
      try {
        const response = await dispatch(userLogout());
        if(response?.success){
          toast.success(response?.message || "user logout successfully")
        }else{
          toast.error(response?.message || "Unexpected error occurred");
        }
      } catch (error) {
          console.error(error);
          toast.error("unexpected error occured");
      }
  } 
  return (
    <div>
      hello {user?.username}
      logout : <button disabled={loading} onClick={logout}>logout</button>
    </div>
  )
}

export default Home