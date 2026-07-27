// custom-translations.ts
import { enTranslations } from '@payloadcms/translations/languages/en'
import type { NestedKeysStripped } from '@payloadcms/translations'
import customTranslationsEn from './locales/en.json'

// 1. Gom tất cả translations (cả custom lẫn mặc định của Payload)
export const customTranslations = {
  en: {
    ...enTranslations, // Giữ lại các key mặc định của Payload
    ...customTranslationsEn, // Thêm các key custom của bạn
  },
}

// 2. Định nghĩa Type đại diện cho toàn bộ Object Translation
export type CustomTranslationsObject = typeof customTranslations.en & typeof enTranslations
export type CustomTranslationsKeys = NestedKeysStripped<CustomTranslationsObject>

// 3. ĐIỀU QUAN TRỌNG NHẤT: Khai báo Module Augmentation
// Đoạn này bảo với TypeScript: "Hãy đè Type CustomTranslations bằng Type mới của tôi"
declare module '@payloadcms/translations' {
  export interface CustomTranslations extends CustomTranslationsObject {}
}
