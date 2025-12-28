"use client";

import { useState } from "react";

export default function DebugBrowserlessPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostics = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("/api/debug-browserless");
      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Failed to run diagnostics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Browserless Diagnostics</h1>
        <p className="text-gray-600 mb-6">
          Comprehensive test of your Browserless.io configuration and connectivity
        </p>

        <button
          onClick={runDiagnostics}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-6 font-semibold"
        >
          {loading ? "Running Diagnostics..." : "Run Diagnostics"}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h2 className="text-red-800 font-semibold mb-2">Error:</h2>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {results && (
          <div className="space-y-6">
            {/* Summary */}
            <div
              className={`border-2 rounded-lg p-6 ${
                results.summary.working
                  ? "bg-green-50 border-green-200"
                  : results.summary.configured
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-4">Summary</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Configured:</span>
                  <span
                    className={
                      results.summary.configured ? "text-green-600" : "text-red-600"
                    }
                  >
                    {results.summary.configured ? "✅ Yes" : "❌ No"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Working:</span>
                  <span
                    className={
                      results.summary.working ? "text-green-600" : "text-red-600"
                    }
                  >
                    {results.summary.working ? "✅ Yes" : "❌ No"}
                  </span>
                </div>
                {results.summary.errors.length > 0 && (
                  <div className="mt-4">
                    <span className="font-semibold">Errors:</span>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {results.summary.errors.map((err: string, i: number) => (
                        <li key={i} className="text-red-600 text-sm">
                          {err}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Environment Variables Check */}
            {results.checks.envVars && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Environment Variables</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="font-semibold">API Key Set:</span>{" "}
                    {results.checks.envVars.hasApiKey ? "✅ Yes" : "❌ No"}
                  </div>
                  <div>
                    <span className="font-semibold">API Key Length:</span>{" "}
                    {results.checks.envVars.apiKeyLength} characters
                  </div>
                  <div>
                    <span className="font-semibold">API Key Prefix:</span>{" "}
                    {results.checks.envVars.apiKeyPrefix}
                  </div>
                  <div>
                    <span className="font-semibold">Browserless URL:</span>{" "}
                    {results.checks.envVars.browserlessUrl}
                  </div>
                </div>
              </div>
            )}

            {/* Browserless API Check */}
            {results.checks.browserlessApi && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Browserless API Connection</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {results.checks.browserlessApi.status} {results.checks.browserlessApi.statusText}
                  </div>
                  <div>
                    <span className="font-semibold">OK:</span>{" "}
                    {results.checks.browserlessApi.ok ? "✅ Yes" : "❌ No"}
                  </div>
                  {results.checks.browserlessApi.error && (
                    <div className="mt-4">
                      <span className="font-semibold text-red-600">Error:</span>
                      <pre className="bg-gray-100 p-3 rounded mt-2 overflow-auto text-xs">
                        {JSON.stringify(results.checks.browserlessApi.error, null, 2)}
                      </pre>
                    </div>
                  )}
                  {results.checks.browserlessApi.response && (
                    <div className="mt-4">
                      <span className="font-semibold text-green-600">Response:</span>
                      <pre className="bg-gray-100 p-3 rounded mt-2 overflow-auto text-xs">
                        {JSON.stringify(results.checks.browserlessApi.response, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Court Availability Endpoint Check */}
            {results.checks.courtAvailabilityEndpoint && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Court Availability Endpoint</h3>
                <div className="space-y-2 font-mono text-sm">
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {results.checks.courtAvailabilityEndpoint.status}{" "}
                    {results.checks.courtAvailabilityEndpoint.statusText}
                  </div>
                  {results.checks.courtAvailabilityEndpoint.response && (
                    <div className="mt-4">
                      <span className="font-semibold">Response:</span>
                      <pre className="bg-gray-100 p-3 rounded mt-2 overflow-auto text-xs">
                        {JSON.stringify(
                          results.checks.courtAvailabilityEndpoint.response,
                          null,
                          2
                        )}
                      </pre>
                    </div>
                  )}
                  {results.checks.courtAvailabilityEndpoint.error && (
                    <div className="mt-4">
                      <span className="font-semibold text-red-600">Error:</span>
                      <pre className="bg-gray-100 p-3 rounded mt-2 overflow-auto text-xs">
                        {results.checks.courtAvailabilityEndpoint.error}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Full Results */}
            <details className="bg-white border border-gray-200 rounded-lg p-6">
              <summary className="cursor-pointer font-semibold text-lg mb-4">
                Full Diagnostic Results (JSON)
              </summary>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                {JSON.stringify(results, null, 2)}
              </pre>
            </details>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Next Steps</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-800">
                <li>
                  <strong>If API Key is not set:</strong> Add BROWSERLESS_API_KEY to Vercel
                  environment variables
                </li>
                <li>
                  <strong>If getting 401/403 errors:</strong> Your API key is invalid or expired -
                  check Browserless dashboard
                </li>
                <li>
                  <strong>If getting 400 errors:</strong> Check Browserless dashboard logs for
                  specific error messages
                </li>
                <li>
                  <strong>If getting timeouts:</strong> Browserless service might be down or your
                  request is too complex
                </li>
                <li>
                  <strong>Check Browserless Dashboard:</strong>{" "}
                  <a
                    href="https://browserless.io/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    https://browserless.io/dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

