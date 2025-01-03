"use client";

import React, { useState, useEffect } from "react";

export default function SkillStats() {
  const [languageProblemCount, setlanguageProblemCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `query languageStats($username: String!) {
          matchedUser(username: $username) {
            languageProblemCount {
              languageName
              problemsSolved
            }
          }
        }`;
      const variables = { username: "megh_2k" };

      const response = await fetch("/api/leetcode/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result = await response.json();
      setlanguageProblemCount(result.data.matchedUser.languageProblemCount);
    };
    fetchData();
  }, []);

  return (
    <div>
      {languageProblemCount ? (
        <div>
          {languageProblemCount.map((lang, index) => (
            <div key={index}>
              <p>
                {lang.languageName}: {lang.problemsSolved} problems solved
              </p>
            </div>
          ))}
        </div>
      ) : (
        <h1>Loading Data</h1>
      )}
    </div>
  );
}
