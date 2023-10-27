import { Writer, Reader } from "as-proto";
import { common } from "./common";

export namespace tokenlockmap {
  @unmanaged
  export class uint64 {
    static encode(message: uint64, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }

      const unique_name_uint64 = message.uint64;
      if (unique_name_uint64 !== null) {
        writer.uint32(18);
        writer.fork();
        common.uint64.encode(unique_name_uint64, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): uint64 {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new uint64();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          case 2:
            message.uint64 = common.uint64.decode(reader, reader.uint32());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    subcontract_id: u32;
    uint64: common.uint64 | null;

    constructor(subcontract_id: u32 = 0, uint64: common.uint64 | null = null) {
      this.subcontract_id = subcontract_id;
      this.uint64 = uint64;
    }
  }

  export class address {
    static encode(message: address, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }

      const unique_name_address = message.address;
      if (unique_name_address !== null) {
        writer.uint32(18);
        writer.bytes(unique_name_address);
      }
    }

    static decode(reader: Reader, length: i32): address {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new address();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          case 2:
            message.address = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    subcontract_id: u32;
    address: Uint8Array | null;

    constructor(subcontract_id: u32 = 0, address: Uint8Array | null = null) {
      this.subcontract_id = subcontract_id;
      this.address = address;
    }
  }

  @unmanaged
  export class subcontract {
    static encode(message: subcontract, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }
    }

    static decode(reader: Reader, length: i32): subcontract {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new subcontract();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    subcontract_id: u32;

    constructor(subcontract_id: u32 = 0) {
      this.subcontract_id = subcontract_id;
    }
  }

  @unmanaged
  export class list_args {
    static encode(message: list_args, writer: Writer): void {
      if (message.start != 0) {
        writer.uint32(8);
        writer.uint32(message.start);
      }

      if (message.limit != 0) {
        writer.uint32(16);
        writer.int32(message.limit);
      }

      if (message.direction != 0) {
        writer.uint32(24);
        writer.int32(message.direction);
      }
    }

    static decode(reader: Reader, length: i32): list_args {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new list_args();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.start = reader.uint32();
            break;

          case 2:
            message.limit = reader.int32();
            break;

          case 3:
            message.direction = reader.int32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    start: u32;
    limit: i32;
    direction: direction;

    constructor(start: u32 = 0, limit: i32 = 0, direction: direction = 0) {
      this.start = start;
      this.limit = limit;
      this.direction = direction;
    }
  }

  export class list_address_args {
    static encode(message: list_address_args, writer: Writer): void {
      const unique_name_address = message.address;
      if (unique_name_address !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_address);
      }

      if (message.start != 0) {
        writer.uint32(16);
        writer.uint32(message.start);
      }

      if (message.limit != 0) {
        writer.uint32(24);
        writer.int32(message.limit);
      }

      if (message.direction != 0) {
        writer.uint32(32);
        writer.int32(message.direction);
      }
    }

    static decode(reader: Reader, length: i32): list_address_args {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new list_address_args();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.address = reader.bytes();
            break;

          case 2:
            message.start = reader.uint32();
            break;

          case 3:
            message.limit = reader.int32();
            break;

          case 4:
            message.direction = reader.int32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    address: Uint8Array | null;
    start: u32;
    limit: i32;
    direction: direction;

    constructor(
      address: Uint8Array | null = null,
      start: u32 = 0,
      limit: i32 = 0,
      direction: direction = 0
    ) {
      this.address = address;
      this.start = start;
      this.limit = limit;
      this.direction = direction;
    }
  }

  export enum direction {
    ascending = 0,
    descending = 1,
  }
}
