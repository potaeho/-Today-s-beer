// HTML 태그·XSS 패턴 제거
export function sanitizeText(str, maxLength = 280) {
  if (typeof str !== "string") return "";
  return str
    .slice(0, maxLength)
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
}

// 이메일 형식 검증
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// 한국 전화번호 검증 (010-1234-5678 / 01012345678 등)
export function isValidPhone(phone) {
  const digits = phone.replace(/[\s\-]/g, "");
  return /^01[016789]\d{7,8}$/.test(digits);
}
