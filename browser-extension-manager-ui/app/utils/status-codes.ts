export const STATUS_CODES: Record<string, {httpStatus: number; description: string}> = {
    ////////////////////////////////////////////////////////////////
    /// Group 0 - Connection
    /// Related to the connection with the database.
    ////////////////////////////////////////////////////////////////

    PGRST000: {
        httpStatus: 503,
        description:
            "Could not connect with the database due to an incorrect db-uri or due to the PostgreSQL service not running.",
    },
    PGRST001: {
        httpStatus: 503,
        description: "Could not connect with the database due to an internal error.",
    },
    PGRST002: {
        httpStatus: 503,
        description:
            "Could not connect with the database when building the Schema Cache due to the PostgreSQL service not running.",
    },
    PGRST003: {
        httpStatus: 504,
        description:
            "The request timed out waiting for a pool connection to be available. See db-pool-acquisition-timeout.",
    },

    ////////////////////////////////////////////////////////////////
    /// Group 1 - Api Request
    /// Related to the HTTP request elements.
    ////////////////////////////////////////////////////////////////

    PGRST100: {
        httpStatus: 400,
        description:
            "Parsing error in the query string parameter. See Horizontal Filtering, Operators and Ordering.",
    },
    PGRST101: {
        httpStatus: 405,
        description:
            "For functions, only GET and POST verbs are allowed. Any other verb will throw this error.",
    },
    PGRST102: {
        httpStatus: 400,
        description: "An invalid request body was sent(e.g. an empty body or malformed JSON).",
    },
    PGRST103: {
        httpStatus: 416,
        description: "An invalid range was specified for Limits and Pagination.",
    },
    PGRST105: {
        httpStatus: 405,
        description: "An invalid PUT request was done",
    },
    PGRST106: {
        httpStatus: 406,
        description:
            "The schema specified when switching schemas is not present in the db-schemas configuration variable.",
    },
    PGRST107: {
        httpStatus: 415,
        description: "The Content-Type sent in the request is invalid.",
    },
    PGRST108: {
        httpStatus: 400,
        description:
            "The filter is applied to a embedded resource that is not specified in the select part of the query string. See Embedded Filters.",
    },
    PGRST109: {
        httpStatus: 400,
        description:
            "Restricting a Deletion or an Update using limits must include the ordering of a unique column. See Limited Update/Delete.",
    },
    PGRST110: {
        httpStatus: 400,
        description:
            "When restricting a Deletion or an Update using limits modifies more rows than the maximum specified in the limit. See Limited Update/Delete.",
    },
    PGRST111: {
        httpStatus: 500,
        description: "An invalid response.headers was set. See Response Headers.",
    },
    PGRST112: {
        httpStatus: 500,
        description: "The status code must be a positive integer. See Response Status Code.",
    },
    PGRST114: {
        httpStatus: 400,
        description: "For an UPSERT using PUT, when limits and offsets are used.",
    },
    PGRST115: {
        httpStatus: 400,
        description:
            "For an UPSERT using PUT, when the primary key in the query string and the body are different.",
    },
    PGRST116: {
        httpStatus: 406,
        description:
            "More than 1 or no items where returned when requesting a singular response. See Singular or Plural.",
    },
    PGRST117: {
        httpStatus: 405,
        description: "The HTTP verb used in the request in not supported.",
    },
    PGRST118: {
        httpStatus: 400,
        description:
            "Could not order the result using the related table because there is no many-to-one or one-to-one relationship between them.",
    },
    PGRST119: {
        httpStatus: 400,
        description:
            "Could not use the spread operator on the related table because there is no many-to-one or one-to-one relationship between them.",
    },
    PGRST120: {
        httpStatus: 400,
        description:
            "An embedded resource can only be filtered using the is.null or not.is.null operators.",
    },
    PGRST121: {
        httpStatus: 500,
        description:
            "PostgREST can’t parse the JSON objects in RAISE PGRST error. See raise headers.",
    },
    PGRST122: {
        httpStatus: 400,
        description:
            "Invalid preferences found in Prefer header with Prefer: handling=strict. See Strict or Lenient Handling.",
    },

    ////////////////////////////////////////////////////////////////
    /// Group 2 - Schema Cache
    /// Related to a Schema Cache. Most of the time, these errors are solved by Schema Cache Reloading.
    ////////////////////////////////////////////////////////////////

    PGRST200: {
        httpStatus: 400,
        description:
            "Caused by stale foreign key relationships, otherwise any of the embedding resources or the relationship itself may not exist in the database.",
    },
    PGRST201: {
        httpStatus: 300,
        description:
            "An ambiguous embedding request was made. See Foreign Key Joins on Multiple Foreign Key Relationships.",
    },
    PGRST202: {
        httpStatus: 400,
        description:
            "Caused by a stale function signature, otherwise the function may not exist in the database.",
    },
    PGRST203: {
        httpStatus: 300,
        description:
            "Caused by requesting overloaded functions with the same argument names but different types, or by using a POST verb to request overloaded functions with a JSON or JSONB type unnamed parameter. The solution is to rename the function or add/modify the names of the arguments.",
    },
    PGRST204: {
        httpStatus: 400,
        description:
            "Caused when the column specified in the columns query parameter is not found.",
    },
    PGRST205: {
        httpStatus: 400,
        description: "Cause when the specified table or view in its schema cache is not found",
    },

    ////////////////////////////////////////////////////////////////
    /// Group 3 - JWT
    /// Related to the authentication process using JWT. You can follow the Tutorial 1 - The Golden Key for an example on how to implement authentication and the Authentication page for more information on this process.
    ////////////////////////////////////////////////////////////////

    PGRST300: {
        httpStatus: 500,
        description: "A JWT secret is missing from the configuration.",
    },
    PGRST301: {
        httpStatus: 401,
        description:
            "Any error related to the verification of the JWT, which means that the JWT provided is invalid in some way.",
    },
    PGRST302: {
        httpStatus: 401,
        description:
            "Attempted to do a request without authentication when the anonymous role is disabled by not setting it in db-anon-role.",
    },

    ////////////////////////////////////////////////////////////////
    /// Group X - Internal
    /// Internal errors. If you encounter any of these, you may have stumbled on a PostgREST bug, please open an issue and we’ll be glad to fix it.
    ////////////////////////////////////////////////////////////////

    PGRSTX00: {
        httpStatus: 500,
        description: "Internal errors related to the library used for connecting to the database.",
    },
};
