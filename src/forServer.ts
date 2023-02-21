let _
import { z } from 'zod'
_
import fs from 'fs'	//DELETETHISFORCLIENT 
_
import eris from 'eris'	//DELETETHISFORCLIENT
_
import http from 'http'	//DELETETHISFORCLIENT
_
import path from 'path'	//DELETETHISFORCLIENT
_
import chalk from 'chalk'	//DELETETHISFORCLIENT
_
import express from 'express'	//DELETETHISFORCLIENT
_
import fetch from 'node-fetch'	//DELETETHISFORCLIENT
_
import clipboard from 'clipboardy'	//DELETETHISFORCLIENT
_
import { Socket } from 'socket.io'	//DELETETHISFORCLIENT
_
import getReadLine from 'readline'	//DELETETHISFORCLIENT
_
import { exec } from 'child_process'	//DELETETHISFORCLIENT
_
import { createRequire } from 'module'	//DELETETHISFORCLIENT
_
import mongodb, { MongoClient } from 'mongodb'	//DELETETHISFORCLIENT
_
import { cachedFile, myEnv, zSchema } from './types.js'
_
import { warningsCount_generator } from './constants.js'
_
import {
	colorLog, command_package, command_project, delay, errorLog, formatDate, getTraceableStack,
	logEmptyLine, mapObject, nullAs, selfFilter, stringify, successLog, surroundedString, zodCheck_curry
} from './index.js'
_

//TODO: describe me
export const divine = {
	bot: <eris.Client>nullAs(),
	error: (err: string | Error) => {
		const message = getTraceableStack(err, 'divineError')
		const { DEV_OR_PROD } = getEnviromentVariables()
		DEV_OR_PROD !== 'PROD' ? killProcess(message) : divine.ping(message)
	},
	init: (() => {
		delay(1000).then(async () => {
			if (command_package || command_project) { return }

			const { APP_NAME, DEV_OR_PROD, ERIS_TOKEN } = getEnviromentVariables()
			if (DEV_OR_PROD !== 'PROD') { return }

			const divinePrepend = '***DivineBot:***'
			const bot = eris(ERIS_TOKEN)

			bot.on('messageReactionRemove', (a: eris.PossiblyUncachedMessage, b: eris.PartialEmoji, c: eris.Member) => role('remove', a, b, c))
			bot.on('messageReactionAdd', (a: eris.PossiblyUncachedMessage, b: eris.PartialEmoji, c: eris.Member) => role('add', a, b, c))
			bot.on('disconnect', () => { colorLog('red', `${divinePrepend}: Disconnected D: ... retrying!`) })
			bot.on('connect', () => divine.ping(`(${APP_NAME}) - I'm alive bitch >:D`))

			const idOfRoleAssigningMessage = '822523162724925473'
			await attemptConnection()
			divine.bot = bot

			function role(action: 'add' | 'remove', message: eris.PossiblyUncachedMessage, emoji: eris.PartialEmoji, reactor: eris.Member) {
				try {
					if (message.id !== idOfRoleAssigningMessage) { return }

					const role = [
						{ app: 'UntCG', emoji: 'cards', id: 'SAMPLEROLEID' },
						{ app: 'CwCA', emoji: 'chess', id: 'SAMPLEROLEID' },
						{ app: 'Cool', emoji: 'cool', id: 'SAMPLEROLEID' },
						{ app: 'Divine', emoji: 'divine', id: 'SAMPLEROLEID' },
						{ app: 'Bluejay', emoji: 'bluejay', id: 'SAMPLEROLEID' },
						{ app: 'Cute', emoji: 'cute', id: 'SAMPLEROLEID' },
					].find(x => x.emoji === emoji.name)

					if (role) { ({ add: reactor.addRole, remove: reactor.removeRole })[action](role.id) }
				}
				catch (e) { errorLog('divineBot.role.tryCatch.error: \n' + e) }
			}

			async function attemptConnection() {
				try {
					bot.connect()
					colorLog('cyan', 'waiting for DivineBot')
					while (!bot.uptime) { await delay(1000) }
					successLog('The divine egg has hatched')
				}
				catch {
					colorLog('yellow', `${divinePrepend} Failed to connect.. retrying >:D`)
					await delay(1000)
					attemptConnection()
				}
			}
		})
	})(),
	ping: async (message: string) => {
		while (!divine.bot?.ready) { await delay(1000) }
		const { APP_NAME } = getEnviromentVariables()

		const theMessage = `<@470322452040515584> - (${APP_NAME}) \n ${message}`
		const divineOptions = { content: theMessage, allowedMentions: { everyone: true, roles: true } }
		divine.bot.createMessage('1055939528776495206', divineOptions)
	},
}

