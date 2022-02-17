const Router = require("@koa/router")
const controller = require("../../controllers/public")

const router = Router()

/**
 * @openapi
 * /row/{tableId}/search:
 *   post:
 *     summary: Allows searching for rows within a table.
 *     parameters:
 *       - in: path
 *         name: tableId
 *         required: true
 *         description: The ID of the table which contains the rows
 *           which are being searched for.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: object
 *                 properties:
 *                   string:
 *                     type: object
 *                     example:
 *                       columnName1: value
 *                       columnName2: value
 *                     description: A map of field name to the string to search for,
 *                       this will look for rows that have a value starting with the
 *                       string value.
 *                     additionalProperties:
 *                       type: string
 *                       description: The value to search for in the column.
 *                   fuzzy:
 *                     type: object
 *                     description: A fuzzy search, only supported by internal tables.
 *                   range:
 *                     type: object
 *                     description: Searches within a range, the format of this must be
 *                       columnName -> [low, high].
 *                   equal:
 *                     type: object
 *                     description: Searches for rows that have a column value that is
 *                       exactly the value set.
 *                   notEqual:
 *                     type: object
 *                     description: Searches for any row which does not contain the specified
 *                       column value.
 *                   empty:
 *                     type: object
 *                     description: Searches for rows which do not contain the specified column.
 *                       The object should simply contain keys of the column names, these
 *                       can map to any value.
 *                   notEmpty:
 *                     type: object
 *                     description: Searches for rows which have the specified column.
 *                   oneOf:
 *                     type: object
 *                     description: Searches for rows which have a column value that is any
 *                       of the specified values. The format of this must be columnName -> [value1, value2].
 *               paginate:
 *                 type: boolean
 *                 description: Enables pagination, by default this is disabled.
 *               bookmark:
 *                 oneOf:
 *                   - type: string
 *                   - type: integer
 *                 description: If retrieving another page, the bookmark from the previous request must be supplied.
 *               limit:
 *                 type: integer
 *                 description: The maximum number of rows to return, useful when paginating, for internal tables this
 *                   will be limited to 1000, for SQL tables it will be 5000.
 *               sort:
 *                 type: object
 *                 description: A set of parameters describing the sort behaviour of the search.
 *                 properties:
 *                   order:
 *                     type: string
 *                     enum: [ascending, descending]
 *                     description: The order of the sort, by default this is ascending.
 *                   column:
 *                     type: string
 *                     description: The name of the column by which the rows will be sorted.
 *                   type:
 *                     type: string
 *                     enum: [string, number]
 *                     description: Defines whether the column should be treated as a string
 *                       or as numbers when sorting.
 *     responses:
 *       200:
 *         description: The response will contain an array of rows that match the search parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rows:
 *                   description: An array of rows, these will each contain an _id field which can be used
 *                     to update or delete them.
 *                   type: array
 *                   items:
 *                     type: object
 *                     example:
 *                       $ref: '#/components/examples/row'
 *                 bookmark:
 *                   oneOf:
 *                     - type: string
 *                     - type: integer
 *                   description: If pagination in use, this should be provided
 *                 hasNextPage:
 *                   description: If pagination in use, this will determine if there is another page to fetch.
 *                   type: boolean
 */
router.post("/tables/:tableId/rows/search", controller.search)

router.post("/tables/:tableId/rows", controller.create)

router.put("/tables/:tableId/rows/:rowId", controller.update)

router.delete("/tables/:tableId/rows/:rowId", controller.delete)

router.get("/tables/:tableId/rows/:rowId", controller.singleRead)

module.exports = router
