//This component represents a single row within the accounts table.
//Accepts an `account` prop with id, name, email, status, role, etc.
//Optionally you could pass callbacks for edit/delete if needed in future.
import Link from "next/link";
import ConfirmModal from "../ConfirmModal";
import { useState } from "react";

export default function AccountRow({ account }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-black">{account.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-black">{account.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-black">{account.email}</td>
      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
        <span
          className="h-3 w-3 rounded-full"
          style={{ color: "text-black", backgroundColor: account.status === "Active" ? "#8dc075" : "#912932" }}
        >
        </span>
        <span className="text-black font-semi">{account.status}</span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap w-px">
        <Link href={`/admin/edit-staff/${account.id}`}>
          <button className="bg-[#005EB8] hover:bg-[#004080] text-white font-semibold px-4 py-2 mr-2.5 rounded-md transition-colors">
            Edit
          </button>
        </Link>
        
        <button className="bg-[#912932] hover:bg-[#8B1625] text-white font-semibold px-4 py-2 rounded-md transition-colors">
          Delete
        </button>
        {showConfirmModal && (
          <ConfirmModal
            title="Confirm Deletion"
            message="Are you sure you want to delete this account?"
            onConfirm={() => {
              // TODO: Implement delete functionality
              setShowConfirmModal(false);
            }}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}
      </td>
    </tr>
  );
}
