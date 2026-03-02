"use client";

import { useEffect, useState } from "react";
import { getApiUrl } from "@/lib/api-url";

/**
 * Category keys returned by API
 * (DLT already normalized to Blockchain in API)
 */
type CategoryKey =
  | "AI"
  | "CS"
  | "Blockchain"
  | "ML"
  | "NS"
  | "DF"
  | "Cryptography"
  | "Steganography"
  | "Cloud Security"
  | "enterprise"
  | "software"
  | "internet"
  | "virtual";

interface ApiItem {
  category: CategoryKey;
  label: string;
  count: number;
}

interface Cluster extends ApiItem {
  x: number;
  y: number;
  color: string;
}

/**
 * Carefully spaced layout (no overlaps)
 */
const CLUSTER_LAYOUT: Record<
  CategoryKey,
  { x: number; y: number; color: string }
> = {
  AI: { x: 30, y: 22, color: "#3B82F6" },
  CS: { x: 65, y: 22, color: "#EF4444" },

  Blockchain: { x: 45, y: 52, color: "#10B981" },
  Cryptography: { x: 35, y: 78, color: "#14B8A6" },
  DF: { x: 60, y: 78, color: "#8B5CF6" },

  ML: { x: 22, y: 50, color: "#6366F1" },
  Steganography: { x: 18, y: 70, color: "#EC4899" },

  NS: { x: 78, y: 50, color: "#F97316" },
  "Cloud Security": { x: 70, y: 74, color: "#0EA5E9" },
  virtual: { x: 88, y: 56, color: "#475569" },

  enterprise: { x: 10, y: 26, color: "#6B7280" },
  internet: { x: 10, y: 46, color: "#94A3B8" },
  software: { x: 92, y: 26, color: "#64748B" },
};

export default function PatentLandscapeMap() {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLandscape() {
      try {
        const res = await fetch(getApiUrl('/patent-landscape'));


        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = (await res.json()) as ApiItem[];

        if (!Array.isArray(data)) {
          setClusters([]);
          return;
        }

        const mapped: Cluster[] = data
          .filter((item) => CLUSTER_LAYOUT[item.category])
          .map((item) => ({
            ...item,
            ...CLUSTER_LAYOUT[item.category],
          }));

        setClusters(mapped);
      } catch (error) {
        console.error("Failed to load patent landscape:", error);
        setClusters([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLandscape();
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-gray-500">
        Loading patent landscape…
      </div>
    );
  }

  if (clusters.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No patent landscape data available
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[420px] rounded-xl border overflow-hidden"
      style={{
        backgroundColor: "#f8fafc",
        backgroundImage:
          "radial-gradient(#cbd5e1 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      {clusters.map((cluster) => {
        const size = Math.max(
          72,
          Math.min(Math.sqrt(cluster.count) * 28, 150)
        );

        return (
          <div
            key={cluster.category}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
            style={{
              left: `${cluster.x}%`,
              top: `${cluster.y}%`,
              width: size,
              height: size,
              backgroundColor: cluster.color,
              color: "white",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              border: "2px solid rgba(255,255,255,0.6)",
            }}
          >
            <div className="flex flex-col items-center justify-center text-center px-3 w-full h-full">
              <div
                className="font-semibold leading-tight text-[11px] sm:text-xs break-words"
                style={{ maxWidth: "90%", lineHeight: "1.2" }}
              >
                {cluster.label}
              </div>

              <div className="mt-1 text-base sm:text-lg font-bold">
                {cluster.count}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
