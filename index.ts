#!/usr/bin/env bun
import { execSync } from "child_process";
import { generate } from "random-words";

function generateBranchName() {
  const words = generate({ exactly: 3, join: "-" });
  return words;
}

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

function updateBranch() {
  try {
    execSync(`git pull && git pull origin main --no-rebase`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating branch:", error.message);
    }
  }
}


const args = process.argv.slice(2);

switch (args[0]) {
  case "new":
    createNewBranch();
    break;
  case "update":
    updateBranch();
    break;
  default:
    console.log("Invalid command. Available commands: new");
}
