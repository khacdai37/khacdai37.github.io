// Đường dẫn nội bộ gom về một chỗ. Trước đây các chuỗi "/dashboard..." nằm rải
// rác ở HeaderMenu và DashboardLaunchpad — hai bản sao độc lập của cùng một
// taxonomy nav, rất dễ trôi dạt khi đổi route.
export const routes = {
  home: "/",
  apps: "/apps",
  youtube: "/youtube",
  pomodoro: "/apps/pomodoro",
  familyTree: {
    root: "/apps/family-tree",
    members: "/apps/family-tree/members",
    member: (id: string) => `/apps/family-tree/members/${id}`,
    kinship: "/apps/family-tree/kinship",
    stats: "/apps/family-tree/stats",
    add: "/apps/family-tree/add",
    about: "/apps/family-tree/about",
  },
} as const;
