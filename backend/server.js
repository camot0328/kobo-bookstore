// json-server와 cors, auth 패키지를 가져온다
import jsonServer from "json-server";
import cors from "cors";
import auth from "json-server-auth";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// 현재 파일(server.js) 위치 가져오기
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonServer = require("json-server");
const auth = require("json-server-auth");

// 1. 서버 인스턴스를 생성한다
const server = jsonServer.create();

// 2. db.json 파일을 연결해서 router를 만든다 (절대 경로 사용!)
const router = jsonServer.router(path.join(__dirname, "db.json"));
router.render = (req, res) => {
  res.jsonp(res.locals.data);
};

// 3. 기본 미들웨어를 적용한다 (logger, static 파일 서빙, no-cache 등)
const middlewares = jsonServer.defaults();

// 4. routes.json 파일을 불러와서 경로 재매핑 설정을 가져온다
const rewriter = jsonServer.rewriter(join(__dirname, "routes.json"));

// 5. 서버 객체에 DB 접근 권한을 연결한다 (auth가 내부 DB 사용 가능하게)
server.db = router.db;

// 6. CORS 미들웨어를 적용한다 (모든 Origin 요청을 허용한다)
server.use(cors());

// 7. 기본 미들웨어를 적용한다 (로그 출력, 정적 파일 서빙 등)
server.use(middlewares);

// 8. routes.json 리매핑 규칙을 적용한다
server.use(rewriter);

// 9. auth 미들웨어를 적용한다 (회원가입/로그인 인증 처리)
server.use(auth);

// 11. API 라우터를 적용한다 (실제 db.json 기반 CRUD 처리)
server.use(router);

// 10. 저장 트리거 (비동기 write)
server.use((req, res, next) => {
  res.on("finish", async () => {
    try {
      await server.db.write();
    } catch (err) {
      console.error("❌ DB 저장 실패:", err);
    }
  });
  next();
});

// 12. 서버를 지정한 포트로 실행한다 (기본 3001번)
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(
    `🚀 JSON Server is running on http://3.35.11.171:${PORT}`
  );
});
