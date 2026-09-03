import { useState } from 'react';
import { Logo } from '../assets';
import { useForm } from 'react-hook-form';
import type { Inputs } from '../types/formTypes';
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import ShowCase from '../components/ShowCase';
import EmailSend from '../components/EmailSend';
import { registeration } from '../store/actions/auth.actions';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';
import { toast } from 'react-toastify';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [showEmailVerficationModel, setEmailVerficationModel] = useState<boolean>(false);
  const password = watch('password');
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = async (data: Inputs) => {
    const { confirmPassword, ...registerData } = data;
    try {
      const res = await dispatch(registeration(registerData));
      if (res?.success) {
        setEmailVerficationModel(true);
        toast.success(res?.message || "Email sended to your email address verify!");
      } else {
        toast.error(res?.message || "Error occured");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occured");
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:3000/api/v1/auth/google";
  };

  const fieldClasses = (name: string, hasError: boolean, extraPadRight = false) => `
    w-full bg-white/5 border-2 rounded-xl py-3.5 pl-11 ${extraPadRight ? 'pr-12' : 'pr-4'}
    text-white placeholder:text-white/30 transition-all duration-300 outline-none
    ${hasError
      ? 'border-red-500 focus:border-red-500 shadow-lg shadow-red-500/20'
      : isFocused === name
        ? 'border-red-500 shadow-lg shadow-red-500/20'
        : 'border-white/10 focus:border-red-500/50'
    }
  `;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0b0b0d] via-[#0f0f14] to-[#0b0b0d]">
      {/* Decorative glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-red-500/10 blur-[150px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-red-500/10 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-red-500/5 blur-[120px]" />
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        <div className="w-full lg:w-[46%] flex items-center justify-center px-4 sm:px-8 md:px-12 py-8">
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="flex items-center gap-3 group cursor-pointer w-fit">
              <div className="relative w-11 h-11 flex items-center justify-center">
                <div className="relative w-11 h-11 p-2.5 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 border border-red-500/20 shadow-lg shadow-red-500/10 group-hover:border-red-500/40 transition-all duration-300">
                  <img
                    src={Logo}
                    alt="OrgSync AI"
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
              </div>
              <h1 className="font-bold text-xl alterative tracking-tight text-white">
                Org<span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont">Sync</span>
                <span className="text-white/70"> AI</span>
              </h1>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl alterative leading-tight font-bold text-white">
                Create your <span className='bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent cursiveFont'>account</span>
              </h1>
              <p className="text-white/50 text-sm leading-relaxed">
                Track projects, tasks, and breakdowns, and manage your team
                with AI-powered insights.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 bg-white/5 border-2 border-white/10 hover:border-red-500/30 hover:bg-red-500/5 rounded-xl py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
            >
              <FcGoogle className="w-5 h-5" />
              Sign up with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-xs font-medium text-white/30 uppercase tracking-wider">
                Or continue with email
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
              <div>
                <div className="relative">
                  <div
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      errors.username
                        ? 'text-red-400'
                        : isFocused === 'username'
                          ? 'text-red-400'
                          : 'text-white/30'
                    }`}
                  >
                    <FiUser className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    {...register('username', {
                      required: 'Username is required',
                      minLength: { value: 3, message: 'At least 3 characters' },
                    })}
                    onFocus={() => setIsFocused('username')}
                    onBlur={() => setIsFocused(null)}
                    className={fieldClasses('username', !!errors.username)}
                    placeholder="Username"
                  />
                  {!errors.username && (watch('username')?.length ?? 0) > 0 && (
                    <FiCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.username && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <FiAlertCircle className="w-3.5 h-3.5" /> {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <div
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      errors.email
                        ? 'text-red-400'
                        : isFocused === 'email'
                          ? 'text-red-400'
                          : 'text-white/30'
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
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <FiAlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <div
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      errors.password
                        ? 'text-red-400'
                        : isFocused === 'password'
                          ? 'text-red-400'
                          : 'text-white/30'
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-300"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <FiAlertCircle className="w-3.5 h-3.5" /> {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <div
                    className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                      errors.confirmPassword
                        ? 'text-red-400'
                        : isFocused === 'confirm'
                          ? 'text-red-400'
                          : 'text-white/30'
                    }`}
                  >
                    <FiLock className="w-5 h-5" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) => value === password || 'Passwords do not match',
                    })}
                    onFocus={() => setIsFocused('confirm')}
                    onBlur={() => setIsFocused(null)}
                    className={fieldClasses('confirm', !!errors.confirmPassword, true)}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-300"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <FiAlertCircle className="w-3.5 h-3.5" /> {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative group w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-300 overflow-hidden shadow-lg shadow-red-500/30 hover:shadow-red-500/50 mt-2"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    <>
                      Create account
                      <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
              </button>
              <Link to={'/signIn'}>
                <p className="text-center text-white/40 text-sm hover:text-white/60 transition-colors">
                  Already have an account?{' '}
                  <span className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-300">
                    Sign in
                  </span>
                </p>
              </Link>
            </form>
          </div>
        </div>
        <ShowCase />
      </div>
      {showEmailVerficationModel && <EmailSend setEmailShow={setEmailVerficationModel} />}
    </div>
  );
};

export default Signup;