import { userProfileData } from "../../entities/user/lib/constants";
import { UserProfileForm } from "../../entities/user/ui/user-profile-form/user-profile-form";
import { ProfileLayout } from "../../layouts";

export const ProfilePage = () => {
  const userProfileForm = new UserProfileForm({
    isEditable: false,
    userProfileData,
  });
  return new ProfileLayout({
    backPath: "",
    body: userProfileForm,
  });
};
