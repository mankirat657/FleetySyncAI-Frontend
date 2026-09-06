import { useRef, useState } from "react"
import type { Props, Props2 } from "../types/formTypes";
import type { CreateOrganizationData } from "../types/interfaces";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { createOrganization } from "../store/actions/organization.actions";
import { toast } from "react-toastify";
import { getMe } from "../store/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Step1 = ({ setSteps, orgName, setOrgName }: Props) => {
    const [maxLength] = useState<number>(50);
    const [inputClicked, setInputClicked] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-5 mt-4">
            <div className="heading py-3 flex flex-col gap-3">
                <h1 className="alterativeSec font-black text-2xl sm:text-3xl text-white">
                    Name your <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent underline cursiveFont">OrgSyncAi</span> workspace
                </h1>
                <p className="text-white/50 text-sm sm:text-md">Choose something your team will recognize like the name of your<br className="hidden sm:block" /> company or team. You can always update it later.</p>
            </div>
            <div className="w-full sm:w-[45%] relative">
                <input
                    onBlur={() => setInputClicked(false)}
                    onChange={(e) => {
                        setOrgName(e.target.value)
                        setInputClicked(true)
                    }}
                    maxLength={maxLength}
                    onClick={() => setInputClicked(true)}
                    type="text"
                    value={orgName}
                    placeholder="ex. Techyx"
                    className="outline-none border border-white/10 bg-white/5 text-white placeholder:text-white/30 p-2 pl-3 rounded-lg w-full focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
                <p className={`absolute right-0 py-1 px-3 w-fit shadow-sm z-10 bg-[#0b0b0d] text-white/40 top-1/2 -translate-y-1/2 ${inputClicked === true ? "opacity-100" : "opacity-0"} mr-2 rounded-md text-xs transition-opacity`}>
                    {maxLength - orgName.length}
                </p>
            </div>
            <div className="button pt-8">
                <button
                    onClick={() => setSteps(2)}
                    disabled={orgName.length === 0}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-9 rounded-lg py-2 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:from-red-400 hover:to-red-500 transition-all ease-linear shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

const Step2 = ({ setSteps, name, setName, fileInputRef, imagePreview, setImagePreview, logo, setLogo,handleSubmit }: Props2) => {
    const [maxLength] = useState<number>(500);
    const [inputClicked, setInputClicked] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogo(file);
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    };
    return (
        <div className="flex flex-col gap-5 mt-4">
            <div className="heading py-3 flex flex-col gap-3">
                <h1 className="alterativeSec font-black text-2xl sm:text-3xl text-white">
                    About your <span className="bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent underline cursiveFont">Organization?</span>
                </h1>
                <p className="text-white/50 text-sm sm:text-md">Adding your organization description and logo helps recognize and connect with<br className="hidden sm:block" /> your organization easily.</p>
            </div>
            <div className="">
                <div className="w-full sm:w-[80%] relative">
                    <textarea
                        onBlur={() => setInputClicked(false)}
                        onChange={(e) => {
                            setName(e.target.value)
                            setInputClicked(true)
                        }}
                        rows={2}
                        maxLength={maxLength}
                        onClick={() => setInputClicked(true)}
                        value={name}
                        placeholder="About the organization"
                        className={`outline-none resize-none p-2 pl-3 rounded-lg w-full bg-white/5 text-white placeholder:text-white/30 border ${name.length === 0
                            ? "border-red-500/50 ring-2 ring-red-500/20"
                            : "border-white/10"
                            } focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all`}
                    />
                    <p className={`absolute right-0 py-1 px-3 w-fit shadow-sm z-10 bg-[#0b0b0d] text-white/40 top-1/2 -translate-y-1/2 ${inputClicked === true ? "opacity-100" : "opacity-0"} mr-2 rounded-md text-xs transition-opacity`}>
                        {maxLength - name.length}
                    </p>
                </div>
                {name.length === 0 && <p className="text-red-400 text-xs pt-1">Unfortunately, you can't leave this blank.</p>}
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1">
                    <p className="text-sm font-semibold text-white">Add a Photo</p>
                    <p className="text-sm text-white/30">(optional)</p>
                </div>
                <div
                    className="relative w-24 h-24 cursor-pointer group w-fit"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />

                    <div className="w-24 h-24 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center shadow-lg shadow-red-500/5 hover:border-red-500/30 transition-all">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-white/30 text-xs">Logo</span>
                        )}
                    </div>

                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 border-2 border-[#0b0b0d] flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-105 transition-transform">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="absolute top-3 right-4 flex gap-4">
                <button
                    onClick={() => setSteps(1)}
                    className="bg-white/5 text-white/70 px-6 rounded-lg py-1 border border-white/10 cursor-pointer hover:bg-white/10 hover:text-white transition-all"
                >
                    Back
                </button>
            </div>
            <div className="button pt-8">
                <button
                    onClick={handleSubmit}
                    disabled={name.length === 0}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-9 rounded-lg py-2 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:from-red-400 hover:to-red-500 transition-all ease-linear shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}



