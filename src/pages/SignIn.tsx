import { useState } from 'react';
import { Logo } from '../assets';
import { useForm } from 'react-hook-form';
import type { Inputs } from '../types/formTypes';
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import ShowCase from '../components/ShowCase';
import ForgotPassword from '../components/ForgotPassword';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { getMe, userLogin } from '../store/actions/auth.actions';
import { toast } from 'react-toastify';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [showResetModel, setShowResetModel] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = async (data: Inputs) => {
    try {
      const response = await dispatch(userLogin(data));
      if (response?.success) {
        toast.success(response?.message || "Successfully logged In");
        await dispatch(getMe())
        navigate("/organization-setup",{ replace : true });
      } else {
        toast.error(response?.message || "Unexpected error occured");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected error occured")
    }
  };

  const handleGoogleSignup = () => {
     window.location.href = "http://localhost:3000/api/v1/auth/google";

  };

  const fieldClasses = (name: string, hasError: boolean, extraPadRight = false) => `
    w-full bg-background-input border-2 rounded-xl py-3.5 pl-11 ${extraPadRight ? 'pr-12' : 'pr-4'}
    text-text transition-all duration-300 outline-none
    ${hasError
      ? 'border-danger focus:border-danger shadow-lg shadow-danger/10'
      : isFocused === name
        ? 'border-background-items shadow-lg shadow-background-items/10'
        : 'border-red-100 '
    }
  `;

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="w-full lg:w-[46%] flex items-center justify-center px-6 sm:px-12 py-8">
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="flex items-center gap-3 group cursor-pointer w-fit">
              <div className="relative w-11 h-11 flex items-center justify-center">
                <div className="relative w-11 h-11 p-2.5 rounded-xl bg-surface border border-border shadow-sm group-hover:border-background-items/40 transition-all duration-300">
                  <img
                    src={Logo}
                    alt="OrgSync AI"
                    className="w-full h-full object-contain brightness-0 saturate-100"
                  />
                </div>
              </div>
              <h1 className="font-bold text-xl alterative tracking-tight">
                Org<span className="text-background-items cursiveFont">Sync</span>
                <span className="text-text-dark"> AI</span>
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-4xl alterative leading-tight font-bold text-text ">
                Log in your <span className='text-background-items cursiveFont'>account</span>
              </h1>
              <p className="text-text-muted text-sm leading-relaxed">
                Track projects, tasks, and breakdowns, and manage your team
                with AI-powered insights.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 bg-surface border-2 border-border hover:border-border-hover hover:bg-surface-hover rounded-xl py-3 font-semibold text-text transition-all duration-300"
            >
              <FcGoogle className="w-5 h-5" />
              Log in with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-divider" />
              <span className="text-xs font-medium text-text-subtle uppercase tracking-wider">
                Or continue with email
              </span>
              <div className="h-px flex-1 bg-divider" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
              <div>
                <div className="relative">
                  <div
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${errors.email
                        ? 'text-danger'
                        : isFocused === 'email'
                          ? 'text-background-items'
                          : 'text-text-muted'
                      }`}
                  >
                    <FiMail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                    onFocus={() => setIsFocused('email')}
                    onBlur={() => setIsFocused(null)}
                    className={fieldClasses('email', !!errors.email)}
                    placeholder="Email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-danger flex items-center gap-1">
                    <FiAlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <div
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${errors.password
                        ? 'text-danger'
                        : isFocused === 'password'
                          ? 'text-background-items'
                          : 'text-text-muted'
                      }`}
                  >
                    <FiLock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'At least 8 characters' },
                    })}
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused(null)}
                    className={fieldClasses('password', !!errors.password, true)}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors duration-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="pt-2">
                  <p className='text-sm text-text-secondary'>Forgot Password ? <span className='text-background-itemsdark font-[500] cursor-pointer' onClick={() => setShowResetModel(true)}>click here to reset</span></p>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-danger flex items-center gap-1">
                    <FiAlertCircle className="w-3.5 h-3.5" /> {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative group w-full bg-background-items hover:bg-background-itemsdark disabled:opacity-60 disabled:cursor-not-allowed text-text-inverse font-semibold py-3.5 rounded-xl transition-all duration-300 overflow-hidden shadow-lg shadow-background-items/20 mt-1"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? 'Login...' : 'Login account'}
                  {!isSubmitting && (
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </span>
              </button>
              <Link to={'/signup'}>
                <p className="text-center text-text-muted text-sm">
                  Don't have an account?{' '}
                  <span className="text-background-items hover:text-background-itemsdark font-semibold transition-colors duration-300">
                    Sign Up
                  </span>
                </p>
              </Link>
            </form>
          </div>
        </div>
        <ShowCase />
      </div>
      {showResetModel && <ForgotPassword setEmailShow={setShowResetModel} />}
    </div>
  );
};

export default SignIn;