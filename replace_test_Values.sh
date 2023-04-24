#!/bin/bash

# Check if two arguments are provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <CSV_FILENAME> <UNIT_TEST_FILENAME>"
  exit 1
fi

# Store the CSV and unit test filenames from the input arguments
CSV_FILENAME="$1"
UNIT_TEST_FILENAME="$2"

# Read the CSV file line by line
while IFS=, read -r placeholder value
do
  # Find and replace the placeholder with the correct value in the unit test file
  sed -i '' "s/\'$placeholder\'/$value/g" "$UNIT_TEST_FILENAME"
done < "$CSV_FILENAME"

echo "Values replaced in $UNIT_TEST_FILENAME"
