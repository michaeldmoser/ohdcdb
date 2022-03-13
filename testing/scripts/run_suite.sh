#!/usr/bin/env bash
set -e

# Run an individual test suite if the TEST_SUITE environmental variable is set.
if [ -z "$TEST_SUITE" ]; then
    TEST_SUITE=""
fi

export DJANGO_SETTINGS_MODULE=backend.settings
CMD="robot --console verbose --outputdir testing/reports testing/suites/$TEST_SUITE"

echo ${CMD}

``${CMD}``