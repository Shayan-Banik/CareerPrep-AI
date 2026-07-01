// import { useState, useRef, useEffect } from "react";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// function ProfileMenu() {
//   const navigate = useNavigate();
//   const { handleLogout, user } = useAuth();
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);

//   console.log("user object:", user);
  
//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (ref.current && !ref.current.contains(e.target)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const onLogoutClick = async () => {
//     const success = await handleLogout();
//     if (success) {
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="fixed top-4 right-4 z-9999" ref={ref}>
//       <button
//         onClick={() => setOpen((prev) => !prev)}
//         className="bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 active:scale-[0.98]">
//         Profile
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-50 bg-white rounded-md shadow-lg border border-gray-200 py-5 px-2 z-50">
//           <div className="px-4 py-2 border-b border-gray-100">
//             <p className="text-sm font-medium text-gray-900">{user?.username}</p>
//             <p className="text-xs text-gray-500">{user?.email}</p>
//           </div>
//           <button
//             onClick={onLogoutClick}
//             className="w-full z-100 text-left px-4 py-2 mt-2 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200">
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProfileMenu;







import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function ProfileMenu() {
  const navigate = useNavigate();
  const { handleLogout, user } = useAuth();
  const [open, setOpen] = useState(false);
  //
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOpen = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
    }
    setOpen((prev) => !prev);
  };

  const onLogoutClick = async () => {
    const success = await handleLogout();
    if (success) navigate("/login");
  };

  return (
    <div className="fixed top-4 right-4 mb-10 z-9999">
      <button
        ref={btnRef}
        onClick={toggleOpen}
        className="bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 active:scale-[0.98]"
      >
        Profile
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{ top: coords.top, right: coords.right }}
            className="fixed w-50 bg-white rounded-md shadow-lg border border-gray-200 px-3 py-2 z-9999"
          >
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 mb-2">{user?.username}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>

            <button
              onClick={onLogoutClick}
              className="w-full z-100 text-left px-4 py-2 mt-2 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}

export default ProfileMenu;