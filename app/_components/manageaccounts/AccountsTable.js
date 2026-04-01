"use client";

import { useState, useEffect } from "react";
import AccountRow from "./AccountRow";
import ConfirmModal from "../ConfirmModal";

/**
 * AccountsTable
 *
 * Fetches all staff accounts from the API and renders them in a paginated table
 * with columns for index, name, email, status, and edit/delete actions. Supports
 * live filtering by name or email via the search prop.
 *
 * @param {string} [search=""] - Filters displayed rows to those whose name or email
 *   contains the search term (case-insensitive)
 *
 * Notes:
 * - Staff are fetched once on mount from /auth/staff — the list is not refreshed automatically
 * - The fetch uses credentials: "include" for session-based auth; the request will fail if the
 *   user is unauthenticated
 * - Accounts are assigned a 1-based id from their array index at fetch time; id is used as the
 *   React key and passed to AccountRow as index - 1
 * - firstName and lastName are joined and trimmed; if both are absent the name falls back to "N/A"
 * - Deletion is optimistic — the account is removed from local state immediately on API success
 *   without re-fetching the full list
 * - Loading and error states render within the same container to avoid layout shift
 */
export default function AccountsTable({ search = "" }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("http://localhost:8000/auth/staff", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch staff data");
        }

        const data = await response.json();

        if (data.success && data.staff) {
          const formattedAccounts = data.staff.map((staff, index) => ({
            id: index + 1,
            name: `${staff.firstName} ${staff.lastName}`.trim() || "N/A",
            email: staff.email,
            role: staff.role,
            status: staff.active ? "Active" : "Inactive"
          }));
          setAccounts(formattedAccounts);
        }
      } catch (err) {
        console.error("Error fetching staff:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(search.toLowerCase()) ||
    account.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteClick = (account) => {
    setSelectedAccount(account);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAccount) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/delete-staff`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: selectedAccount.email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Failed to delete staff");
        return;
      }

      setAccounts((prev) =>
        prev.filter((acc) => acc.email !== selectedAccount.email)
      );

      setShowDeleteModal(false);
      setSelectedAccount(null);
      alert("Staff deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedAccount(null);
  };

  if (loading) {
    return (
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 max-h-96">
        <div className="flex items-center justify-center p-8">
          <p className="text-gray-600">Loading staff accounts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 max-h-96">
        <div className="flex items-center justify-center p-8">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 max-h-96">
        <table className="min-w-full divide-y table-fixed divide-gray-200">
          <thead className="sticky top-0 z-10" style={{ backgroundColor: "#F6F7F9" }}>
            <tr>
              <th className="px-6 py-3 text-left text-lg font-medium text-black">#</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-black">Name</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-black">Email</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-black">Status</th>
              <th className="px-6 py-3 text-left text-lg font-medium text-black">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
            {filteredAccounts.map((account) => (
              <AccountRow
                key={account.id}
                account={account}
                index={account.id - 1}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation modal — only mounted when an account is staged for deletion */}
      {showDeleteModal && selectedAccount && (
        <ConfirmModal
          title="Delete Staff"
          message={`Are you sure you want to delete ${selectedAccount.email}?`}
          confirmText="Delete"
          cancelText="Cancel"
          variant="danger"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}