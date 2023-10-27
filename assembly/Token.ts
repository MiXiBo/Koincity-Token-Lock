import {Arrays, System, authority, Storage, Protobuf} from "@koinos/sdk-as";
import { token } from "./proto/token";
import {System2} from "@koinosbox/contracts";

const SUPPLY_ID = 0;
const BALANCES_SPACE_ID = 1;
const INFO_SPACE_ID = 2;
const ALLOWANCES_SPACE_ID = 3;

export class Token {
  callArgs: System.getArgumentsReturn | null;

  contractId: Uint8Array;

  supply: Storage.Obj<token.uint64>;
  balances: Storage.Map<Uint8Array, token.uint64>;
  info: Storage.Obj<token.info>;

  allowances: Storage.Map<Uint8Array, token.uint64>;

  constructor() {
    this.contractId = System.getContractId();
    this.supply = new Storage.Obj(
        this.contractId,
        SUPPLY_ID,
        token.uint64.decode,
        token.uint64.encode,
        () => new token.uint64(0)
    );
    this.balances = new Storage.Map(
        this.contractId,
        BALANCES_SPACE_ID,
        token.uint64.decode,
        token.uint64.encode,
        () => new token.uint64(0)
    );
    this.info = new Storage.Obj(
        this.contractId,
        INFO_SPACE_ID,
        token.info.decode,
        token.info.encode,
        () => new token.info()
    );
    this.allowances = new Storage.Map(
        this.contractId,
        ALLOWANCES_SPACE_ID,
        token.uint64.decode,
        token.uint64.encode,
        () => new token.uint64(0)
    );
  }

  /**
   * @external
   */
  set_info(args: token.info_params): void {
    const info = this.info.get()!;
    System.require(!info.symbol, "the info is already defined");
    System.require(args.name, "name is not defined");
    System.require(args.symbol, "symbol is not defined");
    const info_args = new token.info(args.name!, args.symbol, 8);
    this.info.put(info_args);
    System.event("koinos.contracts.token.info_event", this.callArgs!.args, []);
  }

  /**
   * Get name, symbol and decimals
   * @external
   * @readonly
   */
  get_info(): token.info {
    return this.info.get()!;
  }
  /**
   * Get name of the token
   * @external
   * @readonly
   */
  name(): token.str {
    const info = this.info.get()!;
    return new token.str(info.name);
  }

  /**
   * Get the symbol of the token
   * @external
   * @readonly
   */
  symbol(): token.str {
    const info = this.info.get()!;
    return new token.str(info.symbol);
  }

  /**
   * Get the decimals of the token
   * @external
   * @readonly
   */
  decimals(): token.uint32 {
    const info = this.info.get()!;
    return new token.uint32(info.decimals);
  }

  /**
   * Get total supply
   * @external
   * @readonly
   */
  total_supply(): token.uint64 {
    return this.supply.get()!;
  }

  /**
   * Get balance of an account
   * @external
   * @readonly
   */
  balance_of(args: token.balance_of_args): token.uint64 {
    return this.balances.get(args.owner!)!;
  }

  /**
   * Get allowance
   * @external
   * @readonly
   */
  allowance(args: token.allowance_args): token.uint64 {
    const key = new Uint8Array(50);
    key.set(args.owner!, 0);
    key.set(args.spender!, 25);
    return this.allowances.get(key)!;
  }

  /**
   * Get allowances of an account
   * @external
   * @readonly
   */
  get_allowances(args: token.get_allowances_args): token.get_allowances_return {
    let key = new Uint8Array(50);
    key.set(args.owner!, 0);
    key.set(args.start ? args.start! : new Uint8Array(0), 25);
    const result = new token.get_allowances_return(args.owner!, []);
    for (let i = 0; i < args.limit; i += 1) {
      const nextAllowance =
          args.direction == token.direction.ascending
              ? this.allowances.getNext(key)
              : this.allowances.getPrev(key);
      if (
          !nextAllowance ||
          !Arrays.equal(args.owner!, nextAllowance.key!.slice(0, 25))
      )
        break;
      const spender = nextAllowance.key!.slice(25);
      result.allowances.push(
          new token.spender_value(spender, nextAllowance.value.value)
      );
      key = nextAllowance.key!;
    }
    return result;
  }

