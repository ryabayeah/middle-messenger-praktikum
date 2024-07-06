import { userProfileData } from "../../entities/user/lib";
import { UserProfileForm } from "../../entities/user/ui";
import { ProfileLayout } from "../../layouts";
import { APP_PATH } from "../../shared/constants";

export const ProfilePage = () => {
  const userProfileForm = new UserProfileForm({
    isEditable: false,
    userProfileData,
  });
  return new ProfileLayout({
    backPath: APP_PATH.CHATS,
    body: userProfileForm,
  });
};
