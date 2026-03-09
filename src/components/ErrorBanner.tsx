import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorBannerProps {
    message?: string;
}

const ErrorBanner = ({ message }: ErrorBannerProps) =>
    !message ? null : (
        <div className="rounded-2xl border border-red-500/30 bg-linear-to-r from-red-500/10 to-rose-500/10 px-4 py-3 text-red-200 backdrop-blur-sm shadow-xl sm:px-6 sm:py-4">
            <FaExclamationTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
                <p className="font-medium text-red-300 mb-1 text-sm sm:text-base">Error</p>
                <p className="text-xs leading-relaxed sm:text-sm">{message}</p>
            </div>
        </div>
    )

export default ErrorBanner