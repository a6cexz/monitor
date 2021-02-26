rem echo off

set NODE_ENV=test

if not "%1"=="" (
  mocha --require should --reporter min --ui bdd %1
) else (
  mocha --require should --reporter min --ui bdd ./test
)