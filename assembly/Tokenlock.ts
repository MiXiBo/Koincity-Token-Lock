import { authority, SafeMath, System, Storage, Protobuf } from "@koinos/sdk-as";
import { IToken, token } from "@koinosbox/contracts"
import { Ownable } from "./Ownable";
import { common } from "./proto/common";
import { tokenlock } from "./proto/tokenlock";


export class Tokenlock extends Ownable {
  tokenLockItem: Storage.Obj<tokenlock.locks_item>;
  token_info: Storage.Obj<tokenlock.token_info>;

  constructor(subContractId: u32) {
    super(subContractId);
    this.tokenLockItem = new Storage.Obj(
        this.contractId,
        30 * subContractId + 10,
        tokenlock.locks_item.decode,
        tokenlock.locks_item.encode,
        null
    );
    this.token_info = new Storage.Obj(
        this.contractId,
        30 * subContractId + 11,
        tokenlock.token_info.decode,
        tokenlock.token_info.encode,
        null
    );

  }


  /**
   * Initialize Tokenlock
   * @external
   * @event tokenlock_init_event tokenlock.locks_entry
   */
  init(args: tokenlock.locks_entry): common.boole {
    System.requireAuthority(
        authority.authorization_type.contract_call,
        args.owner!
    );
    const blocktime = System.getHeadInfo().head_block_time;
    const tokenLockItem = this.tokenLockItem.get();
    System.require(!tokenLockItem, "Koincity: token lock already initialized");
    System.require(args.description!.length >= 3 && args.description!.length <= 50, "Koincity: description must be between 3 and 50 characters");
    System.require(new common.uint64(args.endDate).value > blocktime, "Koincity: Unlock date must be in the future.")
    const t = new IToken(args.token!);
    const balanceBeforeTransfer = t.balance_of(new token.balance_of_args(this.contractId)).value;
    t.transfer(
        new token.transfer_args(
            args.owner!,
            this.contractId,
            args.amount
        ))
    const balanceAfterTransfer = t.balance_of(new token.balance_of_args(this.contractId)).value;

    const amount = SafeMath.sub(balanceAfterTransfer, balanceBeforeTransfer);
    const tokenlockitem = new tokenlock.locks_item(args.token!, args.owner!, args.receiver!, blocktime, args.endDate, amount, args.description!, false);
    this.tokenLockItem.put(tokenlockitem);

    return new common.boole(true)
  }

  /**
   * Initialize Tokenlock
   * @external
   * @event tokenlock_unlock_event
   */
  unlockTokens(): common.boole{
    const blocktime = System.getHeadInfo().head_block_time;
    const tokenLockItem = this.tokenLockItem.get();
    System.require(tokenLockItem, "Koincity: token lock not initialized.");
    const receiver = tokenLockItem!.receiver!
    System.requireAuthority(
        authority.authorization_type.contract_call,
        receiver
    );
    System.require(blocktime > tokenLockItem!.endDate, "Koincity: token is locked.");
    System.require(!tokenLockItem!.claimed, "Koincity: token already unlocked.")
    tokenLockItem!.claimed = true;
    this.tokenLockItem.put(tokenLockItem!);
    const t = new IToken(tokenLockItem!.token!);
    t.transfer(
        new token.transfer_args(
            this.contractId,
            receiver,
            tokenLockItem!.amount
        )
    )
    return new common.boole(true);
  }

  /**
   *
   * @external
   * @readonly
   */
  getTokenlockParams(): tokenlock.lock_params {
    const tokenLockItem = this.tokenLockItem.get();
    System.require(tokenLockItem, "Koincity: token lock not initialized.");
    const blocktime = System.getHeadInfo().head_block_time;
    let locked:bool = true;
    if(blocktime > tokenLockItem!.endDate){
      locked = false;
    }
    const lock_params = new tokenlock.lock_params(tokenLockItem, locked, blocktime);

    return lock_params;
  }


  /**
   * set token information
   * @external
   */
  setToken(): void{
    const tokenLockItem = this.tokenLockItem.get();
    System.require(tokenLockItem, "Koincity: token lock not initialized");
    const t = new IToken(tokenLockItem!.token!);
    const token_info = new tokenlock.token_info(t.name().value, t.symbol().value, t.decimals().value)
    this.token_info.put(token_info);
  }

  /**
   *
   * @external
   * @readonly
   */
  getTokenInfo(): tokenlock.token_info {
    const token_info = this.token_info.get();
    System.require(token_info, "Koincity: token info not set");
    return token_info!;
  }

}
