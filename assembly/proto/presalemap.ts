import { Writer, Reader } from "as-proto";
import { common } from "./common";
import { presale } from "./presale";

export namespace presalemap {
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

  export class finalize {
    static encode(message: finalize, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }

      const unique_name_address = message.address;
      if (unique_name_address !== null) {
        writer.uint32(18);
        writer.bytes(unique_name_address);
      }

      if (message.create_pair != false) {
        writer.uint32(24);
        writer.bool(message.create_pair);
      }
    }

    static decode(reader: Reader, length: i32): finalize {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new finalize();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          case 2:
            message.address = reader.bytes();
            break;

          case 3:
            message.create_pair = reader.bool();
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
    create_pair: bool;

    constructor(
      subcontract_id: u32 = 0,
      address: Uint8Array | null = null,
      create_pair: bool = false
    ) {
      this.subcontract_id = subcontract_id;
      this.address = address;
      this.create_pair = create_pair;
    }
  }

  export class search_params {
    static encode(message: search_params, writer: Writer): void {
      const unique_name_token = message.token;
      if (unique_name_token !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_token);
      }

      const unique_name_name = message.name;
      if (unique_name_name !== null) {
        writer.uint32(18);
        writer.string(unique_name_name);
      }

      const unique_name_symbol = message.symbol;
      if (unique_name_symbol !== null) {
        writer.uint32(26);
        writer.string(unique_name_symbol);
      }

      if (message.status != 0) {
        writer.uint32(32);
        writer.int32(message.status);
      }

      if (message.subcontract_id != 0) {
        writer.uint32(40);
        writer.uint32(message.subcontract_id);
      }
    }

    static decode(reader: Reader, length: i32): search_params {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new search_params();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.token = reader.bytes();
            break;

          case 2:
            message.name = reader.string();
            break;

          case 3:
            message.symbol = reader.string();
            break;

          case 4:
            message.status = reader.int32();
            break;

          case 5:
            message.subcontract_id = reader.uint32();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    token: Uint8Array | null;
    name: string | null;
    symbol: string | null;
    status: i32;
    subcontract_id: u32;

    constructor(
      token: Uint8Array | null = null,
      name: string | null = null,
      symbol: string | null = null,
      status: i32 = 0,
      subcontract_id: u32 = 0
    ) {
      this.token = token;
      this.name = name;
      this.symbol = symbol;
      this.status = status;
      this.subcontract_id = subcontract_id;
    }
  }

  @unmanaged
  export class koincity_metrics {
    static encode(message: koincity_metrics, writer: Writer): void {
      if (message.koinRaised != 0) {
        writer.uint32(8);
        writer.uint64(message.koinRaised);
      }

      if (message.koinLocked != 0) {
        writer.uint32(16);
        writer.uint64(message.koinLocked);
      }

      if (message.participants != 0) {
        writer.uint32(24);
        writer.uint64(message.participants);
      }
    }

    static decode(reader: Reader, length: i32): koincity_metrics {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new koincity_metrics();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.koinRaised = reader.uint64();
            break;

          case 2:
            message.koinLocked = reader.uint64();
            break;

          case 3:
            message.participants = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    koinRaised: u64;
    koinLocked: u64;
    participants: u64;

    constructor(
      koinRaised: u64 = 0,
      koinLocked: u64 = 0,
      participants: u64 = 0
    ) {
      this.koinRaised = koinRaised;
      this.koinLocked = koinLocked;
      this.participants = participants;
    }
  }

  @unmanaged
  export class koincity_fees {
    static encode(message: koincity_fees, writer: Writer): void {
      if (message.launchpad != 0) {
        writer.uint32(8);
        writer.uint64(message.launchpad);
      }

      if (message.audit != 0) {
        writer.uint32(16);
        writer.uint64(message.audit);
      }

      if (message.kyc != 0) {
        writer.uint32(24);
        writer.uint64(message.kyc);
      }

      if (message.token_type0 != 0) {
        writer.uint32(32);
        writer.uint64(message.token_type0);
      }

      if (message.token_type1 != 0) {
        writer.uint32(40);
        writer.uint64(message.token_type1);
      }

      if (message.token_type2 != 0) {
        writer.uint32(48);
        writer.uint64(message.token_type2);
      }

      if (message.sold_token_pct != 0) {
        writer.uint32(56);
        writer.uint64(message.sold_token_pct);
      }

      if (message.sold_value_pct != 0) {
        writer.uint32(64);
        writer.uint64(message.sold_value_pct);
      }

      if (message.sold_independent_pct != 0) {
        writer.uint32(72);
        writer.uint64(message.sold_independent_pct);
      }
    }

