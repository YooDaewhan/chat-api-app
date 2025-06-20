import pool from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("id 파라미터가 필요합니다.", { status: 400 });
  }

  try {
    const [rows] = await pool.query(
      "SELECT money, inventory FROM inventory WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return new Response("해당 사용자의 인벤토리가 없습니다.", {
        status: 404,
      });
    }

    // inventory는 MySQL 드라이버에 따라 string 또는 object로 반환됨
    let inventory = rows[0].inventory;
    if (typeof inventory === "string") {
      try {
        inventory = JSON.parse(inventory);
      } catch (e) {
        inventory = [];
      }
    } else if (!Array.isArray(inventory)) {
      inventory = [];
    }

    return Response.json({
      money: rows[0].money,
      inventory,
    });
  } catch (error) {
    console.error("DB 조회 실패:", error);
    return new Response("서버 오류", { status: 500 });
  }
}
