import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(), // Connect to Upstash Redis using environment variables
    limiter: Ratelimit.slidingWindow(10, "100 s"), // Allow 10 requests every 100 seconds
    analytics: true, // Enable analytics to track rate limit usage
    prefix: "@upstash/ratelimit", // Optional prefix for keys in Redis
});