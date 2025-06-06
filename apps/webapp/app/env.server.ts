import { z } from "zod";
import { isValidDatabaseUrl } from "./utils/db";

const EnvironmentSchema = z.object({
  NODE_ENV: z.union([
    z.literal("development"),
    z.literal("production"),
    z.literal("test"),
  ]),
  DATABASE_URL: z
    .string()
    .refine(
      isValidDatabaseUrl,
      "DATABASE_URL is invalid, for details please check the additional output above this message.",
    ),
  DATABASE_CONNECTION_LIMIT: z.coerce.number().int().default(10),
  DATABASE_POOL_TIMEOUT: z.coerce.number().int().default(60),
  DATABASE_CONNECTION_TIMEOUT: z.coerce.number().int().default(20),
  DIRECT_URL: z
    .string()
    .refine(
      isValidDatabaseUrl,
      "DIRECT_URL is invalid, for details please check the additional output above this message.",
    ),
  DATABASE_READ_REPLICA_URL: z.string().optional(),
  SESSION_SECRET: z.string(),
  ENCRYPTION_KEY: z.string(),

  APP_ENV: z.string().default(process.env.NODE_ENV),
  LOGIN_ORIGIN: z.string().default("http://localhost:5173"),
  APP_ORIGIN: z.string().default("http://localhost:5173"),
  POSTHOG_PROJECT_KEY: z.string().default(""),

  // google auth
  AUTH_GOOGLE_CLIENT_ID: z.string().optional(),
  AUTH_GOOGLE_CLIENT_SECRET: z.string().optional(),

  //Redis
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_TLS_DISABLED: z.coerce.boolean().default(true),

  //Neo4j
  NEO4J_URI: z.string(),
  NEO4J_USERNAME: z.string(),
  NEO4J_PASSWORD: z.string(),

  //OpenAI
  OPENAI_API_KEY: z.string(),
});

export type Environment = z.infer<typeof EnvironmentSchema>;
export const env = EnvironmentSchema.parse(process.env);
