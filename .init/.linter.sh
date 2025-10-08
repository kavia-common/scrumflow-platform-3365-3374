#!/bin/bash
cd /home/kavia/workspace/code-generation/scrumflow-platform-3365-3374/scrum_mind_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

