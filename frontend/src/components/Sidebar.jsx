import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Baby,
  FileText,
  Activity,
  Menu,
  X,
  LogOut,
  Calendar,
  Users,
  ChevronRight,
  Cross,
  ChevronDown,
  BookOpen
} from "lucide-react";
import { getMyChildren } from "../_services/child";

export default function Sidebar() {

  const location = useLocation();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [children, setChildren] = useState([]);


  
  const loadChildren = async () => {
    try {
      const data = await getMyChildren();

      setChildren(
        Array.isArray(data)
          ? data
          : data?.data || []
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (role === "parent") {
      loadChildren();
    }
  }, []);


  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("isLogin");

    navigate("/");
  };

  let menus = [];

  // SUPER ADMIN
  if (role === "super_admin") {
    menus = [
      {
        label:"Dashboard",
        icon: <LayoutDashboard size={20} />,
        path: "/dashboard",
      },
      {
        label: "Log Aktivitas",
        icon: <Activity size={20} />,
        path: "/log-aktivitas",
      },
      {
        label: "Manajemen Akun",
        icon: <Users size={20} />,
        path: "/manajemen-akun",
      },
    ];
  }

  // ADMIN
  else if (role === "admin" ) {
    menus = [
      {
        label: "Dashboard",
        icon: <LayoutDashboard size={20} />,
        path: "/dashboard",
      },
      {
        label: "Data Balita",
        icon: <Baby size={20} />,
        path: "/balita",
      },
      {
        label: "Laporan",
        icon: <FileText size={20} />,
        path: "/laporan",
      },
      {
        label: "Jadwal Posyandu",
        icon: <Calendar size={20} />,
        path: "/jadwal",
      },
      {
        label: "Referensi WHO",
        icon: <BookOpen size={20} />,
        path: "/who-reference",
      }
    ];
  }

  // PARENT
  else if (role === "parent") {
    menus = [ {
      label: "Jadwal Posyandu",
      icon: <Calendar size={20} />,
      path: "/jadwal"
    },
    {
      label: "Referensi WHO",
      icon: <BookOpen size={20} />,
      path: "/who-reference",
    }  
  ];
  }

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
        onClick={() => setOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72
          bg-gray-100 p-5 flex flex-col justify-between
          z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* TOP */}
        <div>
          
        {/* CLOSE MOBILE */}
        <div className="md:hidden flex justify-end mb-2">
          <button onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

          {/* LOGO */}
          <div className="flex items-center gap-3 mb-8">
            <div className=" p-3 rounded-xl text-white bg-cyan-400">
              <Cross size={30}/>
            </div>

            <div>
              <h1 className="font-bold text-lg">
                Posyandu Bunga Asri
              </h1>

              <p className="text-sm text-gray-500">
                {role === "super_admin"
                  ? "Super Admin"
                  : role === "admin"
                  ? "Admin"
                  : "Parent"}
              </p>
            </div>
          </div>

          {/* MENU */}
          <nav className="space-y-2">
          <nav className="space-y-2">
            {menus.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition ${
                    isActive
                      ? "text-cyan-600 bg-white shadow font-medium"
                      : "text-gray-600 hover:bg-white"
                  }`
                }
              >
                {menu.icon}
                <span className="text-sm">{menu.label}</span>
              </NavLink>
            ))}

          {role === "parent" && (
            <div className="space-y-2">

              <div
                className="
                flex items-center gap-3
                bg-cyan-500 text-white
                rounded-xl p-3 font-medium
              "
              >
                <Baby size={18} />
                Profil Anak
              </div>

              {children.map((child) => {
                const active =
                  location.pathname ===
                  `/parent/anak/${child.id}`;

                return (
                  <NavLink
                    key={child.id}
                    to={`/parent/anak/${child.id}`}
                    onClick={() => setOpen(false)}
                    className={`
                      flex items-center gap-3
                      px-3 py-3 rounded-xl transition
                      ${
                        active
                          ? "bg-cyan-50 text-cyan-600 font-medium"
                          : "text-gray-600 hover:bg-white"
                      }
                    `}
                  >
                    <Baby size={18} />
                    {child.name}
                  </NavLink>
                );
              })}
            </div>
          )}
          </nav>
          </nav>
        </div>

        {/* PROFILE */}
        <div
          className="
          bg-white
          border
          rounded-xl
          p-4
          flex
          items-center
          justify-between
        "
        >
          <div className="flex items-center gap-3">


            <div>
              <h2 className="font-semibold text-sm">
                {user.name}
              </h2>
            </div>
          </div>

          <button onClick={handleLogout}>
            <LogOut
              size={18}
              className="
              cursor-pointer
              text-gray-500
              hover:text-red-500
            "
            />
          </button>
        </div>
      </div>
    </>
  );
}