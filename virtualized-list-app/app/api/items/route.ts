import { getItems } from "@/lib/itemService";
// 👉 Import business logic

export async function GET(req: Request) {
  // 👉 Extract query params from URL
  const { searchParams } = new URL(req.url);

  // 👉 Read values (with defaults)
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;

  // 👉 Call service layer
  const result = getItems({
    search,
    page,
    limit,
  });

  // 👉 Return JSON response
  return Response.json(result);
}