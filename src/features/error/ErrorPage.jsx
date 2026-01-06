import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  // Debug log
  if (import.meta.env.DEV) {
    console.error("Route error:", error);
  }

  let errorMessage;
  let errorStatus = null;
  let errorStack = null;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorStack = error.stack;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unexpected error";
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-6 text-center text-neutral-100">
      <h1 className="text-5xl font-bold text-neutral-950">Oops!</h1>

      <p className="mt-3 text-lg italic text-neutral-400">
        Something went wrong.
      </p>

      <p className="mt-1 text-sm text-neutral-500 italic">
        {errorStatus ? `Status: ${errorStatus} — ` : ""}
        {errorMessage}
      </p>

      {import.meta.env.DEV && errorStack && (
        <pre className="mt-4 max-w-xl overflow-auto text-left text-xs text-red-300">
          {errorStack}
        </pre>
      )}

      <button
        onClick={() => navigate(-1)}
        className="relative mt-6 inline-block rounded-md bg-neutral-800 px-5 py-2 font-medium text-neutral-100 transition-all duration-300 hover:bg-neutral-700"
      >
        Return
      </button>
    </div>
  );
};

export default ErrorPage;
