# 제품 쇼핑몰 관리자 페이지 RESTful API Server

> 원티드 프리온보딩 백엔드 코스 - 기업 과제를 위한 레포지토리

<br>

## 📢 서비스 개요 (요구사항 분석)

**쇼핑몰 관리자 페이지**

- <br>

### 📚 ERD

![image]()

### ⚒ 적용 기술

- 사용언어 : `Javascript`
- 런타임 환경 : `Node.js`
- 프레임워크 : `Express`
- 데이터베이스 : `MySQL`
- ORM : `Sequelize`

### 📂 폴더 구조

```
├── 📁database
│     ├── 📁config
│     │    └── config.js
│     └── 📁models
│          └── country_codes.js
│          └── coupon_types.js
│          └── delivery_costs.js
│          └── index.js
│          └── init-models.js
│          └── issued_coupons.js
│          └── orders.js
│          └── products.js
├── 📁node_modules
├── 📁src
│     ├── 📁coupon
│     │    └── couponController.js
│     │    └── couponRepository.js
│     │    └── couponRouter.js
│     │    └── couponService.js
│     └── 📁order
│     │    └── orderController.js
│     │    └── orderRepository.js
│     │    └── orderRouter.js
│     │    └── orderService.js
│     └── indexRouter.js
├── .env
├── .gitignore
├── .eslintrc
├── .prettierrc
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

### 🔐 환경 변수 설정

```
PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=
```

<br>database

## 📃 API DOCS

**[🔗 PostMan API Document]()**

<br>

## 💬 요구사항 구현 내용

### 1.

-

- **Method** :
- **URI** :
- **Requset**

  ```json
  // req.body :
  {}
  ```

- **Response**

---

### 2.

-

- **Method** :
- **URI** :
- **Requset**

  ```json
  // req.body :
  {}
  ```

- **Response**

---

### 3.

-

- **Method** :
- **URI** :
- **Requset**

  ```json
  // req.body :
  {}
  ```

- **Response**

---

### 4.

-

- **Method** :
- **URI** :
- **Requset**

  ```json
  // req.query:
  {}
  ```

- **Response**

<br>

## 💡 실행 방법

```
npm install
```

```
npm start
```

<br>

## 📝 커밋 컨벤션

- `Init:` 프로젝트 초기 세팅
- `Feat:` 새로운 기능 추가
- `Modify:` 코드 수정 (버그 x)
- `Fix:` 버그 수정 (올바르지 않은 동작을 고친 경우에 사용)
- `Docs:` 문서 작성, 수정
- `Style:` 코드 스타일 수정 (개행 등)
- `refactor:` 코드 리팩토링 (코드의 기능 변화 없이 수정)
- `Test:` 테스트 코드 추가
- `Chore:` 빌드 업무 수정, 패키지 매니저 수정, 그 외 자잘한 수정에 대한 커밋
