"use client";

import React, { useState, useTransition, FormEvent, ChangeEvent } from "react";
import { levenshtein } from "@/lib/levenshtein";
import { calculateLavenshteinOnServerAction } from "@/actions/calculateLavenshteinOnServer";

export function EditDistanceForm() {
  const [str1, setStr1] = useState<string>("");
  const [str2, setStr2] = useState<string>("");
  const [clientResult, setClientResult] = useState<number | null>(null);
  const [serverResult, setServerResult] = useState<number | null | string>(
    null,
  );

  const [isServerPending, startServerTransition] = useTransition();

  const handleClientCalculate = () => {
    const distance = levenshtein(str1, str2);
    setClientResult(distance);
    setServerResult(null);
  };

  const handleServerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClientResult(null);
    setServerResult("Calculating...");

    startServerTransition(async () => {
      const result = await calculateLavenshteinOnServerAction(str1, str2);
      if ("error" in result) {
        setServerResult(`Server Error: ${result.error}`);
      } else {
        setServerResult(result.distance);
      }
    });
  };

  const inputStyles = `
    w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-zinc-800
    border border-zinc-300 dark:border-zinc-700
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    font-mono text-zinc-900 dark:text-zinc-100
    transition-colors duration-200
  `;

  const buttonStyles = `
    px-4 py-2 rounded-md font-mono font-medium
    focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900
    transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const primaryButtonStyles = `
    ${buttonStyles} bg-amber-500 text-white hover:bg-amber-400 focus:ring-blue-500
  `;

  const secondaryButtonStyles = `
    ${buttonStyles} bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 focus:ring-gray-500
  `;

  return (
    <div className="w-full max-w-xl mx-auto p-6 md:p-8 bg-white dark:bg-zinc-800 rounded-lg shadow-md border border-gray-200 dark:border-zinc-700">
      <form onSubmit={handleServerSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="str1"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            String 1
          </label>
          <input
            type="text"
            id="str1"
            value={str1}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStr1(e.target.value)
            }
            className={inputStyles}
            placeholder="Enter first string"
            required
          />
        </div>

        <div>
          <label
            htmlFor="str2"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            String 2
          </label>
          <input
            type="text"
            id="str2"
            value={str2}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setStr2(e.target.value)
            }
            className={inputStyles}
            placeholder="Enter second string"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className={`${primaryButtonStyles} flex-1`}
            disabled={isServerPending || !str1 || !str2}
          >
            {isServerPending ? "Calculating Server..." : "Calculate on Server"}
          </button>
          <button
            type="button"
            onClick={handleClientCalculate}
            className={`${secondaryButtonStyles} flex-1`}
            disabled={!str1 || !str2}
          >
            Calculate on Client
          </button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Results:
        </h2>

        <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Server Calculation:
          </p>
          <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 break-words">
            {serverResult !== null ? (
              String(serverResult)
            ) : (
              <span className="text-gray-400 dark:text-gray-500">N/A</span>
            )}
          </p>
        </div>

        <div className="p-4 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Client Calculation:
          </p>
          <p className="text-2xl font-bold font-mono text-green-600 dark:text-green-400">
            {clientResult !== null ? (
              String(clientResult)
            ) : (
              <span className="text-gray-400 dark:text-gray-500">N/A</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
