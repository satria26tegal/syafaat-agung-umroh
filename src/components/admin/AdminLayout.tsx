import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-muted/30">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;