  /**
   * Internal function to check if the account triggered
   * the operation, or if another account is authorized
   */
  check_authority(account: Uint8Array, amount: u64): boolean {
    // check if the operation is authorized directly by the user
    if (System2.check_authority(account)) return true;

    // check if the user authorized the caller
    const caller = System.getCaller();
    if (!caller.caller || caller.caller!.length == 0) return false;
    const key = new Uint8Array(50);
    key.set(account, 0);
    key.set(caller.caller!, 25);
    const allowance = this.allowances.get(key)!;
    if (allowance.value >= amount) {
      // spend allowance
      allowance.value -= amount;
      this.allowances.put(key, allowance);
      return true;
    }

    return false;
  }

  _approve(args: token.approve_args): void {
    const key = new Uint8Array(50);
    key.set(args.owner!, 0);
    key.set(args.spender!, 25);
    this.allowances.put(key, new token.uint64(args.value));

    const impacted = [args.spender!, args.owner!];
    System.event(
        "token.approve_event",
        Protobuf.encode<token.approve_args>(args, token.approve_args.encode),
        impacted
    );
  }

  _transfer(args: token.transfer_args): void {
    let fromBalance = this.balances.get(args.from!)!;
    System.require(
        fromBalance.value >= args.value,
        "account 'from' has insufficient balance"
    );
    fromBalance.value -= args.value;
    this.balances.put(args.from!, fromBalance);

    let toBalance = this.balances.get(args.to!)!;
    toBalance.value += args.value;
    this.balances.put(args.to!, toBalance);

    const impacted = [args.to!, args.from!];
    System.event(
        "token.transfer_event",
        Protobuf.encode<token.transfer_args>(args, token.transfer_args.encode),
        impacted
    );
  }

  _mint(args: token.mint_args): void {
    const supply = this.supply.get()!;
    System.require(
        supply.value <= u64.MAX_VALUE - args.value,
        "mint would overflow supply"
    );
    System.require(supply.value == u64.MIN_VALUE, "the token supply is already minted");

    let toBalance = this.balances.get(args.to!)!;
    toBalance.value += args.value;
    this.balances.put(args.to!, toBalance);
    supply.value += args.value;
    this.supply.put(supply);

    const impacted = [args.to!];
    System.event(
        "token.mint_event",
        Protobuf.encode<token.mint_args>(args, token.mint_args.encode),
        impacted
    );
  }

  _burn(args: token.burn_args): void {
    let fromBalance = this.balances.get(args.from!)!;
    System.require(
        fromBalance.value >= args.value,
        "account 'from' has insufficient balance"
    );

    const supply = this.supply.get()!;
    fromBalance.value -= args.value;
    this.balances.put(args.from!, fromBalance);
    supply.value -= args.value;
    this.supply.put(supply);

    const impacted = [args.from!];
    System.event(
        "token.burn_event",
        Protobuf.encode<token.burn_args>(args, token.burn_args.encode),
        impacted
    );
  }

  /**
   * Grant permissions to other account to manage the tokens owned
   * by the user. The user must approve only the accounts he trust.
   * @external
   */
  approve(args: token.approve_args): void {
    const isAuthorized = System2.check_authority(args.owner!);
    System.require(isAuthorized, "approve operation not authorized");
    this._approve(args);
  }

  /**
   * Transfer tokens
   * @external
   */
  transfer(args: token.transfer_args): void {
    const isAuthorized = this.check_authority(args.from!, args.value);
    System.require(isAuthorized, "from has not authorized transfer");
    this._transfer(args);
  }

  /**
   * Mint new tokens
   * @external
   */
  mint(args: token.mint_args): void {
    this._mint(args);
  }


}
