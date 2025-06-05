import { type NextRequest, NextResponse } from "next/server"

export function withAuth(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const authHeader = req.headers.get("authorization")
    if (authHeader !== "Basic YWRtaW46MTIzNDU2") {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    return handler(req)
  }
}

