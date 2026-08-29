import { useRef, useState } from "react"

const Step1 = ({ setSteps, orgName, setOrgName }: any) => {
    const [maxLength] = useState<number>(50);
    const [inputClicked, setInputClicked] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-5 mt-4">
            <div className="heading py-3 flex flex-col gap-3">
                <h1 className="alterativeSec font-black text-3xl">Name your <span className="text-background-items underline cursiveFont">OrgSyncAi</span> workspace</h1>
                <p className="text-shadow-input-placeholder text-md">Choose something your team will recognize like the name of your<br /> company or team. You can always update it later.</p>
            </div>
            <div className="w-[45%] relative">
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
                    className="outline-none border border-border p-1 pl-3 rounded-lg w-full"
                />
                <p className={`absolute right-0 py-1 px-3 w-fit shadow-sm z-10 bg-background top-1/2 -translate-y-1/2 ${inputClicked === true ? "opacity-100" : "opacity-0"} mr-2 rounded-md text-xs`}>
                    {maxLength - orgName.length}
                </p>
            </div>
            <div className="button pt-8">
                <button
                    onClick={() => setSteps(2)}
                    disabled={orgName.length === 0}
                    className="bg-background-items text-white px-9 rounded-lg py-1 border border-border disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer disabled:bg-background-secondary disabled:text-text hover:bg-background-itemsdark transition-all ease-linear"
                >
                    Next
                </button>
            </div>

        </div>
    )
}

