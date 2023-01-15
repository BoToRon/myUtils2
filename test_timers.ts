
import { delay, removeItem, divine, getTraceableStack, getFormattedTimestamp, } from './btr'

type nonVoidFn = <F extends (...args: Parameters<F>) => ReturnType<F>> () => unknown

type timer = {
	id: string,
	runAt: number,
	startedAt: number,
	onComplete: nonVoidFn,
	onCancel: nonVoidFn,
	cancelledMessage: string,
	cancelledAt: number,
	isCancelled: boolean
}

const timers: timer[] = []

function initializeTimer(id: string, runAt: number, onComplete: nonVoidFn, onCancel: nonVoidFn) {
	const timer: timer = { id, runAt, onComplete, onCancel, startedAt: Date.now(), cancelledAt: 0, cancelledMessage: '', isCancelled: false }
	timers.push(timer)
	return interval()

	function interval() {
		return new Promise(resolve => {
			const maxInterval = 100
			const timeLeft = Math.max(runAt - Date.now(), 0)

			if (timeLeft > maxInterval) { setTimeout(() => tryToResolve(onComplete), timeLeft) }
			else { setTimeout(() => { tryToResolve(interval); removeItem(timers, timer) }, maxInterval) }

			function tryToResolve(fn: nonVoidFn) {
				const { id, startedAt, runAt, onComplete, onCancel, cancelledAt } = timer
				if (!timer.isCancelled) { resolve(fn()) }

				resolve({
					timerId: id,
					cancelledAt: getFormattedTimestamp({ timestamp: cancelledAt, fullYear: false, includeHour: true }), includeTimestamp_equals_true
					startedAt: getFormattedTimestamp({ timestamp: startedAt, fullYear: false, includeHour: true }),
					intendedRunAt: `${getFormattedTimestamp({ timestamp: runAt, fullYear: false, includeHour: true })} (${runAt})`,
					timeElapsedBeforeCancelation: `${(cancelledAt - startedAt) / 1000} seconds`,
					timeLeftBeforeCancelation: `${(runAt - timer.cancelledAt) / 1000} seconds`,
					onComplete: onComplete.name,
					onCancel: onCancel.name,
				})

			}
		})
	}
}

async function killTimer(timerId: string, reason: string) {
	const theTimer = timers.find(x => x.id === timerId)
	if (!theTimer) { divine.error('Unable to cancel, no timer was found with this id: ' + timerId); return }

	removeItem(timers, theTimer)
	theTimer.cancelledMessage = getTraceableStack(reason)
	theTimer.cancelledAt = Date.now()
	theTimer.isCancelled = true

	return theTimer.onCancel()
}

function cancel() { console.log('nooo x_X'); return { status: 'canceled' } }
function complete() { { console.log('done nwn'); return { status: 'completed' } } }


initializeTimer('myTimer', Date.now() + 1000, complete, cancel).then(result => {
	console.log(result)
})

delay(100).then(() => {
	killTimer('myTimer', 'hello').then(killResult => {
		console.log({ killResult })
	})
})