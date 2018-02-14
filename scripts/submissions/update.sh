#!/bin/bash

API="http://localhost:4741"
URL_PATH="/submissions"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "submissions": {
      "answer": "'"${ANSWER}"'"
    }
  }'

echo
