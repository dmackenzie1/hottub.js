const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const express = require('express');
const pythonCommand = "python";
const fs = require('fs');
const https = require('https');

eval(fs.readFileSync('api/hottub.js')+'');
eval(fs.readFileSync('api/hottub.api.js')+'');
eval(fs.readFileSync('api/hottub.interface.js')+'');
eval(fs.readFileSync('api/hottub.interface.mock.js')+'');
eval(fs.readFileSync('api/hottub.interface.raspberrypi.js')+'');


console.log("Starting "  + Date.now());
hottub.initialize();

