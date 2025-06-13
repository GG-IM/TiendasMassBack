import React from 'react';
import { Home, Package, Folder, Users, ShoppingCart, Settings, CreditCard, Menu } from 'lucide-react';

const Sidebar = ({ collapsed, activeView, onViewChange, onToggle }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'categories', label: 'Categorías', icon: Folder },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
    { id: 'statuses', label: 'Estados', icon: Settings },
    { id: 'payments', label: 'Métodos de Pago', icon: CreditCard },
  ];

  return (
    <nav className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">M</div>
          {!collapsed && <div className="logo-text">Mass Admin</div>}
        </div>
      </div>
      
      <ul className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <li key={item.id} className="nav-item">
              <a
                href="#"
                className={`nav-link ${activeView === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onViewChange(item.id);
                }}
              >
                <IconComponent className="nav-icon" />
                {!collapsed && <span className="nav-text">{item.label}</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;