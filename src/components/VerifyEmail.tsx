import { HiOutlineEnvelopeOpen } from 'react-icons/hi2'
import { FiRefreshCw, FiMail } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { emailVerification, getMe } from '../store/actions/auth.actions';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const { token } = useParams<{ token : string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state : RootState) => state.auth);

  const handleVerify = async () => {
    if (!token) {
      toast.error("Invalid verification token.");
      return;
    }
    try {
      const res = await dispatch(emailVerification(token));
      if (res?.success) {
        toast.success(res?.message || "Email verified successfully! Redirecting...");
        await dispatch(getMe());
        navigate("/");
      } else {
        toast.error(res?.message || "Verification failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };
  return (
    <div className="bg-background-items relative flex min-h-screen w-full items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm sm:p-10">
        
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background-items">
          <HiOutlineEnvelopeOpen className="h-8 w-8 text-text-inverse" />
        </div>

        <h1 className="mt-6 text-center text-2xl font-semibold text-text">
          Verify your email
        </h1>

        <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary">
          By clicking this button ur email will be verified and u will be able to login in the website.
        </p>

        <div className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-border bg-background-secondary px-4 py-3 text-center text-sm text-text-muted">
          <FiMail className="h-4 w-4 shrink-0 text-background-itemsdark" />
          This page will update automatically once you click the link
        </div>

        <button
          type="button"
          onClick={handleVerify}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-background-items px-4 py-3 text-sm font-medium text-text-inverse transition-colors hover:bg-background-itemsdark active:bg-background-itemsdark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <FiRefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? "Verifying..." : "Click here to verify email"}
        </button>

        
      </div>
    </div>
  )
}

export default VerifyEmail