import { NextRequest } from "next/server";
import { POST as sanityDispatchPost } from "../sanity-dispatch/route";

/**
 * Backward compatibility proxy: forwards legacy directus-dispatch calls to sanity-dispatch
 */
export async function POST(req: NextRequest) {
  return sanityDispatchPost(req);
}
