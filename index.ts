#!/usr/bin/env bun

// Import required modules
import { execSync } from "child_process";
import { generate } from "random-words"; // You might need to install this package

// Function to generate a random branch name
function generateBranchName() {
  const words = generate({ exactly: 3, join: "-" });
  return words;
}

// Function to create a new git branch
function createNewBranch() {
  const branchName = generateBranchName();
  try {
    execSync(`git checkout -b ${branchName}`);
    console.log(`New branch created: ${branchName}`);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("not a git repository")) {
        console.error(`Please run this command from within a git repository.`);
      } else {
        console.error("Error creating new branch:", error.message);
      }
    }
  }
}

// Main CLI logic
const args = process.argv.slice(2);

switch (args[0]) {
  case "new":
    createNewBranch();
    break;
  default:
    console.log("Invalid command. Available commands: new");
}
