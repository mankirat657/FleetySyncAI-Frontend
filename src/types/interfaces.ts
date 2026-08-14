export interface UserPreferences{
    theme : "light" | "dark";
    notification : Boolean;
}

export interface OrganizationMembership{
    organizationId : string;
    role : "owner" | "admin" | "member"
}
export interface User {
    id : string;
    username : string;
    email : string;
    avatar : string;
    organization : OrganizationMembership[];
    preferences : UserPreferences;
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