import ProtectedRoute from "../../src/ProtectedRoute";
import AdminLayout from "../../src/admin/AdminLayout";

export const metadata = {
  robots: { index: false, follow: false },
  title: "Admin Dashboard | Pandey Catering",
};

export default function AdminRootLayout({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}
