/*
** DON'T EDIT THIS FILE **
It's been generated by Zapatos (v5.0.0), and is liable to be overwritten

Zapatos: https://jawj.github.io/zapatos/
Copyright (C) 2020 - 2021 George MacKerron
Released under the MIT licence: see LICENCE file
*/

declare module 'zapatos/schema' {

  import type * as db from 'zapatos/db';

  // got a type error on schemaVersionCanary below? update by running `npx zapatos`
  export interface schemaVersionCanary extends db.SchemaVersionCanary { version: 103 }

  /* === schema: public === */

  /* --- enums --- */


  /* --- tables --- */

  /**
   * **clubs**
   * - Table in database
   */
  export namespace clubs {
    export type Table = 'clubs';
    export interface Selectable {
      /**
      * **clubs.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid: number;
      /**
      * **clubs.clubname**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      clubname: string;
      /**
      * **clubs.amount**
      * - `float4` in database
      * - `NOT NULL`, default: `0`
      */
      amount: number;
    }
    export interface JSONSelectable {
      /**
      * **clubs.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid: number;
      /**
      * **clubs.clubname**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      clubname: string;
      /**
      * **clubs.amount**
      * - `float4` in database
      * - `NOT NULL`, default: `0`
      */
      amount: number;
    }
    export interface Whereable {
      /**
      * **clubs.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **clubs.clubname**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      clubname?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **clubs.amount**
      * - `float4` in database
      * - `NOT NULL`, default: `0`
      */
      amount?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **clubs.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid: number | db.Parameter<number> | db.SQLFragment;
      /**
      * **clubs.clubname**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      clubname: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **clubs.amount**
      * - `float4` in database
      * - `NOT NULL`, default: `0`
      */
      amount?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **clubs.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid?: number | db.Parameter<number> | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment>;
      /**
      * **clubs.clubname**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      clubname?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **clubs.amount**
      * - `float4` in database
      * - `NOT NULL`, default: `0`
      */
      amount?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;
    }
    export type UniqueIndex = 'clubs_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = db.GenericSQLExpression | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Table | Whereable | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /**
   * **execs**
   * - Table in database
   */
  export namespace execs {
    export type Table = 'execs';
    export interface Selectable {
      /**
      * **execs.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string;
      /**
      * **execs.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid: number;
    }
    export interface JSONSelectable {
      /**
      * **execs.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string;
      /**
      * **execs.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid: number;
    }
    export interface Whereable {
      /**
      * **execs.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **execs.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **execs.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **execs.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid: number | db.Parameter<number> | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **execs.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **execs.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid?: number | db.Parameter<number> | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment>;
    }
    export type UniqueIndex = 'execs_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = db.GenericSQLExpression | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Table | Whereable | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /**
   * **forgot_password**
   * - Table in database
   */
  export namespace forgot_password {
    export type Table = 'forgot_password';
    export interface Selectable {
      /**
      * **forgot_password.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string;
      /**
      * **forgot_password.code**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      code: string;
      /**
      * **forgot_password.created_at**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `now()`
      */
      created_at: Date;
    }
    export interface JSONSelectable {
      /**
      * **forgot_password.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string;
      /**
      * **forgot_password.code**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      code: string;
      /**
      * **forgot_password.created_at**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `now()`
      */
      created_at: db.TimestampTzString;
    }
    export interface Whereable {
      /**
      * **forgot_password.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **forgot_password.code**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      code?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **forgot_password.created_at**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `now()`
      */
      created_at?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **forgot_password.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **forgot_password.code**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      code: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **forgot_password.created_at**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `now()`
      */
      created_at?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **forgot_password.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **forgot_password.code**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      code?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **forgot_password.created_at**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `now()`
      */
      created_at?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment>;
    }
    export type UniqueIndex = never;
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = db.GenericSQLExpression | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Table | Whereable | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /**
   * **invoice_queue**
   * - Table in database
   */
  export namespace invoice_queue {
    export type Table = 'invoice_queue';
    export interface Selectable {
      /**
      * **invoice_queue.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string;
    }
    export interface JSONSelectable {
      /**
      * **invoice_queue.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string;
    }
    export interface Whereable {
      /**
      * **invoice_queue.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **invoice_queue.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string | db.Parameter<string> | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **invoice_queue.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
    }
    export type UniqueIndex = 'invoice_queue_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = db.GenericSQLExpression | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Table | Whereable | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /**
   * **state**
   * - Table in database
   */
  export namespace state {
    export type Table = 'state';
    export interface Selectable {
      /**
      * **state.var**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      var: string;
      /**
      * **state.val**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      val: string;
    }
    export interface JSONSelectable {
      /**
      * **state.var**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      var: string;
      /**
      * **state.val**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      val: string;
    }
    export interface Whereable {
      /**
      * **state.var**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      var?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **state.val**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      val?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **state.var**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      var: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **state.val**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      val: string | db.Parameter<string> | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **state.var**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      var?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **state.val**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      val?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
    }
    export type UniqueIndex = 'state_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = db.GenericSQLExpression | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Table | Whereable | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /**
   * **transactions**
   * - Table in database
   */
  export namespace transactions {
    export type Table = 'transactions';
    export interface Selectable {
      /**
      * **transactions.id**
      * - `uuid` in database
      * - `NOT NULL`, default: `uuid_generate_v4()`
      */
      id: string;
      /**
      * **transactions.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid: number;
      /**
      * **transactions.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string;
      /**
      * **transactions.created_at**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `now()`
      */
      created_at: Date;
      /**
      * **transactions.created_by**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      created_by: string;
      /**
      * **transactions.amount**
      * - `float4` in database
      * - `NOT NULL`, no default
      */
      amount: number;
    }
    export interface JSONSelectable {
      /**
      * **transactions.id**
      * - `uuid` in database
      * - `NOT NULL`, default: `uuid_generate_v4()`
      */
      id: string;
      /**
      * **transactions.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid: number;
      /**
      * **transactions.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string;
      /**
      * **transactions.created_at**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `now()`
      */
      created_at: db.TimestampTzString;
      /**
      * **transactions.created_by**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      created_by: string;
      /**
      * **transactions.amount**
      * - `float4` in database
      * - `NOT NULL`, no default
      */
      amount: number;
    }
    export interface Whereable {
      /**
      * **transactions.id**
      * - `uuid` in database
      * - `NOT NULL`, default: `uuid_generate_v4()`
      */
      id?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **transactions.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **transactions.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **transactions.created_at**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `now()`
      */
      created_at?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.SQLFragment | db.ParentColumn>;
      /**
      * **transactions.created_by**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      created_by?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **transactions.amount**
      * - `float4` in database
      * - `NOT NULL`, no default
      */
      amount?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **transactions.id**
      * - `uuid` in database
      * - `NOT NULL`, default: `uuid_generate_v4()`
      */
      id?: string | db.Parameter<string> | db.DefaultType | db.SQLFragment;
      /**
      * **transactions.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid: number | db.Parameter<number> | db.SQLFragment;
      /**
      * **transactions.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **transactions.created_at**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `now()`
      */
      created_at?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment;
      /**
      * **transactions.created_by**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      created_by: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **transactions.amount**
      * - `float4` in database
      * - `NOT NULL`, no default
      */
      amount: number | db.Parameter<number> | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **transactions.id**
      * - `uuid` in database
      * - `NOT NULL`, default: `uuid_generate_v4()`
      */
      id?: string | db.Parameter<string> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.DefaultType | db.SQLFragment>;
      /**
      * **transactions.clubid**
      * - `int4` in database
      * - `NOT NULL`, no default
      */
      clubid?: number | db.Parameter<number> | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment>;
      /**
      * **transactions.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **transactions.created_at**
      * - `timestamptz` in database
      * - `NOT NULL`, default: `now()`
      */
      created_at?: (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, (db.TimestampTzString | Date) | db.Parameter<(db.TimestampTzString | Date)> | db.DefaultType | db.SQLFragment>;
      /**
      * **transactions.created_by**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      created_by?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **transactions.amount**
      * - `float4` in database
      * - `NOT NULL`, no default
      */
      amount?: number | db.Parameter<number> | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment>;
    }
    export type UniqueIndex = 'transactions_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = db.GenericSQLExpression | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Table | Whereable | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /**
   * **users**
   * - Table in database
   */
  export namespace users {
    export type Table = 'users';
    export interface Selectable {
      /**
      * **users.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string;
      /**
      * **users.isexec**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
      isexec: boolean;
      /**
      * **users.full_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      full_name: string;
      /**
      * **users.foip**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
      foip: boolean;
      /**
      * **users.balance**
      * - `float4` in database
      * - `NOT NULL`, default: `0`
      */
      balance: number;
      /**
      * **users.subscribed**
      * - `bool` in database
      * - `NOT NULL`, default: `true`
      */
      subscribed: boolean;
      /**
      * **users.active**
      * - `bool` in database
      * - `NOT NULL`, default: `true`
      */
      active: boolean;
      /**
      * **users.password**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      password: string;
    }
    export interface JSONSelectable {
      /**
      * **users.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string;
      /**
      * **users.isexec**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
      isexec: boolean;
      /**
      * **users.full_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      full_name: string;
      /**
      * **users.foip**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
      foip: boolean;
      /**
      * **users.balance**
      * - `float4` in database
      * - `NOT NULL`, default: `0`
      */
      balance: number;
      /**
      * **users.subscribed**
      * - `bool` in database
      * - `NOT NULL`, default: `true`
      */
      subscribed: boolean;
      /**
      * **users.active**
      * - `bool` in database
      * - `NOT NULL`, default: `true`
      */
      active: boolean;
      /**
      * **users.password**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      password: string;
    }
    export interface Whereable {
      /**
      * **users.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **users.isexec**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
      isexec?: boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn>;
      /**
      * **users.full_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      full_name?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
      /**
      * **users.foip**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
      foip?: boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn>;
      /**
      * **users.balance**
      * - `float4` in database
      * - `NOT NULL`, default: `0`
      */
      balance?: number | db.Parameter<number> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, number | db.Parameter<number> | db.SQLFragment | db.ParentColumn>;
      /**
      * **users.subscribed**
      * - `bool` in database
      * - `NOT NULL`, default: `true`
      */
      subscribed?: boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn>;
      /**
      * **users.active**
      * - `bool` in database
      * - `NOT NULL`, default: `true`
      */
      active?: boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.SQLFragment | db.ParentColumn>;
      /**
      * **users.password**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      password?: string | db.Parameter<string> | db.SQLFragment | db.ParentColumn | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment | db.ParentColumn>;
    }
    export interface Insertable {
      /**
      * **users.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **users.isexec**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
      isexec?: boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment;
      /**
      * **users.full_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      full_name: string | db.Parameter<string> | db.SQLFragment;
      /**
      * **users.foip**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
      foip?: boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment;
      /**
      * **users.balance**
      * - `float4` in database
      * - `NOT NULL`, default: `0`
      */
      balance?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment;
      /**
      * **users.subscribed**
      * - `bool` in database
      * - `NOT NULL`, default: `true`
      */
      subscribed?: boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment;
      /**
      * **users.active**
      * - `bool` in database
      * - `NOT NULL`, default: `true`
      */
      active?: boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment;
      /**
      * **users.password**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      password: string | db.Parameter<string> | db.SQLFragment;
    }
    export interface Updatable {
      /**
      * **users.ccid**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      ccid?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **users.isexec**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
      isexec?: boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment>;
      /**
      * **users.full_name**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      full_name?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
      /**
      * **users.foip**
      * - `bool` in database
      * - `NOT NULL`, default: `false`
      */
      foip?: boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment>;
      /**
      * **users.balance**
      * - `float4` in database
      * - `NOT NULL`, default: `0`
      */
      balance?: number | db.Parameter<number> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, number | db.Parameter<number> | db.DefaultType | db.SQLFragment>;
      /**
      * **users.subscribed**
      * - `bool` in database
      * - `NOT NULL`, default: `true`
      */
      subscribed?: boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment>;
      /**
      * **users.active**
      * - `bool` in database
      * - `NOT NULL`, default: `true`
      */
      active?: boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment | db.SQLFragment<any, boolean | db.Parameter<boolean> | db.DefaultType | db.SQLFragment>;
      /**
      * **users.password**
      * - `text` in database
      * - `NOT NULL`, no default
      */
      password?: string | db.Parameter<string> | db.SQLFragment | db.SQLFragment<any, string | db.Parameter<string> | db.SQLFragment>;
    }
    export type UniqueIndex = 'users_pkey';
    export type Column = keyof Selectable;
    export type OnlyCols<T extends readonly Column[]> = Pick<Selectable, T[number]>;
    export type SQLExpression = db.GenericSQLExpression | db.ColumnNames<Updatable | (keyof Updatable)[]> | db.ColumnValues<Updatable> | Table | Whereable | Column;
    export type SQL = SQLExpression | SQLExpression[];
  }

