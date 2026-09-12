import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../store/store"
import { getMe, userLogout } from "../store/actions/auth.actions";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { Logo } from "../assets";
import Footer from '../components/Footer'
import { MdOutlineAddCircle, MdWorkspaces } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMeOrganization } from "../store/actions/organization.actions";
import Loader from "../components/Loader";
import { acceptInvitations, getInvitations, rejectInvitations } from "../store/actions/invitation.actions";
import { FiCheck, FiX } from "react-icons/fi";

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { organization } = useSelector((state: RootState) => state.org);
  console.log(user);
  const { loading, invitation } = useSelector((state: RootState) => state.invite);
  const launchRef = useRef<HTMLDivElement>(null);
  const textref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  /* get current users organizaiton api */
  // useEffect(() => {
  //   const getOrganization = async() => {
  //     try {
  //       await dispatch(getMeOrganization());

  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getOrganization();
  // },[dispatch]);
  useEffect(() => {
    const getMyInvitations = async () => {
      try {
        const response = await dispatch(getInvitations());
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    }
    getMyInvitations();
  }, [dispatch])
  console.log("invitations", invitation)
  const inviteAccept = async (id : string) => {
    try {
      const response = await dispatch(acceptInvitations(id));
      if(response?.success){
        toast.success(response?.message || "invitation accepted successfully");
        await dispatch(getMe());
        await dispatch(getInvitations());
      }else{
        toast.error(response?.message || "Unexpected error occured");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured");
    }
  }
  const handleReject = async (id: string) => {
    try {
      const response = await dispatch(rejectInvitations(id));
      if(response?.success){
        toast.success(response?.message || "invitaiton accepted successfully");
        await dispatch(getMe());
        await dispatch(getInvitations());
      }else{
        toast.error(response?.message || "Unexpected error occured");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured");
    }
  }
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
            <span className="block bg-gradient-to-r italic from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont mt-2">
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
          <div className="flex p-2 pb-3 items-center gap-2">
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
            <h3 className="text-md font-semibold pb-4 text-white/60">Ready to launch</h3>

            {Array.isArray(user?.organization) && user.organization.length > 0 && user?.organization.map((org) => {
              return (
                <Link to={`/workspace/${org.id}`}>
                  <div
                    className="group pl-2 mb-4 border border-white/5 hover:border-red-500/30 flex hover:bg-red-500/5 rounded-3xl cursor-pointer items-center justify-between transition-all duration-300 hover:shadow-lg hover:shadow-red-500/5"
                    key={org.id}
                  >
                    <div className="flex pt-2 pb-2 gap-2">
                      <div className="w-20 flex items-center justify-center h-20 overflow-hidden rounded-3xl border border-white/10">
                        {org.avatar ? (
                          <img
                            src={org.avatar}
                            className="w-full h-full object-cover"
                            alt={org.name}
                          />
                        ) : (
                          <p className="text-white cursiveFont text-4xl font-bold">
                            {org.name.charAt(0).toUpperCase()}
                          </p>
                        )}
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
                            <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont font-semibold">
                              {org.membersCount} members
                            </span>
                          </p>

                          <p className="text-sm text-white/40">
                            last login : {new Date(user.lastLogin).toLocaleString()}
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
                </Link>

              )
            })}
            {Array.isArray(user?.organization) && user.organization.length === 0 && <div className="flex items-center justify-center pb-6">
              <div className="relative cursor-pointer flex items-center flex-col gap-2">
                <Link to={"/organization-setup"}>
                  <MdOutlineAddCircle className="text-background relative z-50 hover:scale-105 transition-all ease-linear w-20 h-auto" />
                </Link>
                <h1 className="text-center  text-surface">Start by creating <span className="font-semibold italic cursiveFont bg-gradient-to-r bg-clip-text text-transparent from-red-400 to-red-300">workspaces</span></h1>
                <div className="absolute alterativeSec top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[5vw] h-[3vh] bg-surface blur-xl"></div>
              </div>
            </div>}
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
        <div className="w-full mt-5 min-h-fit bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl rounded-2xl">
          <div className="border-b px-5 pt-2 border-white/10">
            <h1 className="border-b-3 py-2 border-red-500 w-fit text-white">Invitations</h1>
          </div>

          <div className="px-5 py-3">
            <h3 className="text-md font-semibold pb-4 text-white/60">Ready to Accept</h3>
            {Array.isArray(invitation) && invitation.map((inv) => {
              // const isAccepting = pendingAction?.id === inv._id && pendingAction.type === "accept";
              // const isRejecting = pendingAction?.id === inv._id && pendingAction.type === "reject";
              // const isBusy = pendingAction?.id === inv._id;

              return (
                <div
                  key={inv._id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-2xl border border-white/5 hover:border-red-500/20 bg-white/[0.03] px-4 py-3 transition-colors mb-3"
                >
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    {inv.organization.logo ? (
                      <img src={inv.organization.logo} alt={inv.organization.name} className="w-full h-full object-cover" />
                    ) : (
                      <p className="text-white cursiveFont text-xl font-bold">
                        {Array.isArray(inv.organization) && inv.oragnization.length >0 &&  inv.organization.name.charAt(0).toUpperCase()}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-white">{inv.organization.name}</h4>
                      <span className="py-0.5 px-2 text-red-400 font-semibold bg-red-500/20 rounded-full text-[11px] border border-red-500/20 capitalize">
                        {inv.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-white/20 shrink-0">
                        {inv.invitedBy.avatar ? (
                          <img src={inv.invitedBy.avatar} alt={inv.invitedBy.username} className="w-full h-full object-cover" />
                        ) : null}
                      </div>
                      <p className="text-xs text-white/50 truncate">
                        Invited by <span className="text-white/70">{inv.invitedBy.username}</span> · sendedAt : {new Date(inv.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                       onClick={() => handleReject(inv._id)}
                       disabled={loading}
                      className="flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/60 transition-colors disabled:opacity-40"
                    >
                      <FiX size={13} />
                      {loading ? "Declining…" : "Decline"}
                    </button>
                    <button
                      type="button"
                      onClick={() => inviteAccept(inv._id)}
                       disabled={loading}
                      className="flex cursor-pointer items-center gap-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-md shadow-red-500/20 px-3.5 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-[1.03] disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <FiCheck size={13} />
                      {loading ? "Joining…" : "Accept"} 
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="py-3 border-t border-white/10 px-5">
              <div className="">
                <p className="pt-2 text-sm text-white/50">
                  Not seeing any invitations ?
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
              <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont font-semibold underline cursor-pointer">
                Help Centre.
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
      {loading && <Loader />}
    </div>
  )
}

export default Home