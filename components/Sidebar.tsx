import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-900 p-6">
      <h2 className="text-xl font-bold mb-4">Agent Dispatch</h2>
      <nav>
        <ul className="space-y-4">
          <li className="p-3 bg-gray-700 rounded-lg">Facebook</li>
          <li className="p-3 bg-gray-700 rounded-lg">Instagram</li>
          <li className="p-3 bg-gray-700 rounded-lg">WhatsApp</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
