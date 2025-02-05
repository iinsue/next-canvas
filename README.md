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