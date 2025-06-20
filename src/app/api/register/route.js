export async function POST(req) {
  try {
    const { id, pw } = await req.json();
    if (!id || !pw) {
      return new Response("id와 pw는 필수입니다.", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*", // 또는 Vercel 도메인
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // DB 처리 생략
    return new Response("회원가입 성공", {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    return new Response("서버 오류", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}
