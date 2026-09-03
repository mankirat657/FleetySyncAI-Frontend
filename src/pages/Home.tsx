import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { userLogout } from "../store/actions/auth.actions";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { Logo } from "../assets";
import Footer from '../components/Footer'
import { MdWorkspaces } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  console.log(user);
  const launchRef = useRef<HTMLDivElement>(null);
  const textref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const logout = async () => {
    try {
      const response = await dispatch(userLogout());
      if (response?.success) {
        toast.success(response?.message || "user logout successfully")
      } else {
        toast.error(response?.message || "Unexpected error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("unexpected error occured");
    }
  }
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0b0b0d] via-[#0f0f14] to-[#0b0b0d]">
      <Navbar />

      <div className="relative h-[63vh] min-h-[420px] mt-[-5rem] flex items-center justify-center
                      rounded-b-[6rem] sm:rounded-b-[8rem] lg:rounded-b-[12rem]
                      bg-gradient-to-b from-[#1a1a1f] to-[#0b0b0d] border-b border-red-500/10">
        
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/10 blur-[120px]" />
        
        <div className="welcome text-center px-4 relative z-10">
          <div className="inline-flex items-center mt-8 gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 backdrop-blur-sm mb-6">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="text-sm font-medium text-red-400">Welcome back</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold">
            Welcome Back <span className="animate-wave">👋🏻</span>
            <span className="block bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont mt-2">
              {user?.username}
            </span>
          </h1>

          <p className="text-base sm:text-lg pt-2 text-white/50 font-[450]">
            Choose a workspace to get started.
          </p>
        </div>
      </div>

      <div className="relative z-10 w-[92%] sm:w-[88%] lg:w-[80%] mx-auto -mt-[12vh]">
        <div className="header flex items-center justify-between">
          <div className="flex p-2 items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30">
              <MdWorkspaces className="w-6 h-auto text-white" />
            </div>
            <h1 className="text-white font-bold text-lg">My Workspaces</h1>
          </div>
        </div>
        
        <div className="w-full min-h-fit bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl rounded-2xl">
          <div className="border-b px-5 pt-2 border-white/10">
            <h1 className="border-b-3 py-2 border-red-500 w-fit text-white">WorkSpaces</h1>
          </div>
          
          <div className="px-5 py-3">
            <h3 className="text-md font-semibold text-white/60">Ready to launch</h3>
            
            {Array.isArray(user?.organization) && user?.organization.map((org) => {
              return (
                <div
                  className="group mb-[9vh] border border-white/5 hover:border-red-500/30 flex hover:bg-red-500/5 rounded-3xl cursor-pointer items-center justify-between transition-all duration-300 hover:shadow-lg hover:shadow-red-500/5"
                  key={org.id}
                >
                  <div className="flex pt-4 gap-2">
                    <div className="w-20 h-20 overflow-hidden rounded-3xl border border-white/10">
                      <img
                        src={org.avatar}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h1 className="font-bold text-white group-hover:text-red-400 transition-colors">
                          {org.name || "organization"}
                        </h1>

                        <div className="py-1 px-2 text-red-400 font-semibold bg-red-500/20 rounded-full text-xs border border-red-500/20">
                          {org.role}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {org.memberAvatars.map((logo, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full overflow-hidden border border-white/20"
                          >
                            <img
                              src={logo}
                              className="w-full h-full object-cover"
                              alt=""
                            />
                          </div>
                        ))}

                        <p className="text-sm text-white/50">
                          <span className="font-bold cursiveFont text-white/70">
                            {org.membersCount} members
                          </span>
                        </p>

                        <p className="text-sm text-white/40">
                          last login : {org.lastLogin}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pr-3">
                    <h1 className="font-semibold text-red-400 opacity-0 translate-x-2
                     group-hover:opacity-100 group-hover:translate-x-0
                     transition-all duration-200">
                      Launch
                    </h1>

                    <GoArrowRight
                      className="w-8 h-auto text-red-400 transition-transform duration-200
                   group-hover:translate-x-1"
                    />
                  </div>
                </div>
              )
            })}
            
            <div className="py-3 border-t border-white/10 px-5">
              <div className="">
                <Link to={"/organization-setup"}>
                  <p className="text-sm font-medium hover:underline text-red-400 transition-colors hover:text-red-300">
                    Create a new workspace
                  </p>
                </Link>

                <p className="pt-2 text-sm text-white/50">
                  Not seeing any workspaces ?
                  <span className="text-red-400 cursor-pointer hover:underline ml-1">
                    try a different email address
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-5 h-[20vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-center text-lg font-bold text-white">
              Need Support?
            </h1>
            <p className="text-white/50">
              Find the help you need in our{' '}
              <span className="text-red-400 hover:underline cursor-pointer transition-colors">
                Help Centre.
              </span>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Home