    static decode(reader: Reader, length: i32): koincity_fees {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new koincity_fees();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.launchpad = reader.uint64();
            break;

          case 2:
            message.audit = reader.uint64();
            break;

          case 3:
            message.kyc = reader.uint64();
            break;

          case 4:
            message.token_type0 = reader.uint64();
            break;

          case 5:
            message.token_type1 = reader.uint64();
            break;

          case 6:
            message.token_type2 = reader.uint64();
            break;

          case 7:
            message.sold_token_pct = reader.uint64();
            break;

          case 8:
            message.sold_value_pct = reader.uint64();
            break;

          case 9:
            message.sold_independent_pct = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    launchpad: u64;
    audit: u64;
    kyc: u64;
    token_type0: u64;
    token_type1: u64;
    token_type2: u64;
    sold_token_pct: u64;
    sold_value_pct: u64;
    sold_independent_pct: u64;

    constructor(
      launchpad: u64 = 0,
      audit: u64 = 0,
      kyc: u64 = 0,
      token_type0: u64 = 0,
      token_type1: u64 = 0,
      token_type2: u64 = 0,
      sold_token_pct: u64 = 0,
      sold_value_pct: u64 = 0,
      sold_independent_pct: u64 = 0
    ) {
      this.launchpad = launchpad;
      this.audit = audit;
      this.kyc = kyc;
      this.token_type0 = token_type0;
      this.token_type1 = token_type1;
      this.token_type2 = token_type2;
      this.sold_token_pct = sold_token_pct;
      this.sold_value_pct = sold_value_pct;
      this.sold_independent_pct = sold_independent_pct;
    }
  }

  @unmanaged
  export class presale_updates {
    static encode(message: presale_updates, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }

      if (message.status != 0) {
        writer.uint32(16);
        writer.int32(message.status);
      }

      if (message.soldValue != 0) {
        writer.uint32(24);
        writer.uint64(message.soldValue);
      }
    }

    static decode(reader: Reader, length: i32): presale_updates {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new presale_updates();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          case 2:
            message.status = reader.int32();
            break;

          case 3:
            message.soldValue = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    subcontract_id: u32;
    status: i32;
    soldValue: u64;

    constructor(subcontract_id: u32 = 0, status: i32 = 0, soldValue: u64 = 0) {
      this.subcontract_id = subcontract_id;
      this.status = status;
      this.soldValue = soldValue;
    }
  }

  @unmanaged
  export class boole {
    static encode(message: boole, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }

