import { userProfileData } from '../../entities/user/lib';
import { UserProfileForm } from '../../entities/user/ui';
import { ProfileLayout } from '../../layouts';
import { APP_PATH } from '../../shared/constants';

export class ProfilePage extends ProfileLayout {
  constructor() {
    const userProfileForm = new UserProfileForm({
      isEditable: false,
      userProfileData,
    });
    super({
      backPath: APP_PATH.CHATS,
      body: userProfileForm,
    });
  }
}
