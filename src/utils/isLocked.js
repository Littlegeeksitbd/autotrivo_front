export  default function isLocked(attemptStore) {
    if (attemptStore.lockedUntil > Date.now()) return true;
    return false;
}