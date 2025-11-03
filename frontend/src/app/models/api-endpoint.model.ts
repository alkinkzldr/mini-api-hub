/**
 * API Endpoint Model
 * 
 * This file defines the TypeScript interface for an API Endpoint.
 * An endpoint represents a specific URL path and HTTP method within an API.
 * 
 * Example: GET /fact in the Cat Facts API is one endpoint
 */

/**
 * ApiEndpoint Interface
 * 
 * Represents a single endpoint within an API (e.g., GET /fact, POST /users)
 * 
 * @interface ApiEndpoint
 */
export interface ApiEndpoint {
  /**
   * Unique identifier for the endpoint
   * 
   * @type {number | null}
   */
  id: number | null;

  /**
   * The API Interface this endpoint belongs to
   * 
   * @type {number | null}
   * - Stores the ID of the parent ApiInterface
   * - When creating a new endpoint, we set this to associate it with an API
   */
  apiInterface?: number | null;

  /**
   * HTTP method for this endpoint (e.g., "GET", "POST", "PUT", "DELETE")
   * 
   * @type {string | null}
   * - Common HTTP methods: GET (retrieve), POST (create), PUT (update), DELETE (remove)
   */
  httpMethod: string | null;

  /**
   * The path/URL of the endpoint (e.g., "/fact", "/users", "/api/weather")
   * 
   * @type {string | null}
   * - This is relative to the API's base_url
   * - Example: If base_url is "https://api.example.com" and path is "/users",
   *   the full URL would be "https://api.example.com/users"
   */
  path: string | null;

  /**
   * Description of what this endpoint does
   * 
   * @type {string | null}
   */
  description: string | null;

  /**
   * Example request body in JSON format (for POST/PUT endpoints)
   * 
   * @type {string | null}
   * - Stored as a JSON string
   * - Example: '{"name": "John", "age": 30}'
   */
  requestExample: string | null;

  /**
   * Example response body in JSON format
   * 
   * @type {string | null}
   * - Shows what the API returns when you call this endpoint
   * - Example: '{"fact": "Cats are awesome", "length": 18}'
   */
  responseExample: string | null;

  /**
   * Whether this endpoint is currently active
   * 
   * @type {boolean | null}
   */
  isActive: boolean | null;

  /**
   * Timestamp when this endpoint was created
   * 
   * @type {string | null}
   */
  createdAt: string | null;

  /**
   * Timestamp when this endpoint was last updated
   * 
   * @type {string | null}
   */
  updatedAt: string | null;
}

/**
 * Note about field naming:
 * - Some fields use camelCase (isActive, createdAt) - matches backend Java naming
 * - Some backend fields use snake_case, but when serialized to JSON, Spring Boot
 *   converts them automatically. The actual JSON response may vary.
 * - We'll adjust based on what the actual API returns
 */

