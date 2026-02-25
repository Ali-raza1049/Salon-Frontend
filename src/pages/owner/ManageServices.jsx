// src/pages/admin/ManageServices.jsx
import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../../redux/slice/ServiceSlice";
import ServiceModal from "../../components/owner/ServiceModal";
import ConfirmationModal from "../../components/owner/ConfirmationModal";

const ManageServices = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleEdit = (service) => {
    setEditingService(service);
    setIsServiceModalOpen(true);
  };

  const handleDeleteClick = (service) => {
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
      dispatch(deleteService(serviceToDelete._id));
    }
    setIsDeleteModalOpen(false);
    setServiceToDelete(null);
  };

  const handleSaveService = (serviceData) => {
    if (editingService) {
      dispatch(updateService({ id: editingService._id, serviceData }));
    } else {
      dispatch(createService(serviceData));
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Service Menu
        </h2>

        <button
          onClick={() => {
            setEditingService(null);
            setIsServiceModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow w-full sm:w-auto"
        >
          <Plus size={18} /> Add Service
        </button>
      </div>

      {/* Loading & Error */}
      {loading && <p className="text-gray-500">Loading services...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Desktop Table */}
      {!loading && services.length > 0 && (
        <>
          {/* Table View (Desktop) */}
          <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="p-4">Service Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr
                    key={service._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">{service.name}</td>
                    <td className="p-4">{service.category}</td>
                    <td className="p-4">{service.duration}</td>
                    <td className="p-4 font-semibold text-yellow-600">
                      ${service.price}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(service)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">
                    {service.name}
                  </h3>
                  <span className="font-semibold text-yellow-600">
                    ${service.price}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Category:</span>{" "}
                  {service.category}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Duration:</span>{" "}
                  {service.duration}
                </p>

                <div className="flex justify-end gap-4 pt-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(service)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && services.length === 0 && (
        <p className="text-gray-500 mt-4 text-center">
          No services added yet.
        </p>
      )}

      {/* Modals */}
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => {
          setIsServiceModalOpen(false);
          setEditingService(null);
        }}
        onSave={handleSaveService}
        initialData={editingService}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${serviceToDelete?.name}"?`}
      />
    </div>
  );
};

export default ManageServices;