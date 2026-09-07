/********* User interfaces ************/
export interface UserPreferences{
    theme : "light" | "dark";
    notification : Boolean;
}

export interface OrganizationMembership{
    id: null | undefined | string;
    role? : "owner" | "admin" | "member";
    description? : string;
    memberAvatars : [];
    name : string;
    avatar : string;
    membersCount : number;
    lastLogin : number;

}
export interface User {
    id : string;
    username : string;
    email : string;
    avatar : string;
    organization : OrganizationMembership[];
    preferences : UserPreferences;
    isEmailVerified : boolean;
    lastLogin : Date
}
export interface AuthState{
    user : User | null;
    loading : boolean;
    error : string | null;
    isAuthenticated : boolean;
    authChecked : boolean
}
export interface RegisterData {
    username : string;
    email : string;
    password : string;
}
export interface loginData{
    email : string;
    password : string;
}
export interface EmailSendProps {
  setEmailShow: React.Dispatch<React.SetStateAction<boolean>>;
}
/********** Organization Interfaces ****************/
export interface Organization {
    _id : string;
    name: string;
    description: string;
    logo: string;
    owner: {
        _id : string;
        avatar : string;
        email : string;
        username : string
    };
    membersCount: number;
    lastLogin: Date;
}

export interface CreateOrganizationData {
    name: string;
    description: string;
    logo: File | null;
    emails?: string[];
}

export interface OrgState {
    organization: Organization | null;
    loading: boolean;
    error: string | null;
    isOrgExist: boolean;
}
/********** Invitations interfaces ****************/
export interface Invitation {
    organization : string | null;
    invitedBy : string;
    email : string;
    role : string;
    status : string;
    token : string;
    expiresAt : Date;
}
export interface InviteState{
    invitation : Invitation | null;
    loading : boolean;
    error : string | null;
    isAccepted : boolean;
}