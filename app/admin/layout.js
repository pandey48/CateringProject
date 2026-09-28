import ProtectedRoute from "../../src/ProtectedRoute";
import AdminLayout from "../../src/admin/AdminLayout";

export const metadata = {
  title: "Admin Dashboard | Pandey Event Management",
};

export default function AdminRootLayout({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}
