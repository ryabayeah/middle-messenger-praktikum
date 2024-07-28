import { User } from '../../entities/user/model';
import { UserProfileForm } from '../../entities/user/ui';
import { ProfileLayout } from '../../layouts';
import { APP_PATH } from '../../shared/constants';
import { withStore } from '../../shared/hoc';
import { Block, store } from '../../shared/lib';

const withUser = withStore((state) => {
  return {
    user: { ...state.user },
    isLoadingUser: state.isLoading.isLoadingUser,
  };
});

export class ProfilePage extends ProfileLayout {
  constructor() {
    const ConnectedUserProfileForm = withUser(UserProfileForm as typeof Block);
    const userProfileForm = new ConnectedUserProfileForm({
      user: store.getState().user as User,
    });
    super({
      backPath: APP_PATH.CHATS,
      body: userProfileForm,
    });
  }
}
