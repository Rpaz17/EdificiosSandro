import { useState, useRef, useEffect } from "react";
import { Building2, ArrowLeft } from "lucide-react";

export function VerificarCodigo({ onBack, onVerified, email }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isComplete, setIsComplete] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const allFilled = code.every((digit) => digit !== "");
    setIsComplete(allFilled);
  }, [code]);

  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.split("").filter((char) => /^\d$/.test(char));

    const newCode = [...code];
    digits.forEach((digit, index) => {
      if (index < 6) newCode[index] = digit;
    });
    setCode(newCode);

    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete) return;

    const fullCode = code.join("");
    console.log("Verify code:", fullCode);

    if (onVerified) {
      onVerified(fullCode);
    }
  };

  const handleResendCode = () => {
    console.log("Resend code to:", email);
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleBackClick = () => {
    console.log("Back to forgot password");
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Verify Code Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-gray-900 mb-3">Verificar Código</h1>

          {/* Description */}
          <p className="text-center text-sm text-gray-600 mb-8">
            Hemos enviado un código a tu correo. Ingrésalo para continuar.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Code Inputs */}
            <div className="flex gap-2 justify-center">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ))}
            </div>

            {/* Resend Code Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Reenviar código
              </button>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={!isComplete}
              className={`w-full px-4 py-3 rounded-lg transition-colors ${
                isComplete
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-300 text-white cursor-not-allowed"
              }`}
            >
              Verificar Código
            </button>

            {/* Back Button */}
            <button
              type="button"
              onClick={handleBackClick}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
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

export default VerificarCodigo;
