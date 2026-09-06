
export type Inputs = {
    avatar : string;
    username : string;
    email : string;
    password : string;
    confirmPassword : string;
}
export type Props = {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  orgName: string;
  setOrgName: React.Dispatch<React.SetStateAction<string>>;
};
export type Props2 = {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  logo : File | null;
  setLogo : React.Dispatch<React.SetStateAction<File | null>>;
  handleSubmit : () => void;

};
