import BN from "bn.js";

import { type LockupState, type FromStateVestingInformation } from "./types";

import { getStartLockupTimestamp, saturatingSub } from "./utils";

/**
 * @param releaseDuration release duration
 * @param lockupTimestamp lockup timestamp
 * @param brokenTimestamp is there broken timestamp
 * @param blockTimestamp timestamp of block
 * @param lockupAmount amount
 */
const getUnreleasedAmount = (
  releaseDuration: BN,
  lockupTimestamp: BN,
  brokenTimestamp: boolean,
  blockTimestamp: BN,
  lockupAmount: BN,
): BN => {
  if (releaseDuration) {
    const startTimestamp = getStartLockupTimestamp(
      releaseDuration,
      lockupTimestamp,
      brokenTimestamp,
    );
    const endTimestamp = startTimestamp.add(releaseDuration);

    if (endTimestamp.lt(blockTimestamp)) {
      return new BN(0);
    } else {
      const timeLeft = endTimestamp.sub(blockTimestamp);
      return lockupAmount.mul(timeLeft).div(releaseDuration);
    }
  } else {
    return new BN(0);
  }
};

const getUnvestedAmount = (
  vestingInformation: FromStateVestingInformation,
  blockTimestamp: BN,
  lockupAmount: BN,
) => {
  if (vestingInformation) {
    if (vestingInformation.unvestedAmount) {
      // was terminated
      return vestingInformation.unvestedAmount;
    } else if (vestingInformation.start) {
      // we have schedule
      if (
        vestingInformation.cliff &&
        blockTimestamp.lt(vestingInformation.cliff)
      ) {
        return lockupAmount;
      } else if (
        vestingInformation.end &&
        blockTimestamp.gte(vestingInformation.end)
      ) {
        return new BN(0);
      } else {
        if (!vestingInformation.end) {
          throw new Error("Vesting schedule is invalid");
        }
        const timeLeft = vestingInformation.end.sub(blockTimestamp);
        const totalTime = vestingInformation.end.sub(vestingInformation.start);
        return lockupAmount.mul(timeLeft).div(totalTime);
      }
    }
  }
  return new BN(0);
};

// https://github.com/near/core-contracts/blob/master/lockup/src/getters.rs#L64
/**
 * For reference @link https://github.com/near/core-contracts/blob/master/lockup/src/getters.rs#L64
 * @param lockupState {@link LockupState}
 * @returns BN
 */
export const getLockedTokenAmount = (lockupState: LockupState) => {
  const phase2Time = new BN("1602614338293769340");

  if (lockupState.blockTimestamp.lte(phase2Time)) {
    return saturatingSub(
      lockupState.lockupAmount,
      lockupState.terminationWithdrawnTokens,
    );
  }

  const lockupTimestamp = BN.max(
    phase2Time.add(lockupState.lockupDuration),
    lockupState.lockupTimestamp,
  );

  if (lockupState.blockTimestamp.lt(lockupTimestamp)) {
    return saturatingSub(
      lockupState.lockupAmount,
      lockupState.terminationWithdrawnTokens,
    );
  }

  const unreleasedAmount = getUnreleasedAmount(
    lockupState.releaseDuration,
    lockupState.lockupTimestamp,
    lockupState.hasBrokenTimestamp,
    lockupState.blockTimestamp,
    lockupState.lockupAmount,
  );

  const unvestedAmount = getUnvestedAmount(
    lockupState.vestingInformation,
    lockupState.blockTimestamp,
    lockupState.lockupAmount,
  );

  return BN.max(
    saturatingSub(unreleasedAmount, lockupState.terminationWithdrawnTokens),
    unvestedAmount,
  );
};
