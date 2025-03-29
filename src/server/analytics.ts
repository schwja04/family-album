import { PostHog } from "posthog-node";

export function serverSideAnalytics() {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        // If the PostHog key is not set, return early to avoid errors
        console.error("PostHog key is not defined in environment variables.");
        return null;
    }

    const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        // Optional configuration options
        flushAt: 1, // Flush events after every capture (default is 30)
        flushInterval: 0, // Flush events immediately (default is 30 seconds)
    });

    return posthogClient;
}

const analyticsServerClient = serverSideAnalytics();

export default analyticsServerClient;