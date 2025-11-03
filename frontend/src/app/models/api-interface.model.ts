/**
 * API Interface Model
 * 
 * This file defines the TypeScript interface (type definition) for an API Interface.
 * An interface in TypeScript is like a contract - it defines what properties an object
 * must have and what types those properties are.
 * 
 * This interface matches the structure of the ApiInterfaceEntity from the backend.
 * When the backend sends JSON data, TypeScript will check that it matches this interface.
 */

// Import the ApiEndpoint interface since we reference it below
import { ApiEndpoint } from './api-endpoint.model';

/**
 * ApiInterface Interface
 * 
 * Represents an API interface (like "Cat Facts API", "Weather API", etc.)
 * 
 * @interface ApiInterface
 * 
 * In TypeScript, interfaces define the shape of objects. This interface says:
 * "Any object that claims to be an ApiInterface must have these properties with these types"
 */
export interface ApiInterface {
  /**
   * Unique identifier for the API interface
   * 
   * @type {number | null}
   * - `number` means it's a numeric value
   * - `| null` means it can also be null (the "|" is a union type - means "or")
   * - When creating a new API, id will be null until it's saved to the database
   */
  id: number | null;

  /**
   * Name of the API (e.g., "Cat Facts API", "Weather API")
   * 
   * @type {string}
   * - `string` means it's text data
   * - `| null` means it can be null (optional)
   */
  name: string | null;

  /**
   * Type of API (e.g., "REST", "SOAP", "GraphQL")
   * 
   * @type {string | null}
   */
  type: string | null;

  /**
   * Base URL of the API (e.g., "https://catfact.ninja")
   * 
   * @type {string | null}
   * This is the root URL where all endpoints for this API are located
   */
  base_url: string | null;

  /**
   * Description of what the API does
   * 
   * @type {string | null}
   */
  description: string | null;

  /**
   * Authentication type required (e.g., "NONE", "API_KEY", "Bearer", "OAuth")
   * 
   * @type {string | null}
   */
  auth_type: string | null;

  /**
   * Whether this API interface is currently active
   * 
   * @type {boolean | null}
   * - `boolean` means true or false
   * - Used to enable/disable an API without deleting it
   */
  is_active: boolean | null;

  /**
   * Timestamp when this API was created
   * 
   * @type {string | null}
   * - Stored as a string in ISO format (e.g., "2025-11-03T15:09:16.753671")
   * - Backend sends LocalDateTime as ISO string in JSON
   */
  created_at: string | null;

  /**
   * Timestamp when this API was last updated
   * 
   * @type {string | null}
   */
  updated_at: string | null;

  /**
   * List of endpoints associated with this API
   * 
   * @type {ApiEndpoint[] | null}
   * - `ApiEndpoint[]` means an array (list) of ApiEndpoint objects
   * - The `[]` after the type means it's an array
   * - This is optional - may not be included in all API responses
   */
  endpoints?: ApiEndpoint[] | null;
}

/**
 * Note about naming:
 * - Backend uses snake_case (base_url, created_at)
 * - Frontend matches backend naming to avoid conversion complexity
 * - TypeScript/JavaScript typically uses camelCase, but we match the API response
 */

