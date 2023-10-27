import { System } from "@koinos/sdk-as";
import { Ownable } from "./Ownable";
import { common } from "./proto/common";
import { ownablemap } from "./proto/ownablemap";

export class OwnableMap {
  callArgs: System.getArgumentsReturn | null;

  /**
   * Set owner
   * @external
   * @event ownership_transferred common.address
   */
  transfer_ownership(args: ownablemap.args): void {
    const ownable = new Ownable(args.subcontract_id);
    ownable.callArgs = this.callArgs;
    ownable.transfer_ownership(args.address!);
  }

  /**
   * Get owner
   * @external
   * @readonly
   */
  get_owner(args: ownablemap.args): common.address {
    const ownable = new Ownable(args.subcontract_id);
    ownable.callArgs = this.callArgs;
    return ownable.get_owner();
  }

  /**
   * Get unlock time
   * @external
   * @readonly
   */
  get_unlock_time(args: ownablemap.args): common.uint64 {
    const ownable = new Ownable(args.subcontract_id);
    ownable.callArgs = this.callArgs;
    return ownable.get_unlock_time();
  }

  /**
   * Lock the ownership.
   * The time must be in milliseconds
   * @external
   * @event ownership_transferred common.address
   */
  ownership_lock(args: ownablemap.args): void {
    const ownable = new Ownable(args.subcontract_id);
    ownable.callArgs = this.callArgs;
    return ownable.ownership_lock(args.uint64!);
  }

  /**
   * Unlock ownership
   * @external
   * @event ownership_transferred common.address
   */
  ownership_unlock(args: ownablemap.args): void {
    const ownable = new Ownable(args.subcontract_id);
    ownable.callArgs = this.callArgs;
    return ownable.ownership_unlock();
  }
}
