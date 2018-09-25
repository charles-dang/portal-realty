#!/bin/bash
set -e #stop on all ERRORS

export AWS_PROFILE=test
#compile new project
npm run-script build

#upload
aws s3 sync ./build s3://portal.danguardmortgage.com
