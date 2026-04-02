# NFT Mini Project

팀원이 이 저장소를 클론한 뒤 로컬에서 바로 실행할 수 있도록 정리한 가이드입니다.

## 1. 기술 스택
- Frontend: React + Vite
- Backend: Spring Boot (Java 17, Maven)
- Database: MariaDB (Docker Compose)

## 2. 사전 준비
아래 도구가 설치되어 있어야 합니다.
- Git
- Docker / Docker Compose
- Java 17
- Node.js 20+ (권장: LTS)

## 3. 프로젝트 클론
```bash
git clone https://github.com/KDT-3Team-BlockchainTest/nft-mini.git
cd nft-mini
```

## 4. DB 실행 (MariaDB)
루트 디렉토리에서 실행:
```bash
docker compose up -d
```

확인:
```bash
docker ps
```
`nft-mariadb` 컨테이너가 실행 중이면 정상입니다.

개발 안할때는 `docker compose down` 로 도커를 꼭 꺼주셔야 
이미지가 계속 돌지 않아 컴퓨터가 느려지지 않습니다.

DB 접속 정보는 아래와 같습니다.
- Host: `localhost`
- Port: `3306`
- Database: `nftdb`
- User: `nftuser`
- Password: `1234`

## 5. 백엔드 실행
백엔드 디렉토리로 이동 후 실행:
```bash
cd be
./mvnw spring-boot:run
```

Windows:
```bash
mvnw.cmd spring-boot:run
```

실행 포트: `http://localhost:8080`

## 6. 프론트엔드 실행
새 터미널에서 실행:
```bash
cd fe
npm install
npm run dev
```

실행 포트(기본): `http://localhost:5173`

Vite 프록시 설정으로 `/api`, `/uploads` 요청은 자동으로 백엔드(`localhost:8080`)로 전달됩니다.

## 7. 실행 순서 요약
1. `docker compose up -d`
2. `be`에서 `./mvnw spring-boot:run`
3. `fe`에서 `npm install && npm run dev`
4. 브라우저에서 `http://localhost:5173` 접속

## 8. 기본 테스트 계정
백엔드 첫 실행 시 샘플 데이터가 자동 생성됩니다.

- 관리자
  - email: `admin@example.com`
  - password: `admin1234`
- 창작자
  - email: `nova@example.com`
  - password: `creator1234`
- 일반 사용자
  - email: `rin@example.com`
  - password: `user1234`

주의: DB에 사용자 데이터가 1건 이상 있으면 샘플 데이터는 다시 생성되지 않습니다.

## 9. 자주 발생하는 문제
### 1) 백엔드 DB 연결 실패
- `docker compose up -d`로 MariaDB가 실행 중인지 확인
- `3306` 포트를 다른 DB가 사용 중인지 확인

### 2) 프론트에서 API 호출 실패
- 백엔드가 `8080` 포트에서 정상 실행 중인지 확인
- 프론트를 `npm run dev`로 실행했는지 확인 (Vite 프록시 필요)

### 3) 초기화(데이터/DB) 다시 하고 싶을 때
```bash
docker compose down -v
docker compose up -d
```
이후 백엔드를 다시 실행하면 샘플 데이터가 다시 생성됩니다.

## 10. 종료 방법
- 프론트/백엔드: 실행 터미널에서 `Ctrl + C`
- DB 컨테이너:
```bash
docker compose down
```
