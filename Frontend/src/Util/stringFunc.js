import _ from "lodash";

function customCapitalize(username) {
  // Check for invalid input types or empty values
  if (typeof username !== "string") {
    console.error("Invalid input: username must be a string");
    return ""; // Return an empty string or you can throw an error
  }

  if (!username.trim()) {
    console.error("Invalid input: username cannot be empty or just whitespace");
    return ""; // Handle empty or whitespace-only strings gracefully
  }

  // Split by spaces, capitalize each word, and join them back
  return username
    .split(" ")
    .filter((word) => word) // Filter out empty strings from multiple spaces
    .map((word) => _.upperFirst(_.toLower(word))) // Ensure only the first letter is capitalized
    .join(" ");
}

export default customCapitalize;
