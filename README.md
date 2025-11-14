# 📚 FloginFE_BE - Dashboard Quản lý Sản phẩm

**Ứng dụng Web: React (Frontend) & Spring Boot (Backend) phát triển theo TDD.**

---

## 💡 Giới thiệu Tổng quan

**FloginFE_BE** là một hệ thống web cơ bản được thiết kế để cung cấp một **Dashboard Quản lý Sản phẩm** (hoặc sách).

Dự án này là Bài tập lớn môn **Kiểm Thử Phần Mềm**, áp dụng phương pháp phát triển **Test-Driven Development (TDD)** xuyên suốt quá trình xây dựng, nhằm đảm bảo chất lượng và độ tin cậy cao của mã nguồn.

### 🚀 Tính năng Cốt lõi

- **Login & Authentication:** Hệ thống đăng nhập an toàn, bao gồm validation đầy đủ cho các trường nhập liệu.
- **Product Management (CRUD):** Các thao tác cơ bản và nâng cao để Quản lý Sản phẩm (Tạo, Đọc, Cập nhật, Xóa).

---

## 🧪 Trọng tâm: Test-Driven Development (TDD)

Dự án được phát triển theo chu trình **TDD (Red -> Green -> Refactor)**:

1.  **RED:** Viết Test thất bại trước khi viết mã sản xuất.
2.  **GREEN:** Viết mã sản xuất tối thiểu để làm Test vượt qua.
3.  **REFACTOR:** Tái cấu trúc mã nguồn để tối ưu mà không làm Test thất bại.

Phương pháp này giúp đảm bảo:

- Độ phủ mã (Code Coverage) cao.
- Phát hiện lỗi sớm và cải thiện thiết kế.
- Mã nguồn dễ bảo trì và mở rộng.

## 🛠 Công nghệ Sử dụng

### 1. Backend (Spring Boot 3.2+)

| Công nghệ           | Phiên bản | Vai trò                                                   | Công cụ Kiểm thử                                  |
| :------------------ | :-------- | :-------------------------------------------------------- | :------------------------------------------------ |
| **Spring Boot**     | 3.2+      | Framework API chính.                                      | **JUnit 5, Mockito** (Unit & Integration Testing) |
| **Java**            | 17+       | Ngôn ngữ chính.                                           |                                                   |
| **JUnit 5**         | Mới nhất  | Testing framework tiêu chuẩn.                             |                                                   |
| **Mockito**         | Mới nhất  | Mocking dependencies (Service, Repository) cho Unit Test. |                                                   |
| **Spring Data JPA** | Mới nhất  | Thao tác Database.                                        |                                                   |
| **Maven**           | Mới nhất  | Build tool.                                               |                                                   |

### 2. Frontend (React 18+)

| Công nghệ | Phiên bản | Vai trò                      | Công cụ Kiểm thử                                    |
| :-------- | :-------- | :--------------------------- | :-------------------------------------------------- |
| **React** | 18+       | Framework JavaScript cho UI. | **Jest, React Testing Library** (Component Testing) |

| \*\*React Testing
