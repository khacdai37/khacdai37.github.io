/**
 * Ảnh chụp app iOS trong repo này đều là mockup iPhone 13 Pro Max: PNG **nền
 * trong suốt**, đã thu về 583×1100 từ bản gốc 1684×3178.
 *
 * Giữ PNG chứ đừng chuyển JPEG — JPEG không có alpha, phần nền quanh khung máy
 * sẽ thành hình chữ nhật đen/trắng.
 *
 * `framed` báo cho `LandingHero`/`StepList` bỏ bo góc + viền: cả hai vẽ theo hộp
 * ảnh nên sẽ đóng khung cả vùng trong suốt. `drop-shadow` thì bám alpha, vẫn ôm
 * đúng dáng máy.
 */
export const deviceShot = { width: 583, height: 1100, framed: true } as const;
