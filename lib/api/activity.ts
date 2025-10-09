interface ActivityEntry {
  type: string; 
  name: string;
  description?: string;
  duration?: number;
}

export async function logActivity(
  data: ActivityEntry
): Promise<{ success: boolean; data: any }> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await fetch("/api/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to log activity");
  }

  return response.json();
}

interface ActivityListResponse {
  activities: ActivityEntry[];
}

export async function getAllActivities(): Promise<{ success: boolean; data: ActivityListResponse | ActivityEntry[] }> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  // Menggunakan method: "GET" untuk mengambil data
  const response = await fetch("/api/activity", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // GET request umumnya tidak memiliki body
  });

  if (!response.ok) {
    // Menangani error jika response tidak OK (misalnya 4xx atau 5xx)
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch activities");
  }

  // Mengembalikan data JSON dari response
  return response.json();
}

// api.ts / lib helper
export async function fetchTotalActivitiesAPI() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await fetch("/api/activity", {  // <- sesuaikan endpoint GET
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Failed to fetch total activities");
  }

  const data = await response.json();

  // Pastikan backend kirim data totalActivities
  return Array.isArray(data) ? data.length : data.totalActivities || 0;
}





