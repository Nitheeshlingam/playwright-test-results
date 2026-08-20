
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model TestRun
 * 
 */
export type TestRun = $Result.DefaultSelection<Prisma.$TestRunPayload>
/**
 * Model TestResult
 * 
 */
export type TestResult = $Result.DefaultSelection<Prisma.$TestResultPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more TestRuns
 * const testRuns = await prisma.testRun.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more TestRuns
   * const testRuns = await prisma.testRun.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.testRun`: Exposes CRUD operations for the **TestRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestRuns
    * const testRuns = await prisma.testRun.findMany()
    * ```
    */
  get testRun(): Prisma.TestRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testResult`: Exposes CRUD operations for the **TestResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestResults
    * const testResults = await prisma.testResult.findMany()
    * ```
    */
  get testResult(): Prisma.TestResultDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    TestRun: 'TestRun',
    TestResult: 'TestResult'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "testRun" | "testResult"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      TestRun: {
        payload: Prisma.$TestRunPayload<ExtArgs>
        fields: Prisma.TestRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestRunPayload>
          }
          findFirst: {
            args: Prisma.TestRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestRunPayload>
          }
          findMany: {
            args: Prisma.TestRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestRunPayload>[]
          }
          create: {
            args: Prisma.TestRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestRunPayload>
          }
          createMany: {
            args: Prisma.TestRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TestRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestRunPayload>
          }
          update: {
            args: Prisma.TestRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestRunPayload>
          }
          deleteMany: {
            args: Prisma.TestRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TestRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestRunPayload>
          }
          aggregate: {
            args: Prisma.TestRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestRun>
          }
          groupBy: {
            args: Prisma.TestRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestRunCountArgs<ExtArgs>
            result: $Utils.Optional<TestRunCountAggregateOutputType> | number
          }
        }
      }
      TestResult: {
        payload: Prisma.$TestResultPayload<ExtArgs>
        fields: Prisma.TestResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultPayload>
          }
          findFirst: {
            args: Prisma.TestResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultPayload>
          }
          findMany: {
            args: Prisma.TestResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultPayload>[]
          }
          create: {
            args: Prisma.TestResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultPayload>
          }
          createMany: {
            args: Prisma.TestResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TestResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultPayload>
          }
          update: {
            args: Prisma.TestResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultPayload>
          }
          deleteMany: {
            args: Prisma.TestResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TestResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestResultPayload>
          }
          aggregate: {
            args: Prisma.TestResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestResult>
          }
          groupBy: {
            args: Prisma.TestResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestResultCountArgs<ExtArgs>
            result: $Utils.Optional<TestResultCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    testRun?: TestRunOmit
    testResult?: TestResultOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TestRunCountOutputType
   */

  export type TestRunCountOutputType = {
    testResults: number
  }

  export type TestRunCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testResults?: boolean | TestRunCountOutputTypeCountTestResultsArgs
  }

  // Custom InputTypes
  /**
   * TestRunCountOutputType without action
   */
  export type TestRunCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestRunCountOutputType
     */
    select?: TestRunCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TestRunCountOutputType without action
   */
  export type TestRunCountOutputTypeCountTestResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestResultWhereInput
  }


  /**
   * Models
   */

  /**
   * Model TestRun
   */

  export type AggregateTestRun = {
    _count: TestRunCountAggregateOutputType | null
    _avg: TestRunAvgAggregateOutputType | null
    _sum: TestRunSumAggregateOutputType | null
    _min: TestRunMinAggregateOutputType | null
    _max: TestRunMaxAggregateOutputType | null
  }

  export type TestRunAvgAggregateOutputType = {
    id: number | null
    prNumber: number | null
  }

  export type TestRunSumAggregateOutputType = {
    id: number | null
    prNumber: number | null
  }

  export type TestRunMinAggregateOutputType = {
    id: number | null
    githubRunId: string | null
    commitSha: string | null
    developer: string | null
    branch: string | null
    status: string | null
    event: string | null
    repository: string | null
    startedAt: Date | null
    createdAt: Date | null
    prNumber: number | null
  }

  export type TestRunMaxAggregateOutputType = {
    id: number | null
    githubRunId: string | null
    commitSha: string | null
    developer: string | null
    branch: string | null
    status: string | null
    event: string | null
    repository: string | null
    startedAt: Date | null
    createdAt: Date | null
    prNumber: number | null
  }

  export type TestRunCountAggregateOutputType = {
    id: number
    githubRunId: number
    commitSha: number
    developer: number
    branch: number
    status: number
    event: number
    repository: number
    startedAt: number
    createdAt: number
    prNumber: number
    _all: number
  }


  export type TestRunAvgAggregateInputType = {
    id?: true
    prNumber?: true
  }

  export type TestRunSumAggregateInputType = {
    id?: true
    prNumber?: true
  }

  export type TestRunMinAggregateInputType = {
    id?: true
    githubRunId?: true
    commitSha?: true
    developer?: true
    branch?: true
    status?: true
    event?: true
    repository?: true
    startedAt?: true
    createdAt?: true
    prNumber?: true
  }

  export type TestRunMaxAggregateInputType = {
    id?: true
    githubRunId?: true
    commitSha?: true
    developer?: true
    branch?: true
    status?: true
    event?: true
    repository?: true
    startedAt?: true
    createdAt?: true
    prNumber?: true
  }

  export type TestRunCountAggregateInputType = {
    id?: true
    githubRunId?: true
    commitSha?: true
    developer?: true
    branch?: true
    status?: true
    event?: true
    repository?: true
    startedAt?: true
    createdAt?: true
    prNumber?: true
    _all?: true
  }

  export type TestRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestRun to aggregate.
     */
    where?: TestRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestRuns to fetch.
     */
    orderBy?: TestRunOrderByWithRelationInput | TestRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestRuns
    **/
    _count?: true | TestRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestRunMaxAggregateInputType
  }

  export type GetTestRunAggregateType<T extends TestRunAggregateArgs> = {
        [P in keyof T & keyof AggregateTestRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestRun[P]>
      : GetScalarType<T[P], AggregateTestRun[P]>
  }




  export type TestRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestRunWhereInput
    orderBy?: TestRunOrderByWithAggregationInput | TestRunOrderByWithAggregationInput[]
    by: TestRunScalarFieldEnum[] | TestRunScalarFieldEnum
    having?: TestRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestRunCountAggregateInputType | true
    _avg?: TestRunAvgAggregateInputType
    _sum?: TestRunSumAggregateInputType
    _min?: TestRunMinAggregateInputType
    _max?: TestRunMaxAggregateInputType
  }

  export type TestRunGroupByOutputType = {
    id: number
    githubRunId: string
    commitSha: string
    developer: string
    branch: string | null
    status: string
    event: string | null
    repository: string
    startedAt: Date
    createdAt: Date
    prNumber: number | null
    _count: TestRunCountAggregateOutputType | null
    _avg: TestRunAvgAggregateOutputType | null
    _sum: TestRunSumAggregateOutputType | null
    _min: TestRunMinAggregateOutputType | null
    _max: TestRunMaxAggregateOutputType | null
  }

  type GetTestRunGroupByPayload<T extends TestRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestRunGroupByOutputType[P]>
            : GetScalarType<T[P], TestRunGroupByOutputType[P]>
        }
      >
    >


  export type TestRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    githubRunId?: boolean
    commitSha?: boolean
    developer?: boolean
    branch?: boolean
    status?: boolean
    event?: boolean
    repository?: boolean
    startedAt?: boolean
    createdAt?: boolean
    prNumber?: boolean
    testResults?: boolean | TestRun$testResultsArgs<ExtArgs>
    _count?: boolean | TestRunCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testRun"]>



  export type TestRunSelectScalar = {
    id?: boolean
    githubRunId?: boolean
    commitSha?: boolean
    developer?: boolean
    branch?: boolean
    status?: boolean
    event?: boolean
    repository?: boolean
    startedAt?: boolean
    createdAt?: boolean
    prNumber?: boolean
  }

  export type TestRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "githubRunId" | "commitSha" | "developer" | "branch" | "status" | "event" | "repository" | "startedAt" | "createdAt" | "prNumber", ExtArgs["result"]["testRun"]>
  export type TestRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testResults?: boolean | TestRun$testResultsArgs<ExtArgs>
    _count?: boolean | TestRunCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TestRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestRun"
    objects: {
      testResults: Prisma.$TestResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      githubRunId: string
      commitSha: string
      developer: string
      branch: string | null
      status: string
      event: string | null
      repository: string
      startedAt: Date
      createdAt: Date
      prNumber: number | null
    }, ExtArgs["result"]["testRun"]>
    composites: {}
  }

  type TestRunGetPayload<S extends boolean | null | undefined | TestRunDefaultArgs> = $Result.GetResult<Prisma.$TestRunPayload, S>

  type TestRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestRunCountAggregateInputType | true
    }

  export interface TestRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestRun'], meta: { name: 'TestRun' } }
    /**
     * Find zero or one TestRun that matches the filter.
     * @param {TestRunFindUniqueArgs} args - Arguments to find a TestRun
     * @example
     * // Get one TestRun
     * const testRun = await prisma.testRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestRunFindUniqueArgs>(args: SelectSubset<T, TestRunFindUniqueArgs<ExtArgs>>): Prisma__TestRunClient<$Result.GetResult<Prisma.$TestRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestRunFindUniqueOrThrowArgs} args - Arguments to find a TestRun
     * @example
     * // Get one TestRun
     * const testRun = await prisma.testRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestRunFindUniqueOrThrowArgs>(args: SelectSubset<T, TestRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestRunClient<$Result.GetResult<Prisma.$TestRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestRunFindFirstArgs} args - Arguments to find a TestRun
     * @example
     * // Get one TestRun
     * const testRun = await prisma.testRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestRunFindFirstArgs>(args?: SelectSubset<T, TestRunFindFirstArgs<ExtArgs>>): Prisma__TestRunClient<$Result.GetResult<Prisma.$TestRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestRunFindFirstOrThrowArgs} args - Arguments to find a TestRun
     * @example
     * // Get one TestRun
     * const testRun = await prisma.testRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestRunFindFirstOrThrowArgs>(args?: SelectSubset<T, TestRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestRunClient<$Result.GetResult<Prisma.$TestRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestRuns
     * const testRuns = await prisma.testRun.findMany()
     * 
     * // Get first 10 TestRuns
     * const testRuns = await prisma.testRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testRunWithIdOnly = await prisma.testRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestRunFindManyArgs>(args?: SelectSubset<T, TestRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestRun.
     * @param {TestRunCreateArgs} args - Arguments to create a TestRun.
     * @example
     * // Create one TestRun
     * const TestRun = await prisma.testRun.create({
     *   data: {
     *     // ... data to create a TestRun
     *   }
     * })
     * 
     */
    create<T extends TestRunCreateArgs>(args: SelectSubset<T, TestRunCreateArgs<ExtArgs>>): Prisma__TestRunClient<$Result.GetResult<Prisma.$TestRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestRuns.
     * @param {TestRunCreateManyArgs} args - Arguments to create many TestRuns.
     * @example
     * // Create many TestRuns
     * const testRun = await prisma.testRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestRunCreateManyArgs>(args?: SelectSubset<T, TestRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TestRun.
     * @param {TestRunDeleteArgs} args - Arguments to delete one TestRun.
     * @example
     * // Delete one TestRun
     * const TestRun = await prisma.testRun.delete({
     *   where: {
     *     // ... filter to delete one TestRun
     *   }
     * })
     * 
     */
    delete<T extends TestRunDeleteArgs>(args: SelectSubset<T, TestRunDeleteArgs<ExtArgs>>): Prisma__TestRunClient<$Result.GetResult<Prisma.$TestRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestRun.
     * @param {TestRunUpdateArgs} args - Arguments to update one TestRun.
     * @example
     * // Update one TestRun
     * const testRun = await prisma.testRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestRunUpdateArgs>(args: SelectSubset<T, TestRunUpdateArgs<ExtArgs>>): Prisma__TestRunClient<$Result.GetResult<Prisma.$TestRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestRuns.
     * @param {TestRunDeleteManyArgs} args - Arguments to filter TestRuns to delete.
     * @example
     * // Delete a few TestRuns
     * const { count } = await prisma.testRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestRunDeleteManyArgs>(args?: SelectSubset<T, TestRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestRuns
     * const testRun = await prisma.testRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestRunUpdateManyArgs>(args: SelectSubset<T, TestRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TestRun.
     * @param {TestRunUpsertArgs} args - Arguments to update or create a TestRun.
     * @example
     * // Update or create a TestRun
     * const testRun = await prisma.testRun.upsert({
     *   create: {
     *     // ... data to create a TestRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestRun we want to update
     *   }
     * })
     */
    upsert<T extends TestRunUpsertArgs>(args: SelectSubset<T, TestRunUpsertArgs<ExtArgs>>): Prisma__TestRunClient<$Result.GetResult<Prisma.$TestRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestRunCountArgs} args - Arguments to filter TestRuns to count.
     * @example
     * // Count the number of TestRuns
     * const count = await prisma.testRun.count({
     *   where: {
     *     // ... the filter for the TestRuns we want to count
     *   }
     * })
    **/
    count<T extends TestRunCountArgs>(
      args?: Subset<T, TestRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestRunAggregateArgs>(args: Subset<T, TestRunAggregateArgs>): Prisma.PrismaPromise<GetTestRunAggregateType<T>>

    /**
     * Group by TestRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestRunGroupByArgs['orderBy'] }
        : { orderBy?: TestRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestRun model
   */
  readonly fields: TestRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    testResults<T extends TestRun$testResultsArgs<ExtArgs> = {}>(args?: Subset<T, TestRun$testResultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestRun model
   */
  interface TestRunFieldRefs {
    readonly id: FieldRef<"TestRun", 'Int'>
    readonly githubRunId: FieldRef<"TestRun", 'String'>
    readonly commitSha: FieldRef<"TestRun", 'String'>
    readonly developer: FieldRef<"TestRun", 'String'>
    readonly branch: FieldRef<"TestRun", 'String'>
    readonly status: FieldRef<"TestRun", 'String'>
    readonly event: FieldRef<"TestRun", 'String'>
    readonly repository: FieldRef<"TestRun", 'String'>
    readonly startedAt: FieldRef<"TestRun", 'DateTime'>
    readonly createdAt: FieldRef<"TestRun", 'DateTime'>
    readonly prNumber: FieldRef<"TestRun", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TestRun findUnique
   */
  export type TestRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestRun
     */
    select?: TestRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestRun
     */
    omit?: TestRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestRunInclude<ExtArgs> | null
    /**
     * Filter, which TestRun to fetch.
     */
    where: TestRunWhereUniqueInput
  }

  /**
   * TestRun findUniqueOrThrow
   */
  export type TestRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestRun
     */
    select?: TestRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestRun
     */
    omit?: TestRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestRunInclude<ExtArgs> | null
    /**
     * Filter, which TestRun to fetch.
     */
    where: TestRunWhereUniqueInput
  }

  /**
   * TestRun findFirst
   */
  export type TestRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestRun
     */
    select?: TestRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestRun
     */
    omit?: TestRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestRunInclude<ExtArgs> | null
    /**
     * Filter, which TestRun to fetch.
     */
    where?: TestRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestRuns to fetch.
     */
    orderBy?: TestRunOrderByWithRelationInput | TestRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestRuns.
     */
    cursor?: TestRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestRuns.
     */
    distinct?: TestRunScalarFieldEnum | TestRunScalarFieldEnum[]
  }

  /**
   * TestRun findFirstOrThrow
   */
  export type TestRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestRun
     */
    select?: TestRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestRun
     */
    omit?: TestRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestRunInclude<ExtArgs> | null
    /**
     * Filter, which TestRun to fetch.
     */
    where?: TestRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestRuns to fetch.
     */
    orderBy?: TestRunOrderByWithRelationInput | TestRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestRuns.
     */
    cursor?: TestRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestRuns.
     */
    distinct?: TestRunScalarFieldEnum | TestRunScalarFieldEnum[]
  }

  /**
   * TestRun findMany
   */
  export type TestRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestRun
     */
    select?: TestRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestRun
     */
    omit?: TestRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestRunInclude<ExtArgs> | null
    /**
     * Filter, which TestRuns to fetch.
     */
    where?: TestRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestRuns to fetch.
     */
    orderBy?: TestRunOrderByWithRelationInput | TestRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestRuns.
     */
    cursor?: TestRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestRuns.
     */
    distinct?: TestRunScalarFieldEnum | TestRunScalarFieldEnum[]
  }

  /**
   * TestRun create
   */
  export type TestRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestRun
     */
    select?: TestRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestRun
     */
    omit?: TestRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestRunInclude<ExtArgs> | null
    /**
     * The data needed to create a TestRun.
     */
    data: XOR<TestRunCreateInput, TestRunUncheckedCreateInput>
  }

  /**
   * TestRun createMany
   */
  export type TestRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestRuns.
     */
    data: TestRunCreateManyInput | TestRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestRun update
   */
  export type TestRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestRun
     */
    select?: TestRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestRun
     */
    omit?: TestRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestRunInclude<ExtArgs> | null
    /**
     * The data needed to update a TestRun.
     */
    data: XOR<TestRunUpdateInput, TestRunUncheckedUpdateInput>
    /**
     * Choose, which TestRun to update.
     */
    where: TestRunWhereUniqueInput
  }

  /**
   * TestRun updateMany
   */
  export type TestRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestRuns.
     */
    data: XOR<TestRunUpdateManyMutationInput, TestRunUncheckedUpdateManyInput>
    /**
     * Filter which TestRuns to update
     */
    where?: TestRunWhereInput
    /**
     * Limit how many TestRuns to update.
     */
    limit?: number
  }

  /**
   * TestRun upsert
   */
  export type TestRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestRun
     */
    select?: TestRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestRun
     */
    omit?: TestRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestRunInclude<ExtArgs> | null
    /**
     * The filter to search for the TestRun to update in case it exists.
     */
    where: TestRunWhereUniqueInput
    /**
     * In case the TestRun found by the `where` argument doesn't exist, create a new TestRun with this data.
     */
    create: XOR<TestRunCreateInput, TestRunUncheckedCreateInput>
    /**
     * In case the TestRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestRunUpdateInput, TestRunUncheckedUpdateInput>
  }

  /**
   * TestRun delete
   */
  export type TestRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestRun
     */
    select?: TestRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestRun
     */
    omit?: TestRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestRunInclude<ExtArgs> | null
    /**
     * Filter which TestRun to delete.
     */
    where: TestRunWhereUniqueInput
  }

  /**
   * TestRun deleteMany
   */
  export type TestRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestRuns to delete
     */
    where?: TestRunWhereInput
    /**
     * Limit how many TestRuns to delete.
     */
    limit?: number
  }

  /**
   * TestRun.testResults
   */
  export type TestRun$testResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResult
     */
    select?: TestResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResult
     */
    omit?: TestResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultInclude<ExtArgs> | null
    where?: TestResultWhereInput
    orderBy?: TestResultOrderByWithRelationInput | TestResultOrderByWithRelationInput[]
    cursor?: TestResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestResultScalarFieldEnum | TestResultScalarFieldEnum[]
  }

  /**
   * TestRun without action
   */
  export type TestRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestRun
     */
    select?: TestRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestRun
     */
    omit?: TestRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestRunInclude<ExtArgs> | null
  }


  /**
   * Model TestResult
   */

  export type AggregateTestResult = {
    _count: TestResultCountAggregateOutputType | null
    _avg: TestResultAvgAggregateOutputType | null
    _sum: TestResultSumAggregateOutputType | null
    _min: TestResultMinAggregateOutputType | null
    _max: TestResultMaxAggregateOutputType | null
  }

  export type TestResultAvgAggregateOutputType = {
    id: number | null
    testRunId: number | null
    durationMs: number | null
  }

  export type TestResultSumAggregateOutputType = {
    id: number | null
    testRunId: number | null
    durationMs: number | null
  }

  export type TestResultMinAggregateOutputType = {
    id: number | null
    testRunId: number | null
    testName: string | null
    fileName: string | null
    status: string | null
    durationMs: number | null
    error: string | null
    screenshot: string | null
    video: string | null
    trace: string | null
    createdAt: Date | null
  }

  export type TestResultMaxAggregateOutputType = {
    id: number | null
    testRunId: number | null
    testName: string | null
    fileName: string | null
    status: string | null
    durationMs: number | null
    error: string | null
    screenshot: string | null
    video: string | null
    trace: string | null
    createdAt: Date | null
  }

  export type TestResultCountAggregateOutputType = {
    id: number
    testRunId: number
    testName: number
    fileName: number
    status: number
    durationMs: number
    error: number
    screenshot: number
    video: number
    trace: number
    createdAt: number
    _all: number
  }


  export type TestResultAvgAggregateInputType = {
    id?: true
    testRunId?: true
    durationMs?: true
  }

  export type TestResultSumAggregateInputType = {
    id?: true
    testRunId?: true
    durationMs?: true
  }

  export type TestResultMinAggregateInputType = {
    id?: true
    testRunId?: true
    testName?: true
    fileName?: true
    status?: true
    durationMs?: true
    error?: true
    screenshot?: true
    video?: true
    trace?: true
    createdAt?: true
  }

  export type TestResultMaxAggregateInputType = {
    id?: true
    testRunId?: true
    testName?: true
    fileName?: true
    status?: true
    durationMs?: true
    error?: true
    screenshot?: true
    video?: true
    trace?: true
    createdAt?: true
  }

  export type TestResultCountAggregateInputType = {
    id?: true
    testRunId?: true
    testName?: true
    fileName?: true
    status?: true
    durationMs?: true
    error?: true
    screenshot?: true
    video?: true
    trace?: true
    createdAt?: true
    _all?: true
  }

  export type TestResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestResult to aggregate.
     */
    where?: TestResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResults to fetch.
     */
    orderBy?: TestResultOrderByWithRelationInput | TestResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestResults
    **/
    _count?: true | TestResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestResultMaxAggregateInputType
  }

  export type GetTestResultAggregateType<T extends TestResultAggregateArgs> = {
        [P in keyof T & keyof AggregateTestResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestResult[P]>
      : GetScalarType<T[P], AggregateTestResult[P]>
  }




  export type TestResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestResultWhereInput
    orderBy?: TestResultOrderByWithAggregationInput | TestResultOrderByWithAggregationInput[]
    by: TestResultScalarFieldEnum[] | TestResultScalarFieldEnum
    having?: TestResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestResultCountAggregateInputType | true
    _avg?: TestResultAvgAggregateInputType
    _sum?: TestResultSumAggregateInputType
    _min?: TestResultMinAggregateInputType
    _max?: TestResultMaxAggregateInputType
  }

  export type TestResultGroupByOutputType = {
    id: number
    testRunId: number
    testName: string
    fileName: string | null
    status: string
    durationMs: number | null
    error: string | null
    screenshot: string | null
    video: string | null
    trace: string | null
    createdAt: Date
    _count: TestResultCountAggregateOutputType | null
    _avg: TestResultAvgAggregateOutputType | null
    _sum: TestResultSumAggregateOutputType | null
    _min: TestResultMinAggregateOutputType | null
    _max: TestResultMaxAggregateOutputType | null
  }

  type GetTestResultGroupByPayload<T extends TestResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestResultGroupByOutputType[P]>
            : GetScalarType<T[P], TestResultGroupByOutputType[P]>
        }
      >
    >


  export type TestResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testRunId?: boolean
    testName?: boolean
    fileName?: boolean
    status?: boolean
    durationMs?: boolean
    error?: boolean
    screenshot?: boolean
    video?: boolean
    trace?: boolean
    createdAt?: boolean
    testRun?: boolean | TestRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testResult"]>



  export type TestResultSelectScalar = {
    id?: boolean
    testRunId?: boolean
    testName?: boolean
    fileName?: boolean
    status?: boolean
    durationMs?: boolean
    error?: boolean
    screenshot?: boolean
    video?: boolean
    trace?: boolean
    createdAt?: boolean
  }

  export type TestResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "testRunId" | "testName" | "fileName" | "status" | "durationMs" | "error" | "screenshot" | "video" | "trace" | "createdAt", ExtArgs["result"]["testResult"]>
  export type TestResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testRun?: boolean | TestRunDefaultArgs<ExtArgs>
  }

  export type $TestResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestResult"
    objects: {
      testRun: Prisma.$TestRunPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      testRunId: number
      testName: string
      fileName: string | null
      status: string
      durationMs: number | null
      error: string | null
      screenshot: string | null
      video: string | null
      trace: string | null
      createdAt: Date
    }, ExtArgs["result"]["testResult"]>
    composites: {}
  }

  type TestResultGetPayload<S extends boolean | null | undefined | TestResultDefaultArgs> = $Result.GetResult<Prisma.$TestResultPayload, S>

  type TestResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestResultCountAggregateInputType | true
    }

  export interface TestResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestResult'], meta: { name: 'TestResult' } }
    /**
     * Find zero or one TestResult that matches the filter.
     * @param {TestResultFindUniqueArgs} args - Arguments to find a TestResult
     * @example
     * // Get one TestResult
     * const testResult = await prisma.testResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestResultFindUniqueArgs>(args: SelectSubset<T, TestResultFindUniqueArgs<ExtArgs>>): Prisma__TestResultClient<$Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestResultFindUniqueOrThrowArgs} args - Arguments to find a TestResult
     * @example
     * // Get one TestResult
     * const testResult = await prisma.testResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestResultFindUniqueOrThrowArgs>(args: SelectSubset<T, TestResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestResultClient<$Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultFindFirstArgs} args - Arguments to find a TestResult
     * @example
     * // Get one TestResult
     * const testResult = await prisma.testResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestResultFindFirstArgs>(args?: SelectSubset<T, TestResultFindFirstArgs<ExtArgs>>): Prisma__TestResultClient<$Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultFindFirstOrThrowArgs} args - Arguments to find a TestResult
     * @example
     * // Get one TestResult
     * const testResult = await prisma.testResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestResultFindFirstOrThrowArgs>(args?: SelectSubset<T, TestResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestResultClient<$Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestResults
     * const testResults = await prisma.testResult.findMany()
     * 
     * // Get first 10 TestResults
     * const testResults = await prisma.testResult.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testResultWithIdOnly = await prisma.testResult.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestResultFindManyArgs>(args?: SelectSubset<T, TestResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestResult.
     * @param {TestResultCreateArgs} args - Arguments to create a TestResult.
     * @example
     * // Create one TestResult
     * const TestResult = await prisma.testResult.create({
     *   data: {
     *     // ... data to create a TestResult
     *   }
     * })
     * 
     */
    create<T extends TestResultCreateArgs>(args: SelectSubset<T, TestResultCreateArgs<ExtArgs>>): Prisma__TestResultClient<$Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestResults.
     * @param {TestResultCreateManyArgs} args - Arguments to create many TestResults.
     * @example
     * // Create many TestResults
     * const testResult = await prisma.testResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestResultCreateManyArgs>(args?: SelectSubset<T, TestResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TestResult.
     * @param {TestResultDeleteArgs} args - Arguments to delete one TestResult.
     * @example
     * // Delete one TestResult
     * const TestResult = await prisma.testResult.delete({
     *   where: {
     *     // ... filter to delete one TestResult
     *   }
     * })
     * 
     */
    delete<T extends TestResultDeleteArgs>(args: SelectSubset<T, TestResultDeleteArgs<ExtArgs>>): Prisma__TestResultClient<$Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestResult.
     * @param {TestResultUpdateArgs} args - Arguments to update one TestResult.
     * @example
     * // Update one TestResult
     * const testResult = await prisma.testResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestResultUpdateArgs>(args: SelectSubset<T, TestResultUpdateArgs<ExtArgs>>): Prisma__TestResultClient<$Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestResults.
     * @param {TestResultDeleteManyArgs} args - Arguments to filter TestResults to delete.
     * @example
     * // Delete a few TestResults
     * const { count } = await prisma.testResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestResultDeleteManyArgs>(args?: SelectSubset<T, TestResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestResults
     * const testResult = await prisma.testResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestResultUpdateManyArgs>(args: SelectSubset<T, TestResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TestResult.
     * @param {TestResultUpsertArgs} args - Arguments to update or create a TestResult.
     * @example
     * // Update or create a TestResult
     * const testResult = await prisma.testResult.upsert({
     *   create: {
     *     // ... data to create a TestResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestResult we want to update
     *   }
     * })
     */
    upsert<T extends TestResultUpsertArgs>(args: SelectSubset<T, TestResultUpsertArgs<ExtArgs>>): Prisma__TestResultClient<$Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultCountArgs} args - Arguments to filter TestResults to count.
     * @example
     * // Count the number of TestResults
     * const count = await prisma.testResult.count({
     *   where: {
     *     // ... the filter for the TestResults we want to count
     *   }
     * })
    **/
    count<T extends TestResultCountArgs>(
      args?: Subset<T, TestResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestResultAggregateArgs>(args: Subset<T, TestResultAggregateArgs>): Prisma.PrismaPromise<GetTestResultAggregateType<T>>

    /**
     * Group by TestResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestResultGroupByArgs['orderBy'] }
        : { orderBy?: TestResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestResult model
   */
  readonly fields: TestResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    testRun<T extends TestRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestRunDefaultArgs<ExtArgs>>): Prisma__TestRunClient<$Result.GetResult<Prisma.$TestRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestResult model
   */
  interface TestResultFieldRefs {
    readonly id: FieldRef<"TestResult", 'Int'>
    readonly testRunId: FieldRef<"TestResult", 'Int'>
    readonly testName: FieldRef<"TestResult", 'String'>
    readonly fileName: FieldRef<"TestResult", 'String'>
    readonly status: FieldRef<"TestResult", 'String'>
    readonly durationMs: FieldRef<"TestResult", 'Int'>
    readonly error: FieldRef<"TestResult", 'String'>
    readonly screenshot: FieldRef<"TestResult", 'String'>
    readonly video: FieldRef<"TestResult", 'String'>
    readonly trace: FieldRef<"TestResult", 'String'>
    readonly createdAt: FieldRef<"TestResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TestResult findUnique
   */
  export type TestResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResult
     */
    select?: TestResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResult
     */
    omit?: TestResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultInclude<ExtArgs> | null
    /**
     * Filter, which TestResult to fetch.
     */
    where: TestResultWhereUniqueInput
  }

  /**
   * TestResult findUniqueOrThrow
   */
  export type TestResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResult
     */
    select?: TestResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResult
     */
    omit?: TestResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultInclude<ExtArgs> | null
    /**
     * Filter, which TestResult to fetch.
     */
    where: TestResultWhereUniqueInput
  }

  /**
   * TestResult findFirst
   */
  export type TestResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResult
     */
    select?: TestResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResult
     */
    omit?: TestResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultInclude<ExtArgs> | null
    /**
     * Filter, which TestResult to fetch.
     */
    where?: TestResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResults to fetch.
     */
    orderBy?: TestResultOrderByWithRelationInput | TestResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestResults.
     */
    cursor?: TestResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestResults.
     */
    distinct?: TestResultScalarFieldEnum | TestResultScalarFieldEnum[]
  }

  /**
   * TestResult findFirstOrThrow
   */
  export type TestResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResult
     */
    select?: TestResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResult
     */
    omit?: TestResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultInclude<ExtArgs> | null
    /**
     * Filter, which TestResult to fetch.
     */
    where?: TestResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResults to fetch.
     */
    orderBy?: TestResultOrderByWithRelationInput | TestResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestResults.
     */
    cursor?: TestResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestResults.
     */
    distinct?: TestResultScalarFieldEnum | TestResultScalarFieldEnum[]
  }

  /**
   * TestResult findMany
   */
  export type TestResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResult
     */
    select?: TestResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResult
     */
    omit?: TestResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultInclude<ExtArgs> | null
    /**
     * Filter, which TestResults to fetch.
     */
    where?: TestResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestResults to fetch.
     */
    orderBy?: TestResultOrderByWithRelationInput | TestResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestResults.
     */
    cursor?: TestResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestResults.
     */
    distinct?: TestResultScalarFieldEnum | TestResultScalarFieldEnum[]
  }

  /**
   * TestResult create
   */
  export type TestResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResult
     */
    select?: TestResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResult
     */
    omit?: TestResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultInclude<ExtArgs> | null
    /**
     * The data needed to create a TestResult.
     */
    data: XOR<TestResultCreateInput, TestResultUncheckedCreateInput>
  }

  /**
   * TestResult createMany
   */
  export type TestResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestResults.
     */
    data: TestResultCreateManyInput | TestResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestResult update
   */
  export type TestResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResult
     */
    select?: TestResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResult
     */
    omit?: TestResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultInclude<ExtArgs> | null
    /**
     * The data needed to update a TestResult.
     */
    data: XOR<TestResultUpdateInput, TestResultUncheckedUpdateInput>
    /**
     * Choose, which TestResult to update.
     */
    where: TestResultWhereUniqueInput
  }

  /**
   * TestResult updateMany
   */
  export type TestResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestResults.
     */
    data: XOR<TestResultUpdateManyMutationInput, TestResultUncheckedUpdateManyInput>
    /**
     * Filter which TestResults to update
     */
    where?: TestResultWhereInput
    /**
     * Limit how many TestResults to update.
     */
    limit?: number
  }

  /**
   * TestResult upsert
   */
  export type TestResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResult
     */
    select?: TestResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResult
     */
    omit?: TestResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultInclude<ExtArgs> | null
    /**
     * The filter to search for the TestResult to update in case it exists.
     */
    where: TestResultWhereUniqueInput
    /**
     * In case the TestResult found by the `where` argument doesn't exist, create a new TestResult with this data.
     */
    create: XOR<TestResultCreateInput, TestResultUncheckedCreateInput>
    /**
     * In case the TestResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestResultUpdateInput, TestResultUncheckedUpdateInput>
  }

  /**
   * TestResult delete
   */
  export type TestResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResult
     */
    select?: TestResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResult
     */
    omit?: TestResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultInclude<ExtArgs> | null
    /**
     * Filter which TestResult to delete.
     */
    where: TestResultWhereUniqueInput
  }

  /**
   * TestResult deleteMany
   */
  export type TestResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestResults to delete
     */
    where?: TestResultWhereInput
    /**
     * Limit how many TestResults to delete.
     */
    limit?: number
  }

  /**
   * TestResult without action
   */
  export type TestResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestResult
     */
    select?: TestResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestResult
     */
    omit?: TestResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestResultInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TestRunScalarFieldEnum: {
    id: 'id',
    githubRunId: 'githubRunId',
    commitSha: 'commitSha',
    developer: 'developer',
    branch: 'branch',
    status: 'status',
    event: 'event',
    repository: 'repository',
    startedAt: 'startedAt',
    createdAt: 'createdAt',
    prNumber: 'prNumber'
  };

  export type TestRunScalarFieldEnum = (typeof TestRunScalarFieldEnum)[keyof typeof TestRunScalarFieldEnum]


  export const TestResultScalarFieldEnum: {
    id: 'id',
    testRunId: 'testRunId',
    testName: 'testName',
    fileName: 'fileName',
    status: 'status',
    durationMs: 'durationMs',
    error: 'error',
    screenshot: 'screenshot',
    video: 'video',
    trace: 'trace',
    createdAt: 'createdAt'
  };

  export type TestResultScalarFieldEnum = (typeof TestResultScalarFieldEnum)[keyof typeof TestResultScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const TestRunOrderByRelevanceFieldEnum: {
    githubRunId: 'githubRunId',
    commitSha: 'commitSha',
    developer: 'developer',
    branch: 'branch',
    status: 'status',
    event: 'event',
    repository: 'repository'
  };

  export type TestRunOrderByRelevanceFieldEnum = (typeof TestRunOrderByRelevanceFieldEnum)[keyof typeof TestRunOrderByRelevanceFieldEnum]


  export const TestResultOrderByRelevanceFieldEnum: {
    testName: 'testName',
    fileName: 'fileName',
    status: 'status',
    error: 'error',
    screenshot: 'screenshot',
    video: 'video',
    trace: 'trace'
  };

  export type TestResultOrderByRelevanceFieldEnum = (typeof TestResultOrderByRelevanceFieldEnum)[keyof typeof TestResultOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type TestRunWhereInput = {
    AND?: TestRunWhereInput | TestRunWhereInput[]
    OR?: TestRunWhereInput[]
    NOT?: TestRunWhereInput | TestRunWhereInput[]
    id?: IntFilter<"TestRun"> | number
    githubRunId?: StringFilter<"TestRun"> | string
    commitSha?: StringFilter<"TestRun"> | string
    developer?: StringFilter<"TestRun"> | string
    branch?: StringNullableFilter<"TestRun"> | string | null
    status?: StringFilter<"TestRun"> | string
    event?: StringNullableFilter<"TestRun"> | string | null
    repository?: StringFilter<"TestRun"> | string
    startedAt?: DateTimeFilter<"TestRun"> | Date | string
    createdAt?: DateTimeFilter<"TestRun"> | Date | string
    prNumber?: IntNullableFilter<"TestRun"> | number | null
    testResults?: TestResultListRelationFilter
  }

  export type TestRunOrderByWithRelationInput = {
    id?: SortOrder
    githubRunId?: SortOrder
    commitSha?: SortOrder
    developer?: SortOrder
    branch?: SortOrderInput | SortOrder
    status?: SortOrder
    event?: SortOrderInput | SortOrder
    repository?: SortOrder
    startedAt?: SortOrder
    createdAt?: SortOrder
    prNumber?: SortOrderInput | SortOrder
    testResults?: TestResultOrderByRelationAggregateInput
    _relevance?: TestRunOrderByRelevanceInput
  }

  export type TestRunWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    githubRunId?: string
    AND?: TestRunWhereInput | TestRunWhereInput[]
    OR?: TestRunWhereInput[]
    NOT?: TestRunWhereInput | TestRunWhereInput[]
    commitSha?: StringFilter<"TestRun"> | string
    developer?: StringFilter<"TestRun"> | string
    branch?: StringNullableFilter<"TestRun"> | string | null
    status?: StringFilter<"TestRun"> | string
    event?: StringNullableFilter<"TestRun"> | string | null
    repository?: StringFilter<"TestRun"> | string
    startedAt?: DateTimeFilter<"TestRun"> | Date | string
    createdAt?: DateTimeFilter<"TestRun"> | Date | string
    prNumber?: IntNullableFilter<"TestRun"> | number | null
    testResults?: TestResultListRelationFilter
  }, "id" | "githubRunId">

  export type TestRunOrderByWithAggregationInput = {
    id?: SortOrder
    githubRunId?: SortOrder
    commitSha?: SortOrder
    developer?: SortOrder
    branch?: SortOrderInput | SortOrder
    status?: SortOrder
    event?: SortOrderInput | SortOrder
    repository?: SortOrder
    startedAt?: SortOrder
    createdAt?: SortOrder
    prNumber?: SortOrderInput | SortOrder
    _count?: TestRunCountOrderByAggregateInput
    _avg?: TestRunAvgOrderByAggregateInput
    _max?: TestRunMaxOrderByAggregateInput
    _min?: TestRunMinOrderByAggregateInput
    _sum?: TestRunSumOrderByAggregateInput
  }

  export type TestRunScalarWhereWithAggregatesInput = {
    AND?: TestRunScalarWhereWithAggregatesInput | TestRunScalarWhereWithAggregatesInput[]
    OR?: TestRunScalarWhereWithAggregatesInput[]
    NOT?: TestRunScalarWhereWithAggregatesInput | TestRunScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TestRun"> | number
    githubRunId?: StringWithAggregatesFilter<"TestRun"> | string
    commitSha?: StringWithAggregatesFilter<"TestRun"> | string
    developer?: StringWithAggregatesFilter<"TestRun"> | string
    branch?: StringNullableWithAggregatesFilter<"TestRun"> | string | null
    status?: StringWithAggregatesFilter<"TestRun"> | string
    event?: StringNullableWithAggregatesFilter<"TestRun"> | string | null
    repository?: StringWithAggregatesFilter<"TestRun"> | string
    startedAt?: DateTimeWithAggregatesFilter<"TestRun"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"TestRun"> | Date | string
    prNumber?: IntNullableWithAggregatesFilter<"TestRun"> | number | null
  }

  export type TestResultWhereInput = {
    AND?: TestResultWhereInput | TestResultWhereInput[]
    OR?: TestResultWhereInput[]
    NOT?: TestResultWhereInput | TestResultWhereInput[]
    id?: IntFilter<"TestResult"> | number
    testRunId?: IntFilter<"TestResult"> | number
    testName?: StringFilter<"TestResult"> | string
    fileName?: StringNullableFilter<"TestResult"> | string | null
    status?: StringFilter<"TestResult"> | string
    durationMs?: IntNullableFilter<"TestResult"> | number | null
    error?: StringNullableFilter<"TestResult"> | string | null
    screenshot?: StringNullableFilter<"TestResult"> | string | null
    video?: StringNullableFilter<"TestResult"> | string | null
    trace?: StringNullableFilter<"TestResult"> | string | null
    createdAt?: DateTimeFilter<"TestResult"> | Date | string
    testRun?: XOR<TestRunScalarRelationFilter, TestRunWhereInput>
  }

  export type TestResultOrderByWithRelationInput = {
    id?: SortOrder
    testRunId?: SortOrder
    testName?: SortOrder
    fileName?: SortOrderInput | SortOrder
    status?: SortOrder
    durationMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    screenshot?: SortOrderInput | SortOrder
    video?: SortOrderInput | SortOrder
    trace?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    testRun?: TestRunOrderByWithRelationInput
    _relevance?: TestResultOrderByRelevanceInput
  }

  export type TestResultWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TestResultWhereInput | TestResultWhereInput[]
    OR?: TestResultWhereInput[]
    NOT?: TestResultWhereInput | TestResultWhereInput[]
    testRunId?: IntFilter<"TestResult"> | number
    testName?: StringFilter<"TestResult"> | string
    fileName?: StringNullableFilter<"TestResult"> | string | null
    status?: StringFilter<"TestResult"> | string
    durationMs?: IntNullableFilter<"TestResult"> | number | null
    error?: StringNullableFilter<"TestResult"> | string | null
    screenshot?: StringNullableFilter<"TestResult"> | string | null
    video?: StringNullableFilter<"TestResult"> | string | null
    trace?: StringNullableFilter<"TestResult"> | string | null
    createdAt?: DateTimeFilter<"TestResult"> | Date | string
    testRun?: XOR<TestRunScalarRelationFilter, TestRunWhereInput>
  }, "id">

  export type TestResultOrderByWithAggregationInput = {
    id?: SortOrder
    testRunId?: SortOrder
    testName?: SortOrder
    fileName?: SortOrderInput | SortOrder
    status?: SortOrder
    durationMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    screenshot?: SortOrderInput | SortOrder
    video?: SortOrderInput | SortOrder
    trace?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TestResultCountOrderByAggregateInput
    _avg?: TestResultAvgOrderByAggregateInput
    _max?: TestResultMaxOrderByAggregateInput
    _min?: TestResultMinOrderByAggregateInput
    _sum?: TestResultSumOrderByAggregateInput
  }

  export type TestResultScalarWhereWithAggregatesInput = {
    AND?: TestResultScalarWhereWithAggregatesInput | TestResultScalarWhereWithAggregatesInput[]
    OR?: TestResultScalarWhereWithAggregatesInput[]
    NOT?: TestResultScalarWhereWithAggregatesInput | TestResultScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TestResult"> | number
    testRunId?: IntWithAggregatesFilter<"TestResult"> | number
    testName?: StringWithAggregatesFilter<"TestResult"> | string
    fileName?: StringNullableWithAggregatesFilter<"TestResult"> | string | null
    status?: StringWithAggregatesFilter<"TestResult"> | string
    durationMs?: IntNullableWithAggregatesFilter<"TestResult"> | number | null
    error?: StringNullableWithAggregatesFilter<"TestResult"> | string | null
    screenshot?: StringNullableWithAggregatesFilter<"TestResult"> | string | null
    video?: StringNullableWithAggregatesFilter<"TestResult"> | string | null
    trace?: StringNullableWithAggregatesFilter<"TestResult"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"TestResult"> | Date | string
  }

  export type TestRunCreateInput = {
    githubRunId: string
    commitSha: string
    developer: string
    branch?: string | null
    status: string
    event?: string | null
    repository: string
    startedAt?: Date | string
    createdAt?: Date | string
    prNumber?: number | null
    testResults?: TestResultCreateNestedManyWithoutTestRunInput
  }

  export type TestRunUncheckedCreateInput = {
    id?: number
    githubRunId: string
    commitSha: string
    developer: string
    branch?: string | null
    status: string
    event?: string | null
    repository: string
    startedAt?: Date | string
    createdAt?: Date | string
    prNumber?: number | null
    testResults?: TestResultUncheckedCreateNestedManyWithoutTestRunInput
  }

  export type TestRunUpdateInput = {
    githubRunId?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    developer?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    event?: NullableStringFieldUpdateOperationsInput | string | null
    repository?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prNumber?: NullableIntFieldUpdateOperationsInput | number | null
    testResults?: TestResultUpdateManyWithoutTestRunNestedInput
  }

  export type TestRunUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    githubRunId?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    developer?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    event?: NullableStringFieldUpdateOperationsInput | string | null
    repository?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prNumber?: NullableIntFieldUpdateOperationsInput | number | null
    testResults?: TestResultUncheckedUpdateManyWithoutTestRunNestedInput
  }

  export type TestRunCreateManyInput = {
    id?: number
    githubRunId: string
    commitSha: string
    developer: string
    branch?: string | null
    status: string
    event?: string | null
    repository: string
    startedAt?: Date | string
    createdAt?: Date | string
    prNumber?: number | null
  }

  export type TestRunUpdateManyMutationInput = {
    githubRunId?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    developer?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    event?: NullableStringFieldUpdateOperationsInput | string | null
    repository?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prNumber?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TestRunUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    githubRunId?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    developer?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    event?: NullableStringFieldUpdateOperationsInput | string | null
    repository?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prNumber?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TestResultCreateInput = {
    testName: string
    fileName?: string | null
    status: string
    durationMs?: number | null
    error?: string | null
    screenshot?: string | null
    video?: string | null
    trace?: string | null
    createdAt?: Date | string
    testRun: TestRunCreateNestedOneWithoutTestResultsInput
  }

  export type TestResultUncheckedCreateInput = {
    id?: number
    testRunId: number
    testName: string
    fileName?: string | null
    status: string
    durationMs?: number | null
    error?: string | null
    screenshot?: string | null
    video?: string | null
    trace?: string | null
    createdAt?: Date | string
  }

  export type TestResultUpdateInput = {
    testName?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    trace?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testRun?: TestRunUpdateOneRequiredWithoutTestResultsNestedInput
  }

  export type TestResultUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    testRunId?: IntFieldUpdateOperationsInput | number
    testName?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    trace?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultCreateManyInput = {
    id?: number
    testRunId: number
    testName: string
    fileName?: string | null
    status: string
    durationMs?: number | null
    error?: string | null
    screenshot?: string | null
    video?: string | null
    trace?: string | null
    createdAt?: Date | string
  }

  export type TestResultUpdateManyMutationInput = {
    testName?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    trace?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    testRunId?: IntFieldUpdateOperationsInput | number
    testName?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    trace?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TestResultListRelationFilter = {
    every?: TestResultWhereInput
    some?: TestResultWhereInput
    none?: TestResultWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TestResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestRunOrderByRelevanceInput = {
    fields: TestRunOrderByRelevanceFieldEnum | TestRunOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TestRunCountOrderByAggregateInput = {
    id?: SortOrder
    githubRunId?: SortOrder
    commitSha?: SortOrder
    developer?: SortOrder
    branch?: SortOrder
    status?: SortOrder
    event?: SortOrder
    repository?: SortOrder
    startedAt?: SortOrder
    createdAt?: SortOrder
    prNumber?: SortOrder
  }

  export type TestRunAvgOrderByAggregateInput = {
    id?: SortOrder
    prNumber?: SortOrder
  }

  export type TestRunMaxOrderByAggregateInput = {
    id?: SortOrder
    githubRunId?: SortOrder
    commitSha?: SortOrder
    developer?: SortOrder
    branch?: SortOrder
    status?: SortOrder
    event?: SortOrder
    repository?: SortOrder
    startedAt?: SortOrder
    createdAt?: SortOrder
    prNumber?: SortOrder
  }

  export type TestRunMinOrderByAggregateInput = {
    id?: SortOrder
    githubRunId?: SortOrder
    commitSha?: SortOrder
    developer?: SortOrder
    branch?: SortOrder
    status?: SortOrder
    event?: SortOrder
    repository?: SortOrder
    startedAt?: SortOrder
    createdAt?: SortOrder
    prNumber?: SortOrder
  }

  export type TestRunSumOrderByAggregateInput = {
    id?: SortOrder
    prNumber?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TestRunScalarRelationFilter = {
    is?: TestRunWhereInput
    isNot?: TestRunWhereInput
  }

  export type TestResultOrderByRelevanceInput = {
    fields: TestResultOrderByRelevanceFieldEnum | TestResultOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TestResultCountOrderByAggregateInput = {
    id?: SortOrder
    testRunId?: SortOrder
    testName?: SortOrder
    fileName?: SortOrder
    status?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    screenshot?: SortOrder
    video?: SortOrder
    trace?: SortOrder
    createdAt?: SortOrder
  }

  export type TestResultAvgOrderByAggregateInput = {
    id?: SortOrder
    testRunId?: SortOrder
    durationMs?: SortOrder
  }

  export type TestResultMaxOrderByAggregateInput = {
    id?: SortOrder
    testRunId?: SortOrder
    testName?: SortOrder
    fileName?: SortOrder
    status?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    screenshot?: SortOrder
    video?: SortOrder
    trace?: SortOrder
    createdAt?: SortOrder
  }

  export type TestResultMinOrderByAggregateInput = {
    id?: SortOrder
    testRunId?: SortOrder
    testName?: SortOrder
    fileName?: SortOrder
    status?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    screenshot?: SortOrder
    video?: SortOrder
    trace?: SortOrder
    createdAt?: SortOrder
  }

  export type TestResultSumOrderByAggregateInput = {
    id?: SortOrder
    testRunId?: SortOrder
    durationMs?: SortOrder
  }

  export type TestResultCreateNestedManyWithoutTestRunInput = {
    create?: XOR<TestResultCreateWithoutTestRunInput, TestResultUncheckedCreateWithoutTestRunInput> | TestResultCreateWithoutTestRunInput[] | TestResultUncheckedCreateWithoutTestRunInput[]
    connectOrCreate?: TestResultCreateOrConnectWithoutTestRunInput | TestResultCreateOrConnectWithoutTestRunInput[]
    createMany?: TestResultCreateManyTestRunInputEnvelope
    connect?: TestResultWhereUniqueInput | TestResultWhereUniqueInput[]
  }

  export type TestResultUncheckedCreateNestedManyWithoutTestRunInput = {
    create?: XOR<TestResultCreateWithoutTestRunInput, TestResultUncheckedCreateWithoutTestRunInput> | TestResultCreateWithoutTestRunInput[] | TestResultUncheckedCreateWithoutTestRunInput[]
    connectOrCreate?: TestResultCreateOrConnectWithoutTestRunInput | TestResultCreateOrConnectWithoutTestRunInput[]
    createMany?: TestResultCreateManyTestRunInputEnvelope
    connect?: TestResultWhereUniqueInput | TestResultWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TestResultUpdateManyWithoutTestRunNestedInput = {
    create?: XOR<TestResultCreateWithoutTestRunInput, TestResultUncheckedCreateWithoutTestRunInput> | TestResultCreateWithoutTestRunInput[] | TestResultUncheckedCreateWithoutTestRunInput[]
    connectOrCreate?: TestResultCreateOrConnectWithoutTestRunInput | TestResultCreateOrConnectWithoutTestRunInput[]
    upsert?: TestResultUpsertWithWhereUniqueWithoutTestRunInput | TestResultUpsertWithWhereUniqueWithoutTestRunInput[]
    createMany?: TestResultCreateManyTestRunInputEnvelope
    set?: TestResultWhereUniqueInput | TestResultWhereUniqueInput[]
    disconnect?: TestResultWhereUniqueInput | TestResultWhereUniqueInput[]
    delete?: TestResultWhereUniqueInput | TestResultWhereUniqueInput[]
    connect?: TestResultWhereUniqueInput | TestResultWhereUniqueInput[]
    update?: TestResultUpdateWithWhereUniqueWithoutTestRunInput | TestResultUpdateWithWhereUniqueWithoutTestRunInput[]
    updateMany?: TestResultUpdateManyWithWhereWithoutTestRunInput | TestResultUpdateManyWithWhereWithoutTestRunInput[]
    deleteMany?: TestResultScalarWhereInput | TestResultScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TestResultUncheckedUpdateManyWithoutTestRunNestedInput = {
    create?: XOR<TestResultCreateWithoutTestRunInput, TestResultUncheckedCreateWithoutTestRunInput> | TestResultCreateWithoutTestRunInput[] | TestResultUncheckedCreateWithoutTestRunInput[]
    connectOrCreate?: TestResultCreateOrConnectWithoutTestRunInput | TestResultCreateOrConnectWithoutTestRunInput[]
    upsert?: TestResultUpsertWithWhereUniqueWithoutTestRunInput | TestResultUpsertWithWhereUniqueWithoutTestRunInput[]
    createMany?: TestResultCreateManyTestRunInputEnvelope
    set?: TestResultWhereUniqueInput | TestResultWhereUniqueInput[]
    disconnect?: TestResultWhereUniqueInput | TestResultWhereUniqueInput[]
    delete?: TestResultWhereUniqueInput | TestResultWhereUniqueInput[]
    connect?: TestResultWhereUniqueInput | TestResultWhereUniqueInput[]
    update?: TestResultUpdateWithWhereUniqueWithoutTestRunInput | TestResultUpdateWithWhereUniqueWithoutTestRunInput[]
    updateMany?: TestResultUpdateManyWithWhereWithoutTestRunInput | TestResultUpdateManyWithWhereWithoutTestRunInput[]
    deleteMany?: TestResultScalarWhereInput | TestResultScalarWhereInput[]
  }

  export type TestRunCreateNestedOneWithoutTestResultsInput = {
    create?: XOR<TestRunCreateWithoutTestResultsInput, TestRunUncheckedCreateWithoutTestResultsInput>
    connectOrCreate?: TestRunCreateOrConnectWithoutTestResultsInput
    connect?: TestRunWhereUniqueInput
  }

  export type TestRunUpdateOneRequiredWithoutTestResultsNestedInput = {
    create?: XOR<TestRunCreateWithoutTestResultsInput, TestRunUncheckedCreateWithoutTestResultsInput>
    connectOrCreate?: TestRunCreateOrConnectWithoutTestResultsInput
    upsert?: TestRunUpsertWithoutTestResultsInput
    connect?: TestRunWhereUniqueInput
    update?: XOR<XOR<TestRunUpdateToOneWithWhereWithoutTestResultsInput, TestRunUpdateWithoutTestResultsInput>, TestRunUncheckedUpdateWithoutTestResultsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type TestResultCreateWithoutTestRunInput = {
    testName: string
    fileName?: string | null
    status: string
    durationMs?: number | null
    error?: string | null
    screenshot?: string | null
    video?: string | null
    trace?: string | null
    createdAt?: Date | string
  }

  export type TestResultUncheckedCreateWithoutTestRunInput = {
    id?: number
    testName: string
    fileName?: string | null
    status: string
    durationMs?: number | null
    error?: string | null
    screenshot?: string | null
    video?: string | null
    trace?: string | null
    createdAt?: Date | string
  }

  export type TestResultCreateOrConnectWithoutTestRunInput = {
    where: TestResultWhereUniqueInput
    create: XOR<TestResultCreateWithoutTestRunInput, TestResultUncheckedCreateWithoutTestRunInput>
  }

  export type TestResultCreateManyTestRunInputEnvelope = {
    data: TestResultCreateManyTestRunInput | TestResultCreateManyTestRunInput[]
    skipDuplicates?: boolean
  }

  export type TestResultUpsertWithWhereUniqueWithoutTestRunInput = {
    where: TestResultWhereUniqueInput
    update: XOR<TestResultUpdateWithoutTestRunInput, TestResultUncheckedUpdateWithoutTestRunInput>
    create: XOR<TestResultCreateWithoutTestRunInput, TestResultUncheckedCreateWithoutTestRunInput>
  }

  export type TestResultUpdateWithWhereUniqueWithoutTestRunInput = {
    where: TestResultWhereUniqueInput
    data: XOR<TestResultUpdateWithoutTestRunInput, TestResultUncheckedUpdateWithoutTestRunInput>
  }

  export type TestResultUpdateManyWithWhereWithoutTestRunInput = {
    where: TestResultScalarWhereInput
    data: XOR<TestResultUpdateManyMutationInput, TestResultUncheckedUpdateManyWithoutTestRunInput>
  }

  export type TestResultScalarWhereInput = {
    AND?: TestResultScalarWhereInput | TestResultScalarWhereInput[]
    OR?: TestResultScalarWhereInput[]
    NOT?: TestResultScalarWhereInput | TestResultScalarWhereInput[]
    id?: IntFilter<"TestResult"> | number
    testRunId?: IntFilter<"TestResult"> | number
    testName?: StringFilter<"TestResult"> | string
    fileName?: StringNullableFilter<"TestResult"> | string | null
    status?: StringFilter<"TestResult"> | string
    durationMs?: IntNullableFilter<"TestResult"> | number | null
    error?: StringNullableFilter<"TestResult"> | string | null
    screenshot?: StringNullableFilter<"TestResult"> | string | null
    video?: StringNullableFilter<"TestResult"> | string | null
    trace?: StringNullableFilter<"TestResult"> | string | null
    createdAt?: DateTimeFilter<"TestResult"> | Date | string
  }

  export type TestRunCreateWithoutTestResultsInput = {
    githubRunId: string
    commitSha: string
    developer: string
    branch?: string | null
    status: string
    event?: string | null
    repository: string
    startedAt?: Date | string
    createdAt?: Date | string
    prNumber?: number | null
  }

  export type TestRunUncheckedCreateWithoutTestResultsInput = {
    id?: number
    githubRunId: string
    commitSha: string
    developer: string
    branch?: string | null
    status: string
    event?: string | null
    repository: string
    startedAt?: Date | string
    createdAt?: Date | string
    prNumber?: number | null
  }

  export type TestRunCreateOrConnectWithoutTestResultsInput = {
    where: TestRunWhereUniqueInput
    create: XOR<TestRunCreateWithoutTestResultsInput, TestRunUncheckedCreateWithoutTestResultsInput>
  }

  export type TestRunUpsertWithoutTestResultsInput = {
    update: XOR<TestRunUpdateWithoutTestResultsInput, TestRunUncheckedUpdateWithoutTestResultsInput>
    create: XOR<TestRunCreateWithoutTestResultsInput, TestRunUncheckedCreateWithoutTestResultsInput>
    where?: TestRunWhereInput
  }

  export type TestRunUpdateToOneWithWhereWithoutTestResultsInput = {
    where?: TestRunWhereInput
    data: XOR<TestRunUpdateWithoutTestResultsInput, TestRunUncheckedUpdateWithoutTestResultsInput>
  }

  export type TestRunUpdateWithoutTestResultsInput = {
    githubRunId?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    developer?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    event?: NullableStringFieldUpdateOperationsInput | string | null
    repository?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prNumber?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TestRunUncheckedUpdateWithoutTestResultsInput = {
    id?: IntFieldUpdateOperationsInput | number
    githubRunId?: StringFieldUpdateOperationsInput | string
    commitSha?: StringFieldUpdateOperationsInput | string
    developer?: StringFieldUpdateOperationsInput | string
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    event?: NullableStringFieldUpdateOperationsInput | string | null
    repository?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prNumber?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TestResultCreateManyTestRunInput = {
    id?: number
    testName: string
    fileName?: string | null
    status: string
    durationMs?: number | null
    error?: string | null
    screenshot?: string | null
    video?: string | null
    trace?: string | null
    createdAt?: Date | string
  }

  export type TestResultUpdateWithoutTestRunInput = {
    testName?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    trace?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultUncheckedUpdateWithoutTestRunInput = {
    id?: IntFieldUpdateOperationsInput | number
    testName?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    trace?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestResultUncheckedUpdateManyWithoutTestRunInput = {
    id?: IntFieldUpdateOperationsInput | number
    testName?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    screenshot?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    trace?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}