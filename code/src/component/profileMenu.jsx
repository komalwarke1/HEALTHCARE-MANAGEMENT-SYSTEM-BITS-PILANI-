import React from "react";

const ProfileMenu = ({ profile }) => {
  const { name, role, menuItems } = profile;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg p-6">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{role}</p>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.link}
              className={`flex items-center justify-between p-3 rounded-lg transition ${
                item.isLogout
                  ? "text-red-600 hover:bg-red-100"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div>
                <span className="block text-sm font-medium">{item.label}</span>
                {item.description && (
                  <span className="block text-xs text-gray-500">
                    {item.description}
                  </span>
                )}
              </div>
              {item.badge && (
                <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileMenu;
