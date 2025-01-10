import { z } from 'zod';

export const registrationSchema = z.object({
    phoneNumber: z.string().min(10, '전화번호는 최소 10자리여야 합니다.'),
    location: z.string().nonempty('위치 정보는 필수입니다.'),
    gender: z.enum(['male', 'female']).refine(
      (val) => ['male', 'female'].includes(val),
      {
        message: '올바른 성별 값을 입력해주세요.',
      }
    ),
    ageRange: z.enum(['10-19', '20-29', '30-39', '40-49', '50+'], {
      errorMap: () => ({ message: '올바른 연령대를 입력해주세요.' }),
    }),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: '서비스 약관에 동의해야 합니다.',
    }),
  });
  
