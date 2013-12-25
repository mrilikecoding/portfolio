#!/bin/bash
echo "Enter Gemset Name: "
read gemset

rvm use 2.0.0
rvm gemset create $gemset
rvm use ruby-2.0.0@$gemset --create --rvmrc

echo "RVM setup complete"

bundle install

echo "ready to rock!"

