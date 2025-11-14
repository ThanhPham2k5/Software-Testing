# 📚 FloginFE_BE - Dashboard Quản lý Sản phẩm

**Hệ thống Web Full Stack (React + Spring Boot) phát triển theo Test-Driven Development (TDD)**

---

## 1. 💡 Giới thiệu Dự án

**FloginFE_BE** là một ứng dụng web hoàn chỉnh, được xây dựng để cung cấp một **Dashboard Quản lý** Sản phẩm/Sách. Dự án này phục vụ cho Bài tập lớn môn **Kiểm Thử Phần Mềm**, tập trung áp dụng triệt để phương pháp **Test-Driven Development (TDD)** nhằm đảm bảo chất lượng và độ tin cậy của hệ thống.

### 1.1. Chức năng Chính

Dự án bao gồm các module cốt lõi sau:

- **Chức năng Login & Authentication:** Hệ thống đăng nhập an toàn với cơ chế xác thực và **validation** đầu vào đầy đủ.
- **Chức năng Product Management (CRUD):** Quản lý toàn diện dữ liệu sản phẩm/sách, hỗ trợ đầy đủ các thao tác **Create, Read, Update, Delete**.

## 2. 🧪 Triết lý Phát triển: TDD

Dự án này tuân thủ nghiêm ngặt nguyên tắc **Test-Driven Development (TDD)**. Toàn bộ tính năng đều được phát triển theo chu trình **Red-Green-Refactor**:

1.  **RED (Viết Test Thất bại):** Luôn viết Test Case trước khi viết mã sản xuất.
2.  **GREEN (Viết Mã):** Viết mã nguồn tối thiểu để làm Test Case vượt qua.
3.  **REFACTOR (Tái cấu trúc):** Tối ưu hóa mã nguồn mà không làm Test thất bại.

Việc này đảm bảo rằng mỗi đơn vị (unit) và mỗi thành phần (component) đều được kiểm thử, dẫn đến mã nguồn sạch, ít lỗi và dễ dàng bảo trì.

## 3. 🛠 Công nghệ Sử dụng

### 3.1. Frontend (React Application)

| Công nghệ                 | Phiên bản | Mô tả                                                         | Công cụ Kiểm thử           |
| :------------------------ | :-------- | :------------------------------------------------------------ | :------------------------- |
| **React**                 | 18+       | Framework JavaScript cho giao diện người dùng (UI).           |                            |
| **Jest**                  | Mới nhất  | Testing Framework chính cho JavaScript.                       | **Component/Unit Testing** |
| **React Testing Library** | Mới nhất  | Hỗ trợ kiểm thử các component theo cách người dùng tương tác. | **User Behavior Testing**  |
| **Axios**                 | Mới nhất  | HTTP client để giao tiếp với API.                             |                            |
| **CSS3**                  | Mới nhất  | Styling và animations.                                        |                            |

### 3.2. Backend (Spring Boot API)

| Công nghệ           | Phiên bản | Mô tả                                                    | Công cụ Kiểm thử               |
| :------------------ | :-------- | :------------------------------------------------------- | :----------------------------- |
| **Spring Boot**     | 3.2+      | Framework Java mạnh mẽ cho việc xây dựng API.            |                                |
| **Java**            | 17+       | Ngôn ngữ lập trình chính.                                |                                |
| **JUnit 5**         | Mới nhất  | Testing Framework tiêu chuẩn.                            | **Unit & Integration Testing** |
| **Mockito**         | Mới nhất  | Dùng để **Mock** các dependencies (Service, Repository). | **Unit Testing**               |
| **Spring Data JPA** | Mới nhất  | Xử lý các thao tác Database.                             |                                |
| **Maven**           | Mới nhất  | Build tool.                                              |                                |

## 4. 🏗 Cấu Trúc Dự án

Cấu trúc dự án được chia rõ ràng thành hai phần: /frontend và /backend

## 5. 🚀 Hướng dẫn Chạy dự án

### 5.1. Yêu cầu Tiên quyết

- Java Development Kit (JDK) 17+
- Node.js và npm (hoặc yarn)
- Maven

### 5.2. Chạy dự án cho Backend (Spring Boot)

```bash
# 1. Chuyển vào thư mục backend
cd backend/

# 2. Chạy dự án
mvn spring-boot:run
```

### 5.3. Chạy dự án cho Frontend (React)

```bash
# 1. Chuyển vào thư mục frontend
cd frontend/

# 2. Cài đặt dependencies (nếu chưa cài)
npm install

# 3. Chạy dự án
npm run dev
```

## 6. 🚀 Hướng dẫn Chạy và Kiểm thử

### 6.1. Yêu cầu Tiên quyết

- Java Development Kit (JDK) 17+
- Node.js và npm (hoặc yarn)
- Maven

### 6.2. Chạy Tests cho Backend (Spring Boot)

Thực thi tất cả các **Unit** và **Integration Tests** đã viết bằng **JUnit 6** và **Mockito**:

```bash
# 1. Chuyển vào thư mục backend
cd backend/

# 2. Thực thi tất cả các Test Cases
mvn test
```

### 6.3. Chạy Tests cho Frontend (React)

```bash
# 1. Chuyển vào thư mục frontend
cd frontend/

# 2. Cài đặt dependencies (nếu chưa cài)
npm install

# 3. Thực thi các Test Cases
npm test
```
