
import { delay, divine, doNothing, formatDate, getTraceableStack, nullAs, removeItem, timers } from '../src/index.js'
import { maybePromise, timer } from '../src/types.js'

/**Kill a timer created with initializeTimer, the reason provided will become a divine stack */
export async function killTimer(timerId: string, reason: string) {
	const theTimer = timers.find(x => x.id === timerId)
	if (!theTimer) { divine.error('Unable to cancel, no timer was found with this id: ' + timerId); return }

	removeItem(timers, theTimer)

	theTimer.value_onCancel = await theTimer.onCancel()
	theTimer.cancelStack = getTraceableStack(reason, 'killTimer')
	theTimer.cancelledAt = Date.now()
	theTimer.wasCancelled = true

	return theTimer
}

/**
 * Set a cancellable timer that runs at the specified time
 * @param id The id of the timer, so that btr.killTimer can find it
 * @param runAt The date (timestamp) at which "onComplete" should run
 * @param onComplete The function that should run if the timer wasn't cancelled 
 * @param onCancel The function that should run if the timer was cancelled via killTimer
 * @returns the return of "onComplete" if it was completed, or all info revelant to cancellation along with the value of "onCancel"
 */
export async function initializeTimer<
	completeF extends () => maybePromise<ReturnType<completeF>>,
	cancelF extends () => maybePromise<ReturnType<cancelF>>
>(
	id: string,
	runAt: number,
	onComplete: completeF,
	onCancel: cancelF
) {

	const timer: timer = {
		id, runAt, onComplete, onCancel,
		value_onComplete: nullAs(),
		value_onCancel: nullAs(),
		resolveInfo: nullAs(),
		startedAt: Date.now(),
		wasCancelled: false,
		cancelStack: '',
		cancelledAt: 0,
	}

	timers.push(timer)
	return await interval()

	async function getResolvedTimer<
		completeF extends () => maybePromise<ReturnType<completeF>>,
		cancelF extends () => maybePromise<ReturnType<cancelF>>
	>() {
		const { id, startedAt, runAt, onComplete, onCancel, cancelledAt, cancelStack, wasCancelled } = timer
		if (!timer.wasCancelled) { timer.value_onComplete = await timer.onComplete() }
		else { doNothing } /**timer.value_onCancel should have been set in killTimer */

		timer.resolveInfo = {
			timerId: id,
			startedAt: formatDate(startedAt, 'es', 'medium+hour'),
			intendedRunAt: formatDate(runAt, 'es', 'medium+hour'),
			cancelledAt: wasCancelled ? formatDate(cancelledAt, 'es', 'medium+hour') : null,
			timeElapsedBeforeCancelation: wasCancelled ? `${(cancelledAt - startedAt) / 1000} seconds` : null,
			timeLeftBeforeCancelation: wasCancelled ? `${(runAt - timer.cancelledAt) / 1000} seconds` : null,
			onCompleteFn: onComplete.name,
			onCancelFn: onCancel.name,
			cancelStack,
		}
		return timer
	}

	async function interval(): Promise<ReturnType<typeof getResolvedTimer>> {
		const maxInterval = 1000
		const timeLeft = Math.max(runAt - Date.now(), 0)
		const isTheLastInterval = maxInterval >= timeLeft

		await delay(isTheLastInterval ? timeLeft : maxInterval)
		if (isTheLastInterval) { removeItem(timers, timer) }

		return timer.wasCancelled ? nullAs() : isTheLastInterval ? getResolvedTimer() : interval()
	}
}

/**
 * Set an interval that is automatically killed when the stay-alive-checker fails but can also be manually killed with killTimer
 * @param id The id of the timer, so that btr.killTimer can find it
 * @param intervalInMs How often onEach will run
 * @param stayAliveChecker Predicate that automatically kills the interval on failure
 * @param onEach The function that runs with each cycle of the interval
 * @param onKill The function that killTimer will run when killing the interval
 * @param timesRanSucessfully The amount of times the interval ran before its dismise
 * @returns initializeTimer's resolveInfo with the return of onKill as the value (since onEach never resolves, just keeps going)
 */
export async function initializeInterval<
	eachF extends () => maybePromise<ReturnType<eachF>>,
	cancelF extends () => maybePromise<ReturnType<cancelF>>
>(
	id: string,
	intervalInMs: number,
	stayAliveChecker: () => maybePromise<boolean>,
	onEach: eachF,
	onKill: cancelF,
	timesRanSucessfully: number
) {
	type resolveInfo = Awaited<ReturnType<typeof initializeTimer<eachF, cancelF>>>
	const doContinue = await stayAliveChecker()
	return { timesRanSucessfully, ...await getResult() } as resolveInfo & { timesRanSucessfully: number, wasCancelled: true }

	async function getResult(): Promise<resolveInfo> {
		return await new Promise(resolve => {

			if (doContinue) {
				initializeTimer(id, Date.now() + intervalInMs, onEach, onKill).then(result => {
					if (result.wasCancelled) { return resolve(result) }
					initializeInterval(id, intervalInMs, stayAliveChecker, onEach, onKill, timesRanSucessfully + 1).then(result => resolve(result))
				})
			}
			else {
				initializeTimer(id, Date.now() + intervalInMs, onEach, onKill).then(result => resolve(result))
				killTimer(id, `stayAliveChecker (${stayAliveChecker.name}) = false`)
			}
		})
	}
}

let n = 0

async function doInitItInterval() {
	const intervalResult = await initializeInterval('myInterval', 100, predicate, onCompleteEach, onCancelKill, 0)
	console.log({ intervalResult })
}

//initializeTimer('myTimer', Date.now() + 100, onCompleteEach, onCancelKill).then(timerResult => console.log({ timerResult }))
//killTimer('myTimer', 'test').then(killResult => console.log({ killResult }))
doInitItInterval()

function predicate() {
	const predicate = n < 0
	console.log('predicate:', n, predicate)
	return predicate
}
function onCompleteEach() {
	n++
	console.log('onCompleteEach, n:', n)
	return 'This is the return value of onCompleteEach'
}
function onCancelKill() {
	console.log('onCancelKill, n:', n)
	return 'This is the return value of onCancelKills'
}