  /* === cross-table types === */

  export type Table = clubs.Table | execs.Table | forgot_password.Table | invoice_queue.Table | state.Table | transactions.Table | users.Table;
  export type Selectable = clubs.Selectable | execs.Selectable | forgot_password.Selectable | invoice_queue.Selectable | state.Selectable | transactions.Selectable | users.Selectable;
  export type JSONSelectable = clubs.JSONSelectable | execs.JSONSelectable | forgot_password.JSONSelectable | invoice_queue.JSONSelectable | state.JSONSelectable | transactions.JSONSelectable | users.JSONSelectable;
  export type Whereable = clubs.Whereable | execs.Whereable | forgot_password.Whereable | invoice_queue.Whereable | state.Whereable | transactions.Whereable | users.Whereable;
  export type Insertable = clubs.Insertable | execs.Insertable | forgot_password.Insertable | invoice_queue.Insertable | state.Insertable | transactions.Insertable | users.Insertable;
  export type Updatable = clubs.Updatable | execs.Updatable | forgot_password.Updatable | invoice_queue.Updatable | state.Updatable | transactions.Updatable | users.Updatable;
  export type UniqueIndex = clubs.UniqueIndex | execs.UniqueIndex | forgot_password.UniqueIndex | invoice_queue.UniqueIndex | state.UniqueIndex | transactions.UniqueIndex | users.UniqueIndex;
  export type Column = clubs.Column | execs.Column | forgot_password.Column | invoice_queue.Column | state.Column | transactions.Column | users.Column;
  export type AllBaseTables = [clubs.Table, execs.Table, forgot_password.Table, invoice_queue.Table, state.Table, transactions.Table, users.Table];
  export type AllForeignTables = [];
  export type AllViews = [];
  export type AllMaterializedViews = [];
  export type AllTablesAndViews = [clubs.Table, execs.Table, forgot_password.Table, invoice_queue.Table, state.Table, transactions.Table, users.Table];


