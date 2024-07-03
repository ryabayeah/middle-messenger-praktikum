import { UserProfileData } from "../../model/base";

export const userProfileData: UserProfileData = {
	first_name: "Иван",
	second_name: "Иванов",
	display_name: "Иван",
	login: "ivanivanov",
	email: "pochta@yandex.ru",
	phone: "+ 7 (909) 967 30 30",
	avatar: "",
};

export const ProfileChangePasswordProps = {
	oldPassword: "333",
	newPassword: "32",
	newPasswordRepeat: "3",
};
