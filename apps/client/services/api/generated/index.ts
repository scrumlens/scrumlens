/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Signin {
  email: string;
  password: string;
}

export interface Signup {
  /** @minLength 3 */
  name: string;
  email: string;
  /** @minLength 6 */
  password: string;
}

export interface SignupGuest {
  /** @minLength 3 */
  name: string;
}

export interface VerifyToken {
  token: string;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface UsersMeResponse {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  isGuest: boolean;
}

export interface BoardAdd {
  title: string;
  columns?: {
    title: string;
    description?: string;
    color?: string;
    noteIds?: string[];
  }[];
  accessPolicy: "public" | "private";
}

export interface BoardUpdate {
  title?: string;
  notes?: string[];
  columns?: {
    title: string;
    description?: string;
    color?: string;
    noteIds?: string[];
  }[];
  participants?: {
    userId: string;
    role: "admin" | "member";
  }[];
  accessPolicy?: "public" | "private";
  isLocked?: boolean;
}

export interface BoardResponse {
  _id: string;
  title: string;
  userId: string;
  participants: {
    role: "admin" | "member";
    userId: string;
    name: string;
  }[];
  notes: {
    _id: string;
    content: string;
    userId: string;
    voteUp: string[];
    voteDown: string[];
    reactions: {
      userId: string;
      emoji:
        | "thinking-face"
        | "loudly-crying-face"
        | "face-with-tears-of-joy"
        | "fire"
        | "party-popper"
        | "pile-of-poo";
    }[];
    comments: string[];
  }[];
  columns: {
    _id: string;
    title: string;
    description: string;
    color: string;
    noteIds: string[];
  }[];
  accessPolicy: "public" | "private";
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
  comments: {
    _id: string;
    content: string;
    noteId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface BoardsResponse {
  count: number;
  own: number;
  items: {
    _id: string;
    title: string;
    userId: string;
    participants: {
      role: "admin" | "member";
      userId: string;
    }[];
    notes: string[];
    columns: {
      _id: string;
      title: string;
      description: string;
      color: string;
      noteIds: string[];
    }[];
    accessPolicy: "public" | "private";
    isLocked: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface BoardSendInvite {
  email: string;
}

export interface BoardInviteVerify {
  token: string;
}

export interface BoardsQuery {
  limit?: string | number;
  page?: string | number;
  search?: string;
  sort?: string;
  order?: "ASC" | "DESC";
}

export interface NoteAdd {
  content: string;
  boardId: string;
  columnIndex: string;
}

export interface NoteUpdate {
  content?: string;
  voteUp?: boolean;
  voteDown?: boolean;
  reactions?:
    | "thinking-face"
    | "loudly-crying-face"
    | "face-with-tears-of-joy"
    | "fire"
    | "party-popper"
    | "pile-of-poo";
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Scrumlens API
 * @version 0.0.0
 *
 * Development documentation
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name PostAuthSignup
     * @request POST:/auth/signup
     */
    postAuthSignup: (data: Signup, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/signup`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name PostAuthSignupGuest
     * @request POST:/auth/signup-guest
     */
    postAuthSignupGuest: (data: SignupGuest, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/signup-guest`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name PostAuthSignin
     * @request POST:/auth/signin
     */
    postAuthSignin: (data: Signin, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/signin`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name PostAuthLogout
     * @request POST:/auth/logout
     */
    postAuthLogout: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/logout`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name PostAuthRefresh
     * @request POST:/auth/refresh
     */
    postAuthRefresh: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/refresh`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name PostAuthVerify
     * @request POST:/auth/verify
     */
    postAuthVerify: (data: VerifyToken, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name PostAuthVerifyResend
     * @request POST:/auth/verify-resend
     */
    postAuthVerifyResend: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/verify-resend`,
        method: "POST",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name GetUsersMe
     * @request GET:/users/me
     */
    getUsersMe: (params: RequestParams = {}) =>
      this.request<UsersMeResponse, any>({
        path: `/users/me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name PatchUsersMe
     * @request PATCH:/users/me
     */
    patchUsersMe: (data: UserUpdate, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/me`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  boards = {
    /**
     * No description
     *
     * @name InternalwsBoardsById
     * @request INTERNALWS:/boards/{id}
     */
    internalwsBoardsById: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/boards/${id}`,
        method: "INTERNALWS",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Boards
     * @name GetBoardsById
     * @request GET:/boards/{id}
     */
    getBoardsById: (id: string, params: RequestParams = {}) =>
      this.request<BoardResponse, any>({
        path: `/boards/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Boards
     * @name PatchBoardsById
     * @request PATCH:/boards/{id}
     */
    patchBoardsById: (
      id: string,
      data: BoardUpdate,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/boards/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Boards
     * @name DeleteBoardsById
     * @request DELETE:/boards/{id}
     */
    deleteBoardsById: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/boards/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Boards
     * @name PostBoards
     * @request POST:/boards/
     */
    postBoards: (data: BoardAdd, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/boards/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Boards
     * @name GetBoards
     * @request GET:/boards/
     */
    getBoards: (
      query?: {
        limit?: string | number;
        page?: string | number;
        search?: string;
        sort?: string;
        order?: "ASC" | "DESC";
      },
      params: RequestParams = {},
    ) =>
      this.request<BoardsResponse, any>({
        path: `/boards/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Boards
     * @name PostBoardsByIdInvite
     * @request POST:/boards/{id}/invite
     */
    postBoardsByIdInvite: (
      id: string,
      data: BoardSendInvite,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/boards/${id}/invite`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Boards
     * @name PostBoardsInviteVerify
     * @request POST:/boards/invite-verify
     */
    postBoardsInviteVerify: (
      data: BoardInviteVerify,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/boards/invite-verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  notes = {
    /**
     * No description
     *
     * @tags Notes
     * @name PostNotes
     * @request POST:/notes/
     */
    postNotes: (data: NoteAdd, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/notes/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notes
     * @name PatchNotesById
     * @request PATCH:/notes/{id}
     */
    patchNotesById: (
      id: string,
      data: NoteUpdate,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/notes/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Notes
     * @name DeleteNotesById
     * @request DELETE:/notes/{id}
     */
    deleteNotesById: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/notes/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
}
