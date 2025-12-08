import { useState } from "react";
import { Building2, ArrowLeft } from "lucide-react";

export function ForgotPassword({ onBack, onCodeSent }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Send code to:", email);

    if (onCodeSent) {
      onCodeSent(email);
    }
  };

  const handleBackToLogin = () => {
    console.log("Back to login");
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Forgot Password Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-gray-900 mb-3">
            Recuperar Contraseña
          </h1>

          {/* Description */}
          <p className="text-center text-sm text-gray-600 mb-8">
            Ingresa tu correo electrónico para enviar un código de verificación.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Send Code Button */}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Enviar Código
            </button>

            {/* Back to Login Button */}
            <button
              type="button"
              onClick={handleBackToLogin}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Iniciar Sesión
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © Edificios Sandro
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
