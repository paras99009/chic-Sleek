// app/admin/page.tsx

import { useQuery } from "@tanstack/react-query";

import UserCard from "../components/UserCard";
import { Bookmark, MapPinHouse, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {  getDatabaseProduct } from "../lib/appwrite/api";
import { useUserContext } from "../context/AuthContext";
import { appwriteConfig, databases } from "../lib/appwrite/config";

function Admin() {
  const { user } = useUserContext();
  const isAdmin = user.email === "test1@gmail.com";
  const navigate = useNavigate();

  const { data: places } = useQuery({
    queryKey: ["Products"],
    queryFn: getDatabaseProduct,
  });

  const { data: users } = useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      const res = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId
      );
      return res.documents;
    },
  });

  const { data: savedDocs } = useQuery({
    queryKey: ["Saves"],
    queryFn: async () => {
      const res = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.savesCollectionId
      );
      return res.documents;
    },
  });

  return (
    <>
      {isAdmin ? (
        <div className="container-fluid bg-dark text-white min-vh-100 py-5">
          <h1 className="display-4 fw-bold mb-4">Admin Panel</h1>

          {/* Profile Section */}
          <div className="d-flex flex-wrap justify-content-between align-items-center bg-secondary p-4 rounded shadow mb-4 gap-4">
            <div className="d-flex align-items-center gap-4">
              <img
                src={user.imageUrl}
                alt="avatar"
                className="rounded-circle"
                width="80"
                height="80"
              />
              <div>
                <h4 className="fw-bold mb-1">Admin Name: {user.name}</h4>
                <p className="text-light mb-0">Email: {user.email}</p>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/create")}
            >
              + Create Place
            </button>
          </div>

          <hr className="border-light" />

          {/* Analytics Section */}
          <div className="row g-4">
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <User size={40} className="mb-2" />
                  <h2 className="text-primary">{users?.length || 0}</h2>
                  <p className="text-muted">Users</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <Bookmark size={40} className="mb-2" />
                  <h2 className="text-success">{savedDocs?.length || 0}</h2>
                  <p className="text-muted">Saved Documents</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <Link to="/" className="text-decoration-none text-reset">
                <div className="card text-center shadow-sm">
                  <div className="card-body">
                    <MapPinHouse size={40} className="mb-2" />
                    <h2 className="text-warning">
                      {places?.documents?.length || 0}
                    </h2>
                    <p className="text-muted">Products</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <hr className="border-light mt-5" />

          {/* Users List Section */}
          <div className="mt-4">
            <h2 className="fw-bold mb-3">Users List</h2>
            <div className="row g-4">
              {users?.map((user) => (
                <div className="col-xl-3" key={user.$id}>
                  <UserCard user={user} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <h1 className="display-4 fw-bold">Access Denied</h1>
          <p className="lead">You are not authorized to access this page</p>
        </div>
      )}
    </>
  );
}

export default Admin;
