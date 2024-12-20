export interface KaKaoUserDTO {
    id: number;
    nickname: string;
}

export interface RegistrationRequestBody {
    userId: string;
    gender: string;
    ageRange: string;
    phoneNumber: string;
    location: string;
    termsAccepted: boolean;
}
  