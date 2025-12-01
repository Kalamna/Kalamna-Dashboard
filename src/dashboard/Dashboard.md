src/
├── dashboard/
│   ├── Dashboard.tsx                 # Main dashboard component
│   ├── translations.ts               # Translation dictionary (en/ar)
│   ├── types.ts                      # TypeScript types/interfaces
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── index.ts
│   │
│   ├── sections/                     # Dashboard sections
│   │   ├── OverviewSection.tsx
│   │   ├── EmployeesSection.tsx
│   │   ├── ConfigSection.tsx
│   │   ├── ApiKeySection.tsx
│   │   ├── KnowledgeSection.tsx
│   │   ├── ChatHistorySection.tsx
│   │   ├── FeedbackSection.tsx
│   │   ├── AnalyticsSection.tsx
│   │   ├── WidgetPreviewSection.tsx
│   │   └── index.ts
│   │
│   ├── data/                         # Mock data (optional)
│   │   ├── employees.ts
│   │   ├── chatSessions.ts
│   │   ├── feedbacks.ts
│   │   └── knowledgeBase.ts
│   │
│   └── index.ts                      # Export entry point
│
├── assets/
│   ├── logo_light.png
│   ├── logo_dark.png
│   ├── full_logo_light.png
│   └── full_logo_dark.png
│
└── styles/
    └── tailwind.config.js            # Tailwind configuration