const OrganizationDetails = () => {
    const [steps, setSteps] = useState<number>(1);
    const [orgName, setOrgName] = useState<string>("");
    const [name, setName] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [logo, setLogo] = useState<File | null>(null);
    const [emails, setEmails] = useState<string[]>([]);
    const { loading } = useSelector((state:RootState) => state.org); 
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleSubmit = async() => {
        const organizationData: CreateOrganizationData = { name: orgName, description: name, logo, emails };
        console.log(organizationData);
        try {
            const response = await dispatch(createOrganization(organizationData.name, organizationData.description,logo));
            if(response?.success){
                toast.success(response?.message || "Organization Successfully Created");
                await dispatch(getMe());
                navigate("/",{ replace : true });
            }else{
                toast.error(response?.message || "Unexpected error occured");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unexpected error occured")
        }
    }
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0b0b0d] via-[#0f0f14] to-[#0b0b0d] px-3 sm:px-4 py-8 sm:py-12 flex items-center justify-center">
            
            {/* Decorative glows */}
            <div className="blur-[880rem] pointer-events-none w-[15vh] sm:w-[20vh] md:w-[25vh] h-[15vh] sm:h-[20vh] md:h-[25vh] bg-red-500/20 absolute"></div>
            <div className="blur-[880rem] pointer-events-none w-[15vh] sm:w-[20vh] md:w-[25vh] h-[15vh] sm:h-[20vh] md:h-[25vh] top-0 right-0 bg-red-500/20 absolute"></div>
            <div className="absolute -top-40 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-red-500/10 blur-[120px]" />
            
            <div className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[70%] relative p-4 sm:p-6 border border-white/10 bg-white/5 backdrop-blur-sm mx-auto min-h-[80vh] shadow-2xl shadow-red-500/5 rounded-2xl overflow-hidden">
                <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 pointer-events-none opacity-30 select-none z-0">
                    <div className="w-80 p-4 rounded-xl border border-white/10 bg-white/5 shadow-md rotate-4 translate-x-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-24 h-2 bg-white/10 rounded-full"></div>
                            </div>
                            <div className="w-10 h-2 bg-white/5 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="w-full h-2 bg-white/10 rounded-full"></div>
                            <div className="w-4/5 h-2 bg-white/10 rounded-full"></div>
                        </div>
                    </div>

                    <div className="w-76 p-4 rounded-xl border border-white/10 bg-white/5 shadow-md -rotate-3 -translate-x-6">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-20 h-2 bg-white/10 rounded-full"></div>
                            </div>
                            <div className="w-8 h-2 bg-red-500/20 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="w-full h-2 bg-white/10 rounded-full"></div>
                            <div className="w-1/2 h-2 bg-white/10 rounded-full"></div>
                        </div>
                    </div>

                    <div className="w-80 p-4 rounded-xl border border-white/10 bg-white/5 shadow-md rotate-2 translate-x-8">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <div className="w-28 h-2 bg-white/10 rounded-full"></div>
                            </div>
                            <div className="w-12 h-2 bg-green-500/20 rounded-full"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="w-full h-2 bg-white/10 rounded-full"></div>
                            <div className="w-2/3 h-2 bg-white/10 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col h-full max-w-full lg:max-w-[65%]">
                    <div className="flex items-center gap-2 mb-4">
                        {[1, 2].map((itm, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className={`w-[2vw] min-w-[12px] max-w-[24px] rounded-full h-1.5 sm:h-2 cursor-pointer transition-all ${steps === itm ? "bg-gradient-to-r from-red-500 to-red-600 w-[3vw] shadow-lg shadow-red-500/30" : "bg-white/10 border border-white/5"
                                        }`}
                                />
                            )
                        })}
                    </div>
                    {steps === 1 && <Step1 setSteps={setSteps} orgName={orgName} setOrgName={setOrgName} />}
                    {steps === 2 && <Step2 setSteps={setSteps} imagePreview={imagePreview} setImagePreview={setImagePreview} fileInputRef={fileInputRef} name={name} setName={setName} logo={logo} setLogo={setLogo} handleSubmit={handleSubmit} />}
                </div>
                <div className="w-[21vh] h-[15vh] bg-red-500/20 left-1/2 -translate-x-1/2 blur-[90px] rounded-full absolute"></div>
                {loading && <Loader />}
            </div>
        </div>
    )
}

export default OrganizationDetails