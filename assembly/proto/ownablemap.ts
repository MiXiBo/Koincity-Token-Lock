import { Writer, Reader } from "as-proto";
import { common } from "./common";

export namespace ownablemap {
  export class args {
    static encode(message: args, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }

      const unique_name_address = message.address;
      if (unique_name_address !== null) {
        writer.uint32(18);
        writer.fork();
        common.address.encode(unique_name_address, writer);
        writer.ldelim();
      }

      const unique_name_uint64 = message.uint64;
      if (unique_name_uint64 !== null) {
        writer.uint32(26);
        writer.fork();
        common.uint64.encode(unique_name_uint64, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): args {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new args();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          case 2:
            message.address = common.address.decode(reader, reader.uint32());
            break;

          case 3:
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
    address: common.address | null;
    uint64: common.uint64 | null;

    constructor(
      subcontract_id: u32 = 0,
      address: common.address | null = null,
      uint64: common.uint64 | null = null
    ) {
      this.subcontract_id = subcontract_id;
      this.address = address;
      this.uint64 = uint64;
    }
  }
}
