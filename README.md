## 캔바 클론
### 사용기술
- Next.js 15
- pnpm
- shadcn-ui
- tanstack-query
- fabric.js
- hono
- zod
- auth.js
- drizzle ORM
- supabase( PostgreSQL )
- stripe
- zustand

## Local 환경 구동 명령어
### pnpm
```bash
pnpm run dev
```

### stripe webhook
```bash
stripe listen --forward-to localhost:3000/api/subscriptions/webhook
```

Drizzle 스키마를 기반으로 SQL 마이그레이션 파일을 생성
```bash
pnpm db:generate
```

SQL 마이그레이션을 실행하고 적용된 마이그레이션을 drizzle 마이그레이션 테이블에 기록
```bash
pnpm db:migrate
```

Drizzle ORM 프로젝트를 위한 데이터베이스 브라우저 도구 구동동
```bash
pnpm db:studio
```
<br/>

---


### pnpm

프로젝트 생성

```bash
pnpm create next-app@latest
```

TailwindCSS Prettier 설정

```bash
pnpm add -D prettier prettier-plugin-tailwindcss
```

`.prettierrc`
```json
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindFunctions": ["clsx"]
}
```

외부 스타일 사용할 수 있도록 설정

```bash
pnpm add -D postcss-import postcss-nesting autoprefixer
```

```tsx
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

```css
/*global.css*/

@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

Shadcn-설치

```bash
pnpm dlx shadcn@latest init
```

초기 설정은 components.json에서 확인 가능

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

필요한 Shadcn-ui 컴포넌트 추가

```bash
pnpm dlx shadcn@latest add
```

### 환경 변수 목록
```bash
# Unsplash Access Key
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

# 이미지 업로드하는 Uploadthing 토큰
UPLOADTHING_TOKEN

# AI 이미지 생성 Replicate 토큰
REPLICATE_API_TOKEN

# Auth.js Secret
AUTH_SECRET

# Github
AUTH_GITHUB_ID
AUTH_GITHUB_SECRET

# Neon DB URL
DATABASE_URL

# Stripe
STRIPE_SECRET_KEY
STRIPE_PRICE_ID
# Stripe Login 이후 두번째 stripe listen --forward-to 명령어 수행 시 발생
STRIPE_WEBHOOK_SECRET
```