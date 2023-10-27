import {
  System,
  Storage,
  authority,
  Arrays,
  Protobuf,
  value,
  Crypto,
} from "@koinos/sdk-as";
import { common } from "./proto/common";

// make sure to not use this id in the contract childs
const OWNER_SPACE_ID = 20;

export class Ownable {
  callArgs: System.getArgumentsReturn | null;

  contractId: Uint8Array;
  owner: Storage.Obj<common.address>;
  previousOwner: Storage.Obj<common.address>;
  lockTime: Storage.Obj<common.uint64>;

  constructor(subContractId: u32 = 0) {
    this.contractId = System.getContractId();
    this.owner = new Storage.Obj(
      this.contractId,
        30 * subContractId + OWNER_SPACE_ID,
      common.address.decode,
      common.address.encode,
      null
    );

    this.previousOwner = new Storage.Obj(
      this.contractId,
        30 * subContractId + 21,
      common.address.decode,
      common.address.encode,
      () => new common.address(new Uint8Array(25))
    );

    this.lockTime = new Storage.Obj(
      this.contractId,
        30 * subContractId + 22,
      common.uint64.decode,
      common.uint64.encode,
      () => new common.uint64(0)
    );
  }

  // TODO: add this function to the SDK
  getSigners(): Array<Uint8Array> {
    const sigBytes =
      System.getTransactionField("signatures")!.message_value!.value!;
    const signatures = Protobuf.decode<value.list_type>(
      sigBytes,
      value.list_type.decode
    );
    const txId = System.getTransactionField("id")!.bytes_value!;

    const signers: Array<Uint8Array> = [];
    for (let i = 0; i < signatures.values.length; i++) {
      const publicKey = System.recoverPublicKey(
        signatures.values[i].bytes_value!,
        txId
      );
      const address = Crypto.addressFromPublicKey(publicKey!);
      signers.push(address);
    }
    return signers;
  }

  only_owner(): boolean {
    const owner = this.owner.get();
    if (!owner) {
      // any account can take the ownership at the beginning.
      // This means that the ownership must be set just
      // after the contract is uploaded
      return true;
    }

    /**
     * if the owner is the contract itself then check the
     * signatures (do not call System.checkAuthority to
     * avoid an infitine loop in case the contract has overriden
     * the authorize function)
     */
    if (Arrays.equal(owner.account, this.contractId)) {
      const signers = this.getSigners();
      for (let i = 0; i < signers.length; i += 1) {
        if (Arrays.equal(signers[i], this.contractId)) return true;
      }
      return false;
    }

    // call the authority of the owner
    return System.checkAuthority(
      authority.authorization_type.contract_call,
      owner.account!,
      this.callArgs!.args
    );
  }

  only_previous_owner(): boolean {
    const previousOwner = this.previousOwner.get()!;

    /**
     * if the previous owner is the contract itself then check the
     * signatures (do not call System.checkAuthority to
     * avoid an infitine loop in case the contract has overriden
     * the authorize function)
     */
    if (Arrays.equal(previousOwner.account, this.contractId)) {
      const signers = this.getSigners();
      for (let i = 0; i < signers.length; i += 1) {
        if (Arrays.equal(signers[i], this.contractId)) return true;
      }
      return false;
    }

    // call the authority of the owner
    return System.checkAuthority(
      authority.authorization_type.contract_call,
      previousOwner.account!,
      this.callArgs!.args
    );
  }

  /**
   * Set owner
   * @external
   * @event ownership_transferred common.address
   */
  transfer_ownership(newOwner: common.address): void {
    System.require(this.only_owner(), "not authorized by the owner");
    const previousOwner = this.previousOwner.get()!;
    this.owner.put(newOwner);
    System.event("ownership_transferred", this.callArgs!.args, [
      newOwner.account!,
      previousOwner.account!,
    ]);
  }

  /**
   * Get owner
   * @external
   * @readonly
   */
  get_owner(): common.address {
    const owner = this.owner.get();
    if (!owner) return new common.address();
    return owner;
  }

  /**
   * Get unlock time
   * @external
   * @readonly
   */
  get_unlock_time(): common.uint64 {
    return this.lockTime.get()!;
  }

  /**
   * Lock the ownership.
   * The time must be in milliseconds
   * @external
   * @event ownership_transferred common.address
   */
  ownership_lock(time: common.uint64): void {
    System.require(this.only_owner(), "not authorized by the owner");

    // set previous owner
    const owner = this.get_owner();
    const previousOwner = new common.address(owner.account);
    this.previousOwner.put(previousOwner);

    // set owner to zero address
    owner.account = new Uint8Array(25);
    this.owner.put(owner);

    // set lock time
    const lockTime = new common.uint64(
      System.getHeadInfo().head_block_time + time.value
    );
    this.lockTime.put(lockTime);

    System.event(
      "transfer_ownership",
      Protobuf.encode(owner, common.address.encode),
      [owner.account!, previousOwner.account!]
    );
  }

  /**
   * Unlock ownership
   * @external
   * @event ownership_transferred common.address
   */
  ownership_unlock(): void {
    System.require(
      this.only_previous_owner(),
      "you don't have permission to unlock"
    );
    const lockTime = this.lockTime.get()!;
    System.require(
      System.getHeadInfo().head_block_time > lockTime.value,
      "contract is locked"
    );

    const previousOwner = this.previousOwner.get()!;
    this.owner.put(previousOwner);
    this.previousOwner.put(new common.address(new Uint8Array(25)));

    System.event(
      "transfer_ownership",
      Protobuf.encode(previousOwner, common.address.encode),
      [previousOwner.account!, new Uint8Array(25)]
    );
  }
}
