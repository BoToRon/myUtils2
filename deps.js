const _ = 'prevent imports and comments from collapsing';
_;
import fs from 'fs';
_;
import Eris from 'eris';
_;
import http from 'http';
_;
import express from 'express';
_;
import getReadLine from 'readline';
_;
import mongodb, { MongoClient } from 'mongodb';
_;
import { z } from 'zod';
_;
import { fromZodError } from 'zod-validation-error';
const zValidVariants = z.enum(['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline-dark']);
const zValidNpmCommand = z.enum(['all', 'gitPush', 'transpile']);
const zValidVersionIncrement = z.enum(['major', 'minor', 'patch']);
const zValidCommitMessage = z.string().min(5);
export { 
//chalk and node-fetch are imported dynamically by the one auto-delete-for-the-client function that uses each, so that vite doesn't detect them
_, Eris, express, fromZodError, fs, getReadLine, http, mongodb, MongoClient, z, zValidCommitMessage, zValidNpmCommand, zValidVariants, zValidVersionIncrement };
