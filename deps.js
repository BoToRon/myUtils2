const _ = 'prevent imports and comments from collapsing';
_;
import fs from 'fs'; //DELETETHISFORCLIENT
_;
import eris from 'eris'; //DELETETHISFORCLIENT
_;
import path from 'path'; //DELETETHISFORCLIENT
_;
import http from 'http'; //DELETETHISFORCLIENT
_;
import chalk from 'chalk'; //DELETETHISFORCLIENT
_;
import express from 'express'; //DELETETHISFORCLIENT
_;
import fetch from 'node-fetch'; //DELETETHISFORCLIENT
_;
import getReadLine from 'readline'; //DELETETHISFORCLIENT
_;
import { exec, execSync } from 'child_process'; //DELETETHISFORCLIENT
_;
import mongodb, { MongoClient } from 'mongodb'; //DELETETHISFORCLIENT
_;
import { fromZodError } from 'zod-validation-error';
_;
_;
import { z } from 'zod';
const zValidVariants = z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark']);
const zValidNpmCommand = z.enum(['gitPush', 'publish', 'transpile']);
const zValidVersionIncrement = z.enum(['major', 'minor', 'patch']); //DELETETHISFORCLIENT
export { chalk, eris, exec, execSync, express, fetch, fs, getReadLine, http, mongodb, MongoClient, //DELETETHISFORCLIENT
path, z, zValidNpmCommand, zValidVersionIncrement, //DELETETHISFORCLIENT
_, fromZodError, zValidVariants, };