const Step2 = ({ setSteps, name, setName,fileInputRef,imagePreview,setImagePreview }: any) => {
    const [maxLength] = useState<number>(50);
    const [inputClicked, setInputClicked] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    };
    return (
        <div className="flex  flex-col gap-5 mt-4">
            <div className="heading py-3 flex flex-col gap-3">
                <h1 className="alterativeSec font-black text-3xl">What's your <span className="text-background-items underline cursiveFont">Name?</span></h1>
                <p className="text-shadow-input-placeholder text-md">Adding your name and profile photo helps recognize and connect with<br /> you more easily.</p>
            </div>
            <div className="">
                <div className="w-[45%] relative">
                    <input
                        onBlur={() => setInputClicked(false)}
                        onChange={(e) => {
                            setName(e.target.value)
                            setInputClicked(true)
                        }}
                        maxLength={maxLength}
                        onClick={() => setInputClicked(true)}
                        type="text"
                        value={name}
                        placeholder="First and last name"
                        className={`outline-none p-1 pl-3 rounded-lg w-full border ${name.length === 0
                            ? "border-background-items ring-2 ring-background-items/30"
                            : "border-border"
                            }`}
                    />
                    <p className={`absolute right-0 py-1 px-3 w-fit shadow-sm z-10 bg-background top-1/2 -translate-y-1/2 ${inputClicked === true ? "opacity-100" : "opacity-0"} mr-2 rounded-md text-xs`}>
                        {maxLength - name.length}
                    </p>

                </div>
                {name.length === 0 && <p className="text-background-itemsdark text-xs pt-1"> Unfortunately, you can’t leave this blank.</p>}
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1">
                <p className="text-sm font-semibold">Add a Photo</p>
                <p className="text-sm text-border-active">(optional)</p>
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

                    {/* Avatar Preview Box */}
                    <div className="w-24 h-24 rounded-2xl border border-border bg-background-secondary overflow-hidden flex items-center justify-center shadow-sm">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-text-muted text-xs">Logo</span>
                        )}
                    </div>

                    {/* Edit Pencil Badge Overlay */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-text border-2 border-background flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                        <svg className="w-4 h-4 text-background" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="absolute top-3 right-4 flex gap-4">
                <button
                    onClick={() => setSteps(1)}
                    className="bg-background-secondary px-6 rounded-lg py-1 border border-border cursor-pointer"
                >
                    Back
                </button>
            </div>
             <div className="button pt-8">
                <button
                    onClick={() => setSteps(3)}
                    disabled={name.length === 0}
                    className="bg-background-items text-white px-9 rounded-lg py-1 border border-border disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer disabled:bg-background-secondary disabled:text-text hover:bg-background-itemsdark transition-all ease-linear"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

const Step3 = ({ setSteps }: any) => {
    return (
        <div className="flex flex-col gap-5 mt-4">
            <div className="heading py-3 flex flex-col gap-3">
                <h1 className="alterativeSec font-black text-3xl">Invite your <span className="text-background-items underline cursiveFont">teammates</span></h1>
                <p className="text-shadow-input-placeholder text-md">Slack works better with more people. Add your core collaborators.</p>
            </div>
            <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold">Add teammate by email</p>
                <textarea placeholder="Ex.ellis@gmail.com, maria@gmail.com" className="outline-none border p-3 border-border w-[72%] resize-none rounded-lg" rows={5}  id=""></textarea>
            </div>
            <div className="button pt-8 flex items-center gap-1">
                <button
                    onClick={() => setSteps(3)}
                    disabled={false}
                    className="bg-background-items  text-white px-9 rounded-lg py-1 border border-border disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer disabled:bg-background-secondary disabled:text-text hover:bg-background-itemsdark transition-all ease-linear"
                >
                    Next
                </button>
                <button
                    onClick={() => setSteps(3)}
                    className=" px-3 hover:underline cursor-pointer alterativeSec rounded-lg py-1  transition-all ease-linear"
                >
                    Skip this step
                </button>
            </div>
            <div className="absolute top-3 right-4 flex gap-4">
                <button
                    onClick={() => setSteps(2)}
                    className="bg-background-secondary px-6 rounded-lg py-1 border border-border cursor-pointer"
                >
                    Back
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

    return (
        <div className="max-w-[70%] relative p-6 border border-border mx-auto h-[80vh] bg-background shadow-xl mt-6 rounded-2xl overflow-hidden">
            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-5 pointer-events-none opacity-65 select-none z-0">
                <div className="w-80 p-4 rounded-xl border border-border bg-background-secondary shadow-md rotate-4 translate-x-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-background-items"></div>
                            <div className="w-24 h-2 bg-border rounded-full"></div>
                        </div>
                        <div className="w-10 h-2 bg-border/40 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-full h-2 bg-border/60 rounded-full"></div>
                        <div className="w-4/5 h-2 bg-border/60 rounded-full"></div>
                    </div>
                </div>

                <div className="w-76 p-4 rounded-xl border border-border bg-background-secondary shadow-md -rotate-3 -translate-x-6">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <div className="w-20 h-2 bg-border rounded-full"></div>
                        </div>
                        <div className="w-8 h-2 bg-primary/20 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-full h-2 bg-border/60 rounded-full"></div>
                        <div className="w-1/2 h-2 bg-border/60 rounded-full"></div>
                    </div>
                </div>

                <div className="w-80 p-4 rounded-xl border border-border bg-background-secondary shadow-md rotate-2 translate-x-8">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-success"></div>
                            <div className="w-28 h-2 bg-border rounded-full"></div>
                        </div>
                        <div className="w-12 h-2 bg-success/20 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-full h-2 bg-border/60 rounded-full"></div>
                        <div className="w-2/3 h-2 bg-border/60 rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex flex-col h-full max-w-[65%]">
                <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3].map((itm, idx) => {
                        return (
                            <div
                                key={idx}
                                className={`w-[2vw] rounded-full h-[1.3vh] cursor-pointer transition-colors ${steps === itm ? "bg-background-items" : "bg-background-secondary border border-border"
                                    }`}
                            />
                        )
                    })}
                </div>
                {steps === 1 && <Step1 setSteps={setSteps} orgName={orgName} setOrgName={setOrgName} />}
                {steps === 2 && <Step2 setSteps={setSteps} imagePreview={imagePreview} setImagePreview={setImagePreview} fileInputRef={fileInputRef} name={name} setName={setName} />}
                {steps === 3 && <Step3 setSteps={setSteps} />}
            </div>
            <div className="w-[21vh] h-[15vh] bg-background-items left-1/2 -translate-x-1/2 blur-[90px] rounded-full absolute"></div>
        </div>
    )
}

export default OrganizationDetails