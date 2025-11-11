"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Mail, Building, Calendar, User } from "lucide-react";

interface AccessRequest {
  id: number;
  name: string;
  email: string;
  organization: string | null;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  reviewedAt: string | null;
  reviewNotes: string | null;
}

export default function AccessRequestsPage() {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState<number | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [tempPassword, setTempPassword] = useState("");
  const [reviewNotes, setReviewNotes] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/admin/access-requests");

      if (response.status === 403) {
        setError("Access denied. Super admin privileges required.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await response.json();
      setRequests(data.requests);
      setError("");
    } catch (err) {
      setError("Failed to load access requests");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: number) => {
    if (!tempPassword) {
      alert("Please enter a temporary password");
      return;
    }

    if (tempPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    setProcessing(requestId);
    try {
      const response = await fetch("/api/admin/access-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          action: "approve",
          tempPassword,
          reviewNotes: reviewNotes || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to approve request");
      }

      alert(`Request approved! User can now login with:\nEmail: ${requests.find(r => r.id === requestId)?.email}\nPassword: ${tempPassword}`);
      setSelectedRequest(null);
      setTempPassword("");
      setReviewNotes("");
      await fetchRequests();
    } catch (err: any) {
      alert(err.message || "Failed to approve request");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (requestId: number) => {
    const notes = prompt("Optional: Enter a reason for rejection:");
    
    setProcessing(requestId);
    try {
      const response = await fetch("/api/admin/access-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          action: "reject",
          reviewNotes: notes || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reject request");
      }

      await fetchRequests();
    } catch (err) {
      alert("Failed to reject request");
    } finally {
      setProcessing(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-500 text-white",
      approved: "bg-green-500 text-white",
      rejected: "bg-red-500 text-white",
    };

    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center">
          <div className="text-gray-600">Loading requests...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
            <Button onClick={() => router.push("/admin")} className="mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const reviewedRequests = requests.filter((r) => r.status !== "pending");

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Access Requests</h1>
        <p className="text-gray-600 mt-2">
          Review and approve or reject admin access requests
        </p>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              Pending Requests ({pendingRequests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{request.name}</h3>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {request.email}
                        </div>
                        {request.organization && (
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            {request.organization}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Requested: {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Reason:</p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {request.reason}
                    </p>
                  </div>

                  {selectedRequest === request.id ? (
                    <div className="space-y-3 border-t pt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Temporary Password *
                        </label>
                        <Input
                          type="text"
                          value={tempPassword}
                          onChange={(e) => setTempPassword(e.target.value)}
                          placeholder="Enter temporary password (min 8 characters)"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notes (optional)
                        </label>
                        <textarea
                          value={reviewNotes}
                          onChange={(e) => setReviewNotes(e.target.value)}
                          placeholder="Add any notes about this approval..."
                          className="w-full min-h-[80px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(request.id)}
                          disabled={processing === request.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Confirm Approval
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedRequest(null);
                            setTempPassword("");
                            setReviewNotes("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedRequest(request.id)}
                        disabled={processing === request.id}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleReject(request.id)}
                        disabled={processing === request.id}
                        className="text-red-600 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviewed Requests */}
      {reviewedRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Reviewed Requests ({reviewedRequests.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reviewedRequests.map((request) => (
                <div
                  key={request.id}
                  className="border rounded-lg p-3 bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{request.name}</span>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm text-gray-600">{request.email}</p>
                      {request.reviewedAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          Reviewed: {new Date(request.reviewedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {requests.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            No access requests yet
          </CardContent>
        </Card>
      )}
    </div>
  );
}
