export class UserResponseDto {
  id: string;
  name?: string;
  email: string;
  role: string;
  account_type?: string;
  blocked?: boolean;
  image?: string;
}
