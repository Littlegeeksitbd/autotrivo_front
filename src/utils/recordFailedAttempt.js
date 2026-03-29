export default function recordFailedAttempt(attemptStore,ATTEMPT_LIMIT,LOCK_SECONDS) {
    attemptStore.count++;
    if (attemptStore.count >= ATTEMPT_LIMIT) {
        attemptStore.lockedUntil = Date.now() + LOCK_SECONDS * 1000;
        attemptStore.count = 0;
    }
}


/*
const ATTEMPT_LIMIT = 5;
const LOCK_SECONDS  = 60;
const attemptStore  = { count: 0, lockedUntil: 0 };

 */