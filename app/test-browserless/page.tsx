"use client";

import { useState } from "react";

export default function TestBrowserlessPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testBrowserless = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        "/api/check-court-availability?date=2025-01-15&hour=10"
      );
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to test Browserless");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Browserless Test Page</h1>

        <button
          onClick={testBrowserless}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-6"
        >
          {loading ? "Testing..." : "Test Browserless Connection"}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h2 className="text-red-800 font-semibold mb-2">Error:</h2>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Result:</h2>
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Available:</span>{" "}
                <span
                  className={
                    result.available ? "text-green-600" : "text-red-600"
                  }
                >
                  {result.available ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="font-semibold">Date:</span> {result.date}
              </div>
              <div>
                <span className="font-semibold">Hour:</span> {result.hour}:00
              </div>
              {result.source && (
                <div>
                  <span className="font-semibold">Source:</span> {result.source}
                </div>
              )}
              {result.error && (
                <div className="mt-4">
                  <span className="font-semibold text-red-600">Error:</span>{" "}
                  <span className="text-red-600">{result.error}</span>
                </div>
              )}
              {result.errorDetails && (
                <div className="mt-4">
                  <span className="font-semibold">Error Details:</span>
                  <pre className="bg-gray-100 p-3 rounded mt-2 overflow-auto text-sm">
                    {JSON.stringify(result.errorDetails, null, 2)}
                  </pre>
                </div>
              )}
              {result.note && (
                <div className="mt-4 text-blue-600">{result.note}</div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Full Response:</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="font-semibold text-blue-900 mb-2">
            What to look for:
          </h2>
          <ul className="list-disc list-inside space-y-1 text-blue-800">
            <li>
              <strong>✅ Working:</strong> Source shows "rhinebecktennis.com
              (Browserless.io)" and available is true/false
            </li>
            <li>
              <strong>⚠️ Configured but failing:</strong> Error shows "Browserless
              request failed: 400" (this is your current state)
            </li>
            <li>
              <strong>❌ Not configured:</strong> Note says "Browserless.io not
              configured"
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

