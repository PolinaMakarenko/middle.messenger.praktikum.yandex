export type APIError = {
    reason: string;
};
  
export type UserDTO = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
};

export type PasswordData = {
    oldPassword: string;
    newPassword: string;
}


export type Chat = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: Message | null,
    created_by: number,
  };