  export type SelectableForTable<T extends Table> = {
    clubs: clubs.Selectable;
    execs: execs.Selectable;
    forgot_password: forgot_password.Selectable;
    invoice_queue: invoice_queue.Selectable;
    state: state.Selectable;
    transactions: transactions.Selectable;
    users: users.Selectable;
  }[T];

  export type JSONSelectableForTable<T extends Table> = {
    clubs: clubs.JSONSelectable;
    execs: execs.JSONSelectable;
    forgot_password: forgot_password.JSONSelectable;
    invoice_queue: invoice_queue.JSONSelectable;
    state: state.JSONSelectable;
    transactions: transactions.JSONSelectable;
    users: users.JSONSelectable;
  }[T];

  export type WhereableForTable<T extends Table> = {
    clubs: clubs.Whereable;
    execs: execs.Whereable;
    forgot_password: forgot_password.Whereable;
    invoice_queue: invoice_queue.Whereable;
    state: state.Whereable;
    transactions: transactions.Whereable;
    users: users.Whereable;
  }[T];

  export type InsertableForTable<T extends Table> = {
    clubs: clubs.Insertable;
    execs: execs.Insertable;
    forgot_password: forgot_password.Insertable;
    invoice_queue: invoice_queue.Insertable;
    state: state.Insertable;
    transactions: transactions.Insertable;
    users: users.Insertable;
  }[T];