      const unique_name_boole = message.boole;
      if (unique_name_boole !== null) {
        writer.uint32(18);
        writer.fork();
        common.boole.encode(unique_name_boole, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): boole {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new boole();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          case 2:
            message.boole = common.boole.decode(reader, reader.uint32());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    subcontract_id: u32;
    boole: common.boole | null;

    constructor(subcontract_id: u32 = 0, boole: common.boole | null = null) {
      this.subcontract_id = subcontract_id;
      this.boole = boole;
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

  export class search_args {
    static encode(message: search_args, writer: Writer): void {
      const unique_name_searchstring = message.searchstring;
      if (unique_name_searchstring !== null) {
        writer.uint32(10);
        writer.string(unique_name_searchstring);
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

    static decode(reader: Reader, length: i32): search_args {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new search_args();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.searchstring = reader.string();
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

    searchstring: string | null;
    start: u32;
    limit: i32;
    direction: direction;

    constructor(
      searchstring: string | null = null,
      start: u32 = 0,
      limit: i32 = 0,
      direction: direction = 0
    ) {
      this.searchstring = searchstring;
      this.start = start;
      this.limit = limit;
      this.direction = direction;
    }
  }

  export class list_presales {
    static encode(message: list_presales, writer: Writer): void {
      const unique_name_value = message.value;
      for (let i = 0; i < unique_name_value.length; ++i) {
        writer.uint32(10);
        writer.fork();
        presale_params.encode(unique_name_value[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): list_presales {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new list_presales();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value.push(presale_params.decode(reader, reader.uint32()));
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Array<presale_params>;

    constructor(value: Array<presale_params> = []) {
      this.value = value;
    }
  }

  export class list_updates {
    static encode(message: list_updates, writer: Writer): void {
      const unique_name_value = message.value;
      for (let i = 0; i < unique_name_value.length; ++i) {
        writer.uint32(10);
        writer.fork();
        presale_updates.encode(unique_name_value[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): list_updates {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new list_updates();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value.push(presale_updates.decode(reader, reader.uint32()));
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Array<presale_updates>;

    constructor(value: Array<presale_updates> = []) {
      this.value = value;
    }
  }

  export class search_presales {
    static encode(message: search_presales, writer: Writer): void {
      const unique_name_value = message.value;
      for (let i = 0; i < unique_name_value.length; ++i) {
        writer.uint32(10);
        writer.fork();
        search_params.encode(unique_name_value[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): search_presales {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new search_presales();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value.push(search_params.decode(reader, reader.uint32()));
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Array<search_params>;

    constructor(value: Array<search_params> = []) {
      this.value = value;
    }
  }

  export class logo_data {
    static encode(message: logo_data, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }

      const unique_name_logo = message.logo;
      if (unique_name_logo !== null) {
        writer.uint32(18);
        writer.string(unique_name_logo);
      }
    }

    static decode(reader: Reader, length: i32): logo_data {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new logo_data();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          case 2:
            message.logo = reader.string();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    subcontract_id: u32;
    logo: string | null;

    constructor(subcontract_id: u32 = 0, logo: string | null = null) {
      this.subcontract_id = subcontract_id;
      this.logo = logo;
    }
  }

  export class list_logos {
    static encode(message: list_logos, writer: Writer): void {
      const unique_name_value = message.value;
      for (let i = 0; i < unique_name_value.length; ++i) {
        writer.uint32(10);
        writer.fork();
        logo_data.encode(unique_name_value[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): list_logos {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new list_logos();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.value.push(logo_data.decode(reader, reader.uint32()));
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    value: Array<logo_data>;

    constructor(value: Array<logo_data> = []) {
      this.value = value;
    }
  }

  export class presale_params {
    static encode(message: presale_params, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }

      const unique_name_presale_params = message.presale_params;
      if (unique_name_presale_params !== null) {
        writer.uint32(18);
        writer.fork();
        presale.presale_params.encode(unique_name_presale_params, writer);
        writer.ldelim();
      }

      const unique_name_state = message.state;
      if (unique_name_state !== null) {
        writer.uint32(26);
        writer.fork();
        presale.presale_state.encode(unique_name_state, writer);
        writer.ldelim();
      }

      if (message.status != 0) {
        writer.uint32(32);
        writer.int32(message.status);
      }

      if (message.blocktime != 0) {
        writer.uint32(40);
        writer.uint64(message.blocktime);
      }

      const unique_name_token_params = message.token_params;
      if (unique_name_token_params !== null) {
        writer.uint32(50);
        writer.fork();
        presale.token_params.encode(unique_name_token_params, writer);
        writer.ldelim();
      }

      if (message.emergencyWithdrawEnabled != false) {
        writer.uint32(56);
        writer.bool(message.emergencyWithdrawEnabled);
      }

      if (message.withdrawEnabled != false) {
        writer.uint32(64);
        writer.bool(message.withdrawEnabled);
      }

      if (message.launchDate != 0) {
        writer.uint32(72);
        writer.uint64(message.launchDate);
      }

      const unique_name_trust = message.trust;
      if (unique_name_trust !== null) {
        writer.uint32(82);
        writer.fork();
        presale.trust.encode(unique_name_trust, writer);
        writer.ldelim();
      }

      if (message.whitelist != false) {
        writer.uint32(88);
        writer.bool(message.whitelist);
      }
    }

    static decode(reader: Reader, length: i32): presale_params {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new presale_params();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          case 2:
            message.presale_params = presale.presale_params.decode(
              reader,
              reader.uint32()
            );
            break;

          case 3:
            message.state = presale.presale_state.decode(
              reader,
              reader.uint32()
            );
            break;

          case 4:
            message.status = reader.int32();
            break;

          case 5:
            message.blocktime = reader.uint64();
            break;

          case 6:
            message.token_params = presale.token_params.decode(
              reader,
              reader.uint32()
            );
            break;

          case 7:
            message.emergencyWithdrawEnabled = reader.bool();
            break;

          case 8:
            message.withdrawEnabled = reader.bool();
            break;

          case 9:
            message.launchDate = reader.uint64();
            break;

          case 10:
            message.trust = presale.trust.decode(reader, reader.uint32());
            break;

          case 11:
            message.whitelist = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    subcontract_id: u32;
    presale_params: presale.presale_params | null;
    state: presale.presale_state | null;
    status: i32;
    blocktime: u64;
    token_params: presale.token_params | null;
    emergencyWithdrawEnabled: bool;
    withdrawEnabled: bool;
    launchDate: u64;
    trust: presale.trust | null;
    whitelist: bool;

    constructor(
      subcontract_id: u32 = 0,
      presale_params: presale.presale_params | null = null,
      state: presale.presale_state | null = null,
      status: i32 = 0,
      blocktime: u64 = 0,
      token_params: presale.token_params | null = null,
      emergencyWithdrawEnabled: bool = false,
      withdrawEnabled: bool = false,
      launchDate: u64 = 0,
      trust: presale.trust | null = null,
      whitelist: bool = false
    ) {
      this.subcontract_id = subcontract_id;
      this.presale_params = presale_params;
      this.state = state;
      this.status = status;
      this.blocktime = blocktime;
      this.token_params = token_params;
      this.emergencyWithdrawEnabled = emergencyWithdrawEnabled;
      this.withdrawEnabled = withdrawEnabled;
      this.launchDate = launchDate;
      this.trust = trust;
      this.whitelist = whitelist;
    }
  }

  @unmanaged
  export class min_max_args {
    static encode(message: min_max_args, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }

      const unique_name_min_max_args = message.min_max_args;
      if (unique_name_min_max_args !== null) {
        writer.uint32(18);
        writer.fork();
        presale.min_max_args.encode(unique_name_min_max_args, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): min_max_args {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new min_max_args();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          case 2:
            message.min_max_args = presale.min_max_args.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    subcontract_id: u32;
    min_max_args: presale.min_max_args | null;

    constructor(
      subcontract_id: u32 = 0,
      min_max_args: presale.min_max_args | null = null
    ) {
      this.subcontract_id = subcontract_id;
      this.min_max_args = min_max_args;
    }
  }

  export class contribution_args {
    static encode(message: contribution_args, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }

      const unique_name_user = message.user;
      if (unique_name_user !== null) {
        writer.uint32(18);
        writer.fork();
        address.encode(unique_name_user, writer);
        writer.ldelim();
      }

      if (message.koin_amount != 0) {
        writer.uint32(24);
        writer.uint64(message.koin_amount);
      }
    }

    static decode(reader: Reader, length: i32): contribution_args {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new contribution_args();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          case 2:
            message.user = address.decode(reader, reader.uint32());
            break;

          case 3:
            message.koin_amount = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    subcontract_id: u32;
    user: address | null;
    koin_amount: u64;

    constructor(
      subcontract_id: u32 = 0,
      user: address | null = null,
      koin_amount: u64 = 0
    ) {
      this.subcontract_id = subcontract_id;
      this.user = user;
      this.koin_amount = koin_amount;
    }
  }

  export class emergency_withdraw_args {
    static encode(message: emergency_withdraw_args, writer: Writer): void {
      if (message.subcontract_id != 0) {
        writer.uint32(8);
        writer.uint32(message.subcontract_id);
      }

      const unique_name_emergency_withdraw_args =
        message.emergency_withdraw_args;
      if (unique_name_emergency_withdraw_args !== null) {
        writer.uint32(18);
        writer.fork();
        presale.emergency_withdraw_args.encode(
          unique_name_emergency_withdraw_args,
          writer
        );
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): emergency_withdraw_args {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new emergency_withdraw_args();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.subcontract_id = reader.uint32();
            break;

          case 2:
            message.emergency_withdraw_args =
              presale.emergency_withdraw_args.decode(reader, reader.uint32());
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    subcontract_id: u32;
    emergency_withdraw_args: presale.emergency_withdraw_args | null;

    constructor(
      subcontract_id: u32 = 0,
      emergency_withdraw_args: presale.emergency_withdraw_args | null = null
    ) {
      this.subcontract_id = subcontract_id;
      this.emergency_withdraw_args = emergency_withdraw_args;
    }
  }

  @unmanaged
  export class user_presale_contribution {
    static encode(message: user_presale_contribution, writer: Writer): void {
      if (message.userPresaleKoin != 0) {
        writer.uint32(8);
        writer.uint64(message.userPresaleKoin);
      }

      if (message.userPresaleToken != 0) {
        writer.uint32(16);
        writer.uint64(message.userPresaleToken);
      }

      if (message.claimed != false) {
        writer.uint32(24);
        writer.bool(message.claimed);
      }
    }

    static decode(reader: Reader, length: i32): user_presale_contribution {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new user_presale_contribution();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.userPresaleKoin = reader.uint64();
            break;

          case 2:
            message.userPresaleToken = reader.uint64();
            break;

          case 3:
            message.claimed = reader.bool();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    userPresaleKoin: u64;
    userPresaleToken: u64;
    claimed: bool;

    constructor(
      userPresaleKoin: u64 = 0,
      userPresaleToken: u64 = 0,
      claimed: bool = false
    ) {
      this.userPresaleKoin = userPresaleKoin;
      this.userPresaleToken = userPresaleToken;
      this.claimed = claimed;
    }
  }

  export enum direction {
    ascending = 0,
    descending = 1,
  }
}