/**FOR NODE-DEBUGGING ONLY. Log a big red message surrounded by a lot of asterisks for visibility */
export function bigConsoleError(message: string) {
	function logAsterisks(lines: number) { for (let i = 0; i < lines; i++) { log('*'.repeat(150)) } }
	function log(message: string) { return colorLog('red', message) }

	logAsterisks(3)
	log(message)
	logAsterisks(3)
}
/**Basically custom ESlint warnings */
export function checkCodeThatCouldBeUpdated(cachedFiles: cachedFile[]) {
	cachedFiles.forEach(file => {
		const { path, content } = file
		checkReplaceableCode(['triggerModalWithValidation, bvModal.show', 'bvModal.hide'], '.triggerModal(modalId, show | hide)')	//@btr-ignore
		checkReplaceableCode(['console.log()', 'console.log(\'\')'], 'logEmptyLine')	//@btr-ignore
		checkReplaceableCode(['Readonly<', 'ReadonlyArray<'], 'readonly ')	//@btr-ignore
		checkReplaceableCode(['//@ts-ignore'], '//@ts-expect-error')	//@btr-ignore
		checkReplaceableCode(['console.log'], 'colorLog OR debugLog')	//@btr-ignore
		checkReplaceableCode(['Object.entries'], 'objectEntries')	//@btr-ignore
		checkReplaceableCode(['| null', 'null |'], 'nullable')	//@btr-ignore
		checkReplaceableCode(['autologin'], 'useStore().login')	//@btr-ignore
		checkReplaceableCode(['Object.values'], 'objectValues')	//@btr-ignore
		checkReplaceableCode(['Object.keys'], 'objectKeys')	//@btr-ignore
		checkReplaceableCode(['null as'], 'nullAs')	//@btr-ignore

		function checkReplaceableCode(replaceableCodeStrings: string[], suggestedReplacement: string) {
			replaceableCodeStrings.forEach(replaceableString => {
				const withEscapedCharacters = replaceableString.replace(/(?=\W{1,1})/g, '\\') //regexHere
				const theRegex = new RegExp(withEscapedCharacters + '.{0,}', 'gi')
				const matches = Array(...content.match(theRegex) || [])

				selfFilter(matches, match => !/@btr-ignore/.test(match)) //regexHere
				if (!matches.length) { return }

				colorLog('yellow', surroundedString(`${warningsCount_generator.next().value}. WARNING: OUTDATED/REPLACEABLE CODE`, '-', 50))
				console.log({ matches, replaceableCode: replaceableString, suggestedReplacement, path }) //@btr-ignore
			})
		}
	})
}
/**Copy to clipboard while running node */
export function copyToClipboard_server(x: unknown) { return clipboard.write(stringify(x as object)) }
/**FOR NODE-DEBUGGING ONLY. Stringifies and downloads the provided data*/
export async function downloadFile_node(filename: string, fileFormat: '.txt' | '.json', data: unknown, killProcessAfterwards: boolean) {
	const formatted = stringify(data as object)
	const dateForFilename = formatDate(Date.now(), 'English', 'short').replace(/\/| |:/g, '_') //regexHere
	const completeFilename = filename + '_' + dateForFilename + fileFormat

	colorLog('cyan', `Downloading ${completeFilename}..`)
	await fsWriteFileAsync(completeFilename, formatted)
	successLog('Done!')

	if (!killProcessAfterwards) { return }
	if (process.env['quokka']) { return }
	process.exit()
}
/**Wrapper for fs.promise.readFile that announces the start of the file-reading */
export async function fsReadFileAsync(filePath: string) {
	colorLog('white', `reading '${filePath}'..`)
	return await fs.promises.readFile(filePath, 'utf8')
}
/**Wrapper for fsWriteFileAsync that announces the start of the file-writing */
export async function fsWriteFileAsync(filePath: string, content: string) {
	colorLog('white', `writing to '${filePath}'..`)
	return await fs.promises.writeFile(filePath, content)
}
/**Batch-load files for checking purposes */
export async function getCachedFiles(errors: string[], filepaths: string[]) {

	const cachedFiles: cachedFile[] = []

	for await (const filepath of filepaths) {
		if (!fileExists(filepath)) { addToErrors(`File not found at '${filepath}'`); continue }
		if (cachedFiles.some(x => x.path === filepath)) { addToErrors(`File readed more than once by fsReadFileAsync: >>> (${filepath}) << <`) }
		cachedFiles.push({ path: filepath, content: await fsReadFileAsync(filepath) })
	}

	return cachedFiles

	function addToErrors(error: string) { errors.push(error) }

	async function fileExists(path: string) {
		try { await fs.promises.access(path); return true }
		catch { addToErrors('Missing file, couldn\'t read: ' + path); return false }
	}
}
/**For a project's debugging purposes */
export function getDebugOptionsAndLog<K extends string>(devOrProd: 'dev' | 'prod', options: Record<K, [boolean, boolean]>) {
	function forDevForProd(forDev: boolean, forProd: boolean) { return { dev: forDev, prod: forProd }[devOrProd] }
	return {
		debugOptions: mapObject(options, (x) => forDevForProd(x[0], x[1])),
		debugLog: <T extends object>(debugKey: K, error: T) => {
			if (!options[debugKey]) { return }
			colorLog('yellow', debugKey)
			colorLog('cyan', stringify(error))
			colorLog('magenta', getTraceableStack('', 'debugLog'))
			logEmptyLine()
		}
	}
}
/** Get the contents of the project's .env */
export function getEnviromentVariables() {
	const require = createRequire(import.meta.url)
	require('dotenv').config({ path: './.env' })
	return process.env as myEnv
}
/**(Use with Quokka) Create an untoggable comment to separate sections, relies on "_" as a variable */
export function getSeparatingCommentBlock(message: string) {
	let line = ''
	const asterisks = '*'.repeat(10)
	while (line.length < 100) { line += `${asterisks} ${message.toUpperCase()} ${asterisks}` }
	const theBlock = `_ /${line}/\n`.repeat(5)
	console.log(theBlock) //@btr-ignore
	return theBlock
}
/**fetch the latest package.json of my-utils */
export async function getLatestPackageJsonFromGithub() {
	type response_github_file = { content: string }

	const response: response_github_file = await new Promise((resolve) => {
		fetch('https://api.github.com/repos/botoron/utils/contents/package.json', { method: 'GET' }
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		).then((res: any) => res.json().then((packageJson: any) => resolve(packageJson)))
	})

	return Buffer.from(response.content, 'base64').toString('utf8')
}
/**It's monging time >:D */
export async function getMongoClient() {
	const { MONGO_URI } = getEnviromentVariables()

	const mongo = new mongodb.MongoClient(MONGO_URI)
	let mongoClient = <MongoClient>nullAs()
	mongo.connect((err, client) => { if (err) { throw err } mongoClient = client as MongoClient })
	colorLog('cyan', 'waiting for Mongo')
	while (!mongoClient) { await delay(1000) }
	successLog('It\'s Monging time >:D')
	return mongoClient
}
/**Start and return an http Express server */
export function getStartedHttpServer() {
	const { PORT } = getEnviromentVariables()

	const app = express()
	const httpServer = http.createServer(app)
	app.use(express.static(path.resolve() + '/public'))
	app.get('/', (_request, response) => response.sendFile(path.resolve() + '/public/index.html'))
	httpServer.listen(PORT, () => delay(1500).then(() => colorLog('white', 'Server up and running~')))
	return httpServer
}
/**Import modules or jsons */
export async function importFileFromProject<T>(filename: string, extension: 'cjs' | 'js' | 'json') {
	try {
		const path = `../../../${filename}.${extension}`
		const options = extension === 'json' ? { assert: { type: 'json' } } : {}
		const mainPackageJson = (await import(path, options)).default
		return mainPackageJson as T

	} catch (e) { return e }
}
/**FOR NODE DEBBUGING ONLY. Kill the process with a big ass error message :D */
export function killProcess(message: string) { bigConsoleError(message); process.exit() }
/**Prompt to submit a git commit message and then push */
export async function prompCommitMessageAndPush(repoName: string): Promise<boolean> {

	//order matters with these 3
	const commitTypes = '(fix|feat|build|chore|ci|docs|refactor|style|test)'

	logDetailsForPrompt()
	const commitMessage = await questionAsPromise(`Enter commit type ${commitTypes} plus a message:`)
	copyToClipboard_server(commitMessage)

	if (!zodCheck_curry(tryAgain, true)(get_zValidCommitMessage(), commitMessage)) { return prompCommitMessageAndPush(repoName) }
	return await gitAddCommitPush()

	function get_zValidCommitMessage() {
		const commitRegex = new RegExp(`(?<!.)${commitTypes}:`)
		return z.string().min(15).max(50).regex(commitRegex, `String must start with ${commitTypes}:`)
	}

	function gitAddCommitPush(): Promise<boolean> {
		return new Promise(resolve => {
			exec('git add .', () => {
				successLog('git add .')
				colorLog('cyan', 'Commit message copied to clipboard, paste it in the editor, save and close.')
				exec('git commit', () => {
					successLog('git commit')
					exec('git push', () => {
						successLog('git push')
						resolve(true)
					})
				})
			})
		})
	}

	function logDetailsForPrompt() {
		delay(500).then(() => {
			colorLog('yellow', '50-character limits ends at that line: * * * * * |')
			colorLog('green', repoName)
			logEmptyLine()
		})
	}

	function tryAgain(error: string) {
		colorLog('yellow', error)
		prompCommitMessageAndPush(repoName)
	}
}
/**Prompts a question in the terminal, awaits for the input and returns it */
export async function questionAsPromise(question: string) {
	const readline = getReadLine.createInterface({ input: process.stdin, output: process.stdout })
	const input = await new Promise(res => { readline.question(chalk.magenta(question) + '\n', res) }) as string
	readline.close()
	return input
}
/**Check the user input in socket.on functions and send error toasts if the validation fails */
export function zodCheck_socket<T>(socket: Socket, schema: zSchema<T>, data: T) {
	return zodCheck_curry(errorHandler, true)(schema, data)

	function caller() {
		return (
			(getTraceableStack('', 'zodCheck_socket').split('\n') || [])[3]?.match(/at \w{1,}/) || //regexHere
			['at <unable to identify function caller>']
		)[0]
	}

	function errorHandler(error: string) {
		socket.emit('toast', '💀', `${error} - - - (${caller()}, ${{ ...schema._def }})`, 'danger')
	}
}