  export type UpdatableForTable<T extends Table> = {
    clubs: clubs.Updatable;
    execs: execs.Updatable;
    forgot_password: forgot_password.Updatable;
    invoice_queue: invoice_queue.Updatable;
    state: state.Updatable;
    transactions: transactions.Updatable;
    users: users.Updatable;
  }[T];

  export type UniqueIndexForTable<T extends Table> = {
    clubs: clubs.UniqueIndex;
    execs: execs.UniqueIndex;
    forgot_password: forgot_password.UniqueIndex;
    invoice_queue: invoice_queue.UniqueIndex;
    state: state.UniqueIndex;
    transactions: transactions.UniqueIndex;
    users: users.UniqueIndex;
  }[T];

  export type ColumnForTable<T extends Table> = {
    clubs: clubs.Column;
    execs: execs.Column;
    forgot_password: forgot_password.Column;
    invoice_queue: invoice_queue.Column;
    state: state.Column;
    transactions: transactions.Column;
    users: users.Column;
  }[T];

  export type SQLForTable<T extends Table> = {
    clubs: clubs.SQL;
    execs: execs.SQL;
    forgot_password: forgot_password.SQL;
    invoice_queue: invoice_queue.SQL;
    state: state.SQL;
    transactions: transactions.SQL;
    users: users.SQL;
  }[T];

}
