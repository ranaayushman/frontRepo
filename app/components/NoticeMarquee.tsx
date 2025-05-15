"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoticeType } from "@/app/models/notice.model";

const NoticesMarquee: React.FC = () => {
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("/api/v1/notice");
        const data = response.data;
        console.log("Fetched notices:", data); // Debug log
        if (data.success && data.data) {
          setNotices(data.data);
          setError(null);
        } else {
          setError("Failed to fetch notices");
          setNotices([]);
        }
      } catch (e) {
        console.error("Error fetching notices:", e);
        setError("Failed to load notices");
        setNotices([]);
      }
    };
    fetchNotices();
  }, []);

  // Calculate total content length to decide duplication
  const totalLength = notices.reduce((sum, n) => sum + n.title.length, 0);
  const shouldDuplicate = notices.length > 2 || totalLength > 100; // Adjusted threshold

  return (
    <div className="flex items-center justify-center min-h-[20vh] py-4">
      <div
        className="w-full max-w-3xl text-[#140087] font-medium text-sm cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
        aria-label="View latest notices"
      >
        {notices.length > 0 ? (
          <div className="w-full overflow-hidden whitespace-nowrap">
            <div className="inline-block w-full animate-marquee">
              {notices.map((notice) => (
                <span key={notice._id} className="mx-8">
                  {notice.title}
                </span>
              ))}
              {shouldDuplicate &&
                notices.map((notice) => (
                  <span key={`${notice._id}-dup`} className="mx-8">
                    {notice.title}
                  </span>
                ))}
            </div>
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <p className="text-center text-gray-500">No notices available</p>
        )}
      </div>

      {/* Notice Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl w-full">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#140087]">
              Latest Notices
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              View all published notices.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto space-y-4">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <Card key={notice._id} className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#140087]">
                      {notice.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{notice.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Posted on: {new Date(notice.date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No notices available</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// CSS for Marquee Animation
const marqueeStyles = `
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  .animate-marquee {
    animation: marquee 20s linear infinite;
    display: inline-block;
  }
  .animate-marquee:hover {
    animation-play-state: paused;
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = marqueeStyles;
  document.head.appendChild(styleSheet);
}

export default NoticesMarquee;
