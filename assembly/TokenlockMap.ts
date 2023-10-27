import { SafeMath, Storage, System } from "@koinos/sdk-as";
import { OwnableMap } from "./OwnableMap";
import { common } from "./proto/common";
import { tokenlockmap } from "./proto/tokenlockmap";
import { tokenlock } from "./proto/tokenlock";
import {Tokenlock} from "./Tokenlock"

export class TokenlockMap extends OwnableMap {
  contractId: Uint8Array;
  totalTokenlocks: Storage.Obj<common.uint32>;
  addressTokenLocks: Storage.Map<Uint8Array, tokenlock.list_myLocks>;

  constructor() {
    super();
    this.contractId = System.getContractId();
    this.totalTokenlocks = new Storage.Obj(
        this.contractId,
        0,
        common.uint32.decode,
        common.uint32.encode,
        () => new common.uint32(0)
    );
    this.addressTokenLocks = new Storage.Map(
        this.contractId,
        1,
        tokenlock.list_myLocks.decode,
        tokenlock.list_myLocks.encode,
        () => new tokenlock.list_myLocks([])
    );
  }


  /**
   * Create a new token lock
   * @external
   */
  addTokenLock(args: tokenlock.locks_entry): void{
    const totalTokenlocks = this.totalTokenlocks.get()!;
    totalTokenlocks.value = SafeMath.add(totalTokenlocks.value, 1);
    this.totalTokenlocks.put(totalTokenlocks);
    const tokenlock = new Tokenlock(totalTokenlocks.value);
    const result = tokenlock.init(args);
    tokenlock.setToken();
    const addressTokenLocksReceiver = this.addressTokenLocks.get(args.receiver!)!;
    addressTokenLocksReceiver.items.push(totalTokenlocks.value);
    this.addressTokenLocks.put(args.receiver!, addressTokenLocksReceiver);
    const addressTokenLocksToken = this.addressTokenLocks.get(args.token!)!;
    addressTokenLocksToken.items.push(totalTokenlocks.value);
    this.addressTokenLocks.put(args.token!, addressTokenLocksToken)
    System.require(result.value == true, "Koincity: lock token failed.");
  }

  /**
   * Unlock an existing token lock
   * @external
   */
  unlockTokenLock(args: tokenlock.uint32): void{
    const tokenlock = new Tokenlock(args.value);
    const result = tokenlock.unlockTokens();
    System.require(result.value == true, "Koincity: unlock tokens failed.");
  }


  /**
   * Get count of my token locks
   * @external
   * @readonly
   */
  getMyTokenLocksCount(args: tokenlock.address): tokenlock.uint32 {
    const addressTokenLocks = this.addressTokenLocks.get(args.value!)
    if(addressTokenLocks == null){
      return new tokenlock.uint32(0);
    }
    return new tokenlock.uint32(addressTokenLocks.items.length);
  }

  /**
   * Get token locks with parameters
   * @external
   * @readonly
   */
  getMyTokenLocks(args: tokenlockmap.list_address_args): tokenlock.list_locks {
    const isAscending = args.direction == tokenlockmap.direction.ascending;
    const result = new tokenlock.list_locks([]);
    const addressTokenLocks = this.addressTokenLocks.get(args.address!)
    if(addressTokenLocks != null) {
      const totalTokenLocks = new common.uint32(addressTokenLocks.items.length).value;
      let i = args.start;
      let total: i32 = 0;
      while (
          total < args.limit &&
          i >= 1 &&
          ((isAscending && i <= totalTokenLocks) || !isAscending)
          ) {

        const k = addressTokenLocks.items.at(i-1)
        const tokenlock = new Tokenlock(k);
        const tokenlockParams = tokenlock.getTokenlockParams();
        const token_info = tokenlock.getTokenInfo();

        result.value.push(new tokenlock.lock_params_result(k, tokenlockParams, token_info));

        if (isAscending) i += 1;
        else i -= 1;
        total += 1;
      }
    }
    return result;
  }

  /**
   * Get token locks with parameters
   * @external
   * @readonly
   */
  getTokenLocks(args: tokenlockmap.list_args): tokenlock.list_locks {
    const isAscending = args.direction == tokenlockmap.direction.ascending;
    const result = new tokenlock.list_locks([]);
    const totalTokenlocks = this.totalTokenlocks.get()!;
    let i = args.start;
    let total: i32 = 0;
    while (
        total < args.limit &&
        i >= 1 &&
        ((isAscending && i <= totalTokenlocks.value) || !isAscending)
        ) {
      const tokenlock = new Tokenlock(i);
      const tokenlockParams = tokenlock.getTokenlockParams();
      const token_info = tokenlock.getTokenInfo();

      result.value.push(new tokenlock.lock_params_result(i, tokenlockParams, token_info));
      if (isAscending) i += 1;
      else i -= 1;
      total += 1;
    }
    return result;
  }

  /**
   * Get total token locks count
   * @external
   * @readonly
   */
  getTotalTokenLocks(): common.uint32 {
    return this.totalTokenlocks.get()!;
  }
}
