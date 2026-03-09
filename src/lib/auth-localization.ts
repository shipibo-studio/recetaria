import type { AuthLocalization } from "@neondatabase/auth/react/ui"

export const esLocalization: AuthLocalization = {
  // Sign In
  SIGN_IN: "Iniciar sesión",
  SIGN_IN_ACTION: "Iniciar sesión",
  SIGN_IN_DESCRIPTION: "Ingresa tu correo electrónico y contraseña",
  SIGN_IN_USERNAME_DESCRIPTION: "Ingresa tu usuario o correo electrónico",
  EMAIL: "Correo electrónico",
  EMAIL_PLACEHOLDER: "correo@ejemplo.com",
  EMAIL_REQUIRED: "El correo electrónico es requerido",
  PASSWORD: "Contraseña",
  PASSWORD_PLACEHOLDER: "Contraseña",
  PASSWORD_REQUIRED: "La contraseña es requerida",
  FORGOT_PASSWORD_LINK: "¿Olvidaste tu contraseña?",
  OR_CONTINUE_WITH: "O continúa con",
  DONT_HAVE_AN_ACCOUNT: "¿No tienes una cuenta?",
  ALREADY_HAVE_AN_ACCOUNT: "¿Ya tienes una cuenta?",
  
  // Sign Up (hidden for now, but translated)
  SIGN_UP: "Crear cuenta",
  SIGN_UP_ACTION: "Crear cuenta",
  SIGN_UP_DESCRIPTION: "Ingresa tu información para crear una cuenta",
  NAME: "Nombre",
  NAME_PLACEHOLDER: "Nombre completo",
  CONFIRM_PASSWORD: "Confirmar contraseña",
  CONFIRM_PASSWORD_PLACEHOLDER: "Confirmar contraseña",
  CONFIRM_PASSWORD_REQUIRED: "Debes confirmar la contraseña",
  PASSWORDS_DO_NOT_MATCH: "Las contraseñas no coinciden",
  
  // Forgot Password
  FORGOT_PASSWORD: "Recuperar contraseña",
  FORGOT_PASSWORD_ACTION: "Enviar enlace",
  FORGOT_PASSWORD_DESCRIPTION: "Ingresa tu correo para recuperar tu contraseña",
  FORGOT_PASSWORD_EMAIL: "Revisa tu correo para el enlace de recuperación",
  
  // Reset Password
  RESET_PASSWORD: "Restablecer contraseña",
  RESET_PASSWORD_ACTION: "Guardar nueva contraseña",
  RESET_PASSWORD_DESCRIPTION: "Ingresa tu nueva contraseña",
  RESET_PASSWORD_SUCCESS: "Tu contraseña ha sido actualizada",
  NEW_PASSWORD: "Nueva contraseña",
  NEW_PASSWORD_PLACEHOLDER: "Nueva contraseña",
  NEW_PASSWORD_REQUIRED: "La nueva contraseña es requerida",
  CURRENT_PASSWORD: "Contraseña actual",
  CURRENT_PASSWORD_PLACEHOLDER: "Contraseña actual",
  
  // Common
  CANCEL: "Cancelar",
  SAVE: "Guardar",
  DELETE: "Eliminar",
  CONTINUE: "Continuar",
  SIGN_OUT: "Cerrar sesión",
  ACCOUNT: "Mi cuenta",
  SETTINGS: "Configuración",
  GO_BACK: "Volver",
  
  // Errors
  INVALID_EMAIL: "Correo electrónico inválido",
  INVALID_EMAIL_OR_PASSWORD: "Correo o contraseña incorrectos",
  INVALID_PASSWORD: "Contraseña incorrecta",
  USER_NOT_FOUND: "Usuario no encontrado",
  USER_ALREADY_EXISTS: "El usuario ya existe",
  UNEXPECTED_ERROR: "Ocurrió un error inesperado",
  SESSION_EXPIRED: "Tu sesión ha expirado",
  EMAIL_VERIFICATION: "Revisa tu correo para el enlace de verificación",
  
  // Common phrases
  IS_REQUIRED: "es requerido",
  IS_INVALID: "es inválido",
  UPDATED_SUCCESSFULLY: "Actualizado exitosamente",
  REQUEST_FAILED: "La solicitud falló",
}
