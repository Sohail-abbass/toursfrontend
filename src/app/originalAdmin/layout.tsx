// app/admin/layout.js
export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <aside style={{ width: "250px", background: "#111", color: "white" }}>
        <ul>
          <li><a href="/originalAdmin/tours">Tours</a></li>
          <li><a href="/originalAdmin/package">Packages</a></li>
        </ul>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>

    </div>
  );
}