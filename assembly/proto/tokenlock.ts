import { Writer, Reader } from "as-proto";

export namespace tokenlock {
  export class str {
    static encode(message: str, writer: Writer): void {
      const unique_name_value = message.value;
      if (unique_name_value !== null) {
        writer.uint32(10);
        writer.string(unique_name_value);
      }
    }

    static decode(reader: Reader, length: i32): str {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new str();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: string | null;

    constructor(value: string | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class uint32 {
    static encode(message: uint32, writer: Writer): void {
      if (message.value != 0) {
        writer.uint32(8);
        writer.uint32(message.value);
      }
    }

    static decode(reader: Reader, length: i32): uint32 {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new uint32();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u32;

    constructor(value: u32 = 0) {
      this.value = value;
    }
  }

  @unmanaged
  export class uint64 {
    static encode(message: uint64, writer: Writer): void {
      if (message.value != 0) {
        writer.uint32(8);
        writer.uint64(message.value);
      }
    }

    static decode(reader: Reader, length: i32): uint64 {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new uint64();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: u64;

    constructor(value: u64 = 0) {
      this.value = value;
    }
  }

  export class address {
    static encode(message: address, writer: Writer): void {
      const unique_name_value = message.value;
      if (unique_name_value !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_value);
      }
    }

    static decode(reader: Reader, length: i32): address {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new address();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Uint8Array | null;

    constructor(value: Uint8Array | null = null) {
      this.value = value;
    }
  }

  @unmanaged
  export class boole {
    static encode(message: boole, writer: Writer): void {
      if (message.value != false) {
        writer.uint32(8);
        writer.bool(message.value);
      }
    }

    static decode(reader: Reader, length: i32): boole {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new boole();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: bool;

    constructor(value: bool = false) {
      this.value = value;
    }
  }

  @unmanaged
  export class empty_object {
    static encode(message: empty_object, writer: Writer): void {}

    static decode(reader: Reader, length: i32): empty_object {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new empty_object();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() {}
  }

  export class locks_entry {
    static encode(message: locks_entry, writer: Writer): void {
      const unique_name_token = message.token;
      if (unique_name_token !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_token);
      }

      const unique_name_owner = message.owner;
      if (unique_name_owner !== null) {
        writer.uint32(18);
        writer.bytes(unique_name_owner);
      }

      const unique_name_receiver = message.receiver;
      if (unique_name_receiver !== null) {
        writer.uint32(26);
        writer.bytes(unique_name_receiver);
      }

      if (message.endDate != 0) {
        writer.uint32(32);
        writer.uint64(message.endDate);
      }

      if (message.amount != 0) {
        writer.uint32(40);
        writer.uint64(message.amount);
      }

      const unique_name_description = message.description;
      if (unique_name_description !== null) {
        writer.uint32(50);
        writer.string(unique_name_description);
      }
    }

    static decode(reader: Reader, length: i32): locks_entry {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new locks_entry();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.token = reader.bytes();
            break;

          case 2:
            message.owner = reader.bytes();
            break;

          case 3:
            message.receiver = reader.bytes();
            break;

          case 4:
            message.endDate = reader.uint64();
            break;

          case 5:
            message.amount = reader.uint64();
            break;

          case 6:
            message.description = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    token: Uint8Array | null;
    owner: Uint8Array | null;
    receiver: Uint8Array | null;
    endDate: u64;
    amount: u64;
    description: string | null;

    constructor(
      token: Uint8Array | null = null,
      owner: Uint8Array | null = null,
      receiver: Uint8Array | null = null,
      endDate: u64 = 0,
      amount: u64 = 0,
      description: string | null = null
    ) {
      this.token = token;
      this.owner = owner;
      this.receiver = receiver;
      this.endDate = endDate;
      this.amount = amount;
      this.description = description;
    }
  }

  export class locks_item {
    static encode(message: locks_item, writer: Writer): void {
      const unique_name_token = message.token;
      if (unique_name_token !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_token);
      }

      const unique_name_owner = message.owner;
      if (unique_name_owner !== null) {
        writer.uint32(18);
        writer.bytes(unique_name_owner);
      }

      const unique_name_receiver = message.receiver;
      if (unique_name_receiver !== null) {
        writer.uint32(26);
        writer.bytes(unique_name_receiver);
      }

      if (message.startDate != 0) {
        writer.uint32(32);
        writer.uint64(message.startDate);
      }

      if (message.endDate != 0) {
        writer.uint32(40);
        writer.uint64(message.endDate);
      }

      if (message.amount != 0) {
        writer.uint32(48);
        writer.uint64(message.amount);
      }

      const unique_name_description = message.description;
      if (unique_name_description !== null) {
        writer.uint32(58);
        writer.string(unique_name_description);
      }

      if (message.claimed != false) {
        writer.uint32(64);
        writer.bool(message.claimed);
      }
    }

    static decode(reader: Reader, length: i32): locks_item {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new locks_item();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.token = reader.bytes();
            break;

          case 2:
            message.owner = reader.bytes();
            break;

          case 3:
            message.receiver = reader.bytes();
            break;

          case 4:
            message.startDate = reader.uint64();
            break;

          case 5:
            message.endDate = reader.uint64();
            break;

          case 6:
            message.amount = reader.uint64();
            break;

          case 7:
            message.description = reader.string();
            break;

          case 8:
            message.claimed = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    token: Uint8Array | null;
    owner: Uint8Array | null;
    receiver: Uint8Array | null;
    startDate: u64;
    endDate: u64;
    amount: u64;
    description: string | null;
    claimed: bool;

    constructor(
      token: Uint8Array | null = null,
      owner: Uint8Array | null = null,
      receiver: Uint8Array | null = null,
      startDate: u64 = 0,
      endDate: u64 = 0,
      amount: u64 = 0,
      description: string | null = null,
      claimed: bool = false
    ) {
      this.token = token;
      this.owner = owner;
      this.receiver = receiver;
      this.startDate = startDate;
      this.endDate = endDate;
      this.amount = amount;
      this.description = description;
      this.claimed = claimed;
    }
  }

  export class tokenlock_init_event {
    static encode(message: tokenlock_init_event, writer: Writer): void {
      const unique_name_locks_entry = message.locks_entry;
      if (unique_name_locks_entry !== null) {
        writer.uint32(10);
        writer.fork();
        locks_entry.encode(unique_name_locks_entry, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): tokenlock_init_event {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new tokenlock_init_event();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.locks_entry = locks_entry.decode(reader, reader.uint32());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    locks_entry: locks_entry | null;

    constructor(locks_entry: locks_entry | null = null) {
      this.locks_entry = locks_entry;
    }
  }

  export class locks_item_list {
    static encode(message: locks_item_list, writer: Writer): void {
      const unique_name_locks_item = message.locks_item;
      for (let i = 0; i < unique_name_locks_item.length; ++i) {
        writer.uint32(10);
        writer.fork();
        locks_item.encode(unique_name_locks_item[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): locks_item_list {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new locks_item_list();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.locks_item.push(locks_item.decode(reader, reader.uint32()));
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    locks_item: Array<locks_item>;

    constructor(locks_item: Array<locks_item> = []) {
      this.locks_item = locks_item;
    }
  }

  export class lock_params {
    static encode(message: lock_params, writer: Writer): void {
      const unique_name_locks_item = message.locks_item;
      if (unique_name_locks_item !== null) {
        writer.uint32(10);
        writer.fork();
        locks_item.encode(unique_name_locks_item, writer);
        writer.ldelim();
      }

      if (message.locked != false) {
        writer.uint32(16);
        writer.bool(message.locked);
      }

      if (message.blocktime != 0) {
        writer.uint32(24);
        writer.uint64(message.blocktime);
      }
    }

    static decode(reader: Reader, length: i32): lock_params {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new lock_params();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.locks_item = locks_item.decode(reader, reader.uint32());
            break;

          case 2:
            message.locked = reader.bool();
            break;

          case 3:
            message.blocktime = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    locks_item: locks_item | null;
    locked: bool;
    blocktime: u64;

    constructor(
      locks_item: locks_item | null = null,
      locked: bool = false,
      blocktime: u64 = 0
    ) {
      this.locks_item = locks_item;
      this.locked = locked;
      this.blocktime = blocktime;
    }
  }

  export class token_info {
    static encode(message: token_info, writer: Writer): void {
      const unique_name_name = message.name;
      if (unique_name_name !== null) {
        writer.uint32(10);
        writer.string(unique_name_name);
      }

      const unique_name_symbol = message.symbol;
      if (unique_name_symbol !== null) {
        writer.uint32(18);
        writer.string(unique_name_symbol);
      }

      if (message.decimals != 0) {
        writer.uint32(24);
        writer.uint32(message.decimals);
      }
    }

    static decode(reader: Reader, length: i32): token_info {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new token_info();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.name = reader.string();
            break;

          case 2:
            message.symbol = reader.string();
            break;

          case 3:
            message.decimals = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    name: string | null;
    symbol: string | null;
    decimals: u32;

    constructor(
      name: string | null = null,
      symbol: string | null = null,
      decimals: u32 = 0
    ) {
      this.name = name;
      this.symbol = symbol;
      this.decimals = decimals;
    }
  }

  export class lock_params_result {
    static encode(message: lock_params_result, writer: Writer): void {
      if (message.lock_id != 0) {
        writer.uint32(8);
        writer.uint32(message.lock_id);
      }

      const unique_name_lock_params = message.lock_params;
      if (unique_name_lock_params !== null) {
        writer.uint32(18);
        writer.fork();
        lock_params.encode(unique_name_lock_params, writer);
        writer.ldelim();
      }

      const unique_name_token_info = message.token_info;
      if (unique_name_token_info !== null) {
        writer.uint32(26);
        writer.fork();
        token_info.encode(unique_name_token_info, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): lock_params_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new lock_params_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.lock_id = reader.uint32();
            break;

          case 2:
            message.lock_params = lock_params.decode(reader, reader.uint32());
            break;

          case 3:
            message.token_info = token_info.decode(reader, reader.uint32());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    lock_id: u32;
    lock_params: lock_params | null;
    token_info: token_info | null;

    constructor(
      lock_id: u32 = 0,
      lock_params: lock_params | null = null,
      token_info: token_info | null = null
    ) {
      this.lock_id = lock_id;
      this.lock_params = lock_params;
      this.token_info = token_info;
    }
  }

  export class list_locks {
    static encode(message: list_locks, writer: Writer): void {
      const unique_name_value = message.value;
      for (let i = 0; i < unique_name_value.length; ++i) {
        writer.uint32(10);
        writer.fork();
        lock_params_result.encode(unique_name_value[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): list_locks {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new list_locks();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value.push(
              lock_params_result.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Array<lock_params_result>;

    constructor(value: Array<lock_params_result> = []) {
      this.value = value;
    }
  }

  export class list_myLocks {
    static encode(message: list_myLocks, writer: Writer): void {
      const unique_name_items = message.items;
      if (unique_name_items.length !== 0) {
        for (let i = 0; i < unique_name_items.length; ++i) {
          writer.uint32(8);
          writer.uint32(unique_name_items[i]);
        }
      }
    }

    static decode(reader: Reader, length: i32): list_myLocks {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new list_myLocks();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.items.push(reader.uint32());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    items: Array<u32>;

    constructor(items: Array<u32> = []) {
      this.items = items;
    }
  }
}
