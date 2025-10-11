"use client";
import { InsightCard } from "@/components/insights/insights-card";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useRouter } from "next/navigation";
import { AnxietyGames } from "@/components/games/anxiety-games";
import { CBTQuiz } from "@/components/insights/cbt-form";
import { ActivityLogger } from "@/components/activities/activity-logger";
import { useSession } from "@/lib/contexts/session-context";
import { getInsightHistory } from "@/lib/api/insight";

// Type definitions (hanya yang dibutuhkan)
interface Insight {
  _id: string;
  userId: string;
  name: string;
  description: string;
  symptoms: string[];
  solution: string[];
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();
  const { user } = useSession();

  const [insights, setInsights] = useState<{
    name: string;
    description: string;
    symptoms: string[];
    solution: string[];
    timestamp: string | Date;
  }[]>([]);
  const [showActivityLogger, setShowActivityLogger] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Fetch CBT insights
  const loadCBTInsights = useCallback(async () => {
    try {
      const response = await getInsightHistory({ limit: 3 });
      const cbtInsights = response.data.map((insight: Insight) => ({
        name: insight.name,
        description: insight.description,
        symptoms: insight.symptoms,
        solution: insight.solution,
        timestamp: insight.timestamp,
      }));
      setInsights(cbtInsights);
    } catch (error) {
      console.error("Error loading CBT insights:", error);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (user?._id) {
      loadCBTInsights();
    }
  }, [user?._id, loadCBTInsights]);

  const handleStartTherapy = () => {
    router.push("/therapy/new");
  };

  const handleCBTQuiz = () => {
    setIsQuizOpen(true);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Container className="pt-20 pb-8 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold text-foreground">
              Selamat Datang, {user?.name || "teman"}
            </h1>
            <p className="text-muted-foreground">
              {currentTime.toLocaleDateString("id-ID", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
        </div>

        {/* Main Grid Layout */}
        <div className="space-y-6">
          {/* Top Cards Grid: Quick Actions (kiri) + Insight (tengah-kanan) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Quick Actions Card: Kiri (col-span-1) */}
            <Card className="border-primary/10 relative overflow-hidden col-span-1 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent" />
              <CardContent className="p-6 relative">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Aksi Cepat</h3>
                      <p className="text-sm text-muted-foreground">
                        Mulai perjalanan kesehatan Anda
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Button
                      variant="default"
                      className="w-full justify-between items-center p-6 h-auto group transition-all duration-200 hover:-translate-y-0.5 bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90"
                      onClick={handleStartTherapy}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-white">
                            Mulai Terapi
                          </div>
                          <div className="text-xs text-white/80">
                            Buat sesi baru
                          </div>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </Button>

                    <Button
                      variant="outline"
                      className="flex flex-col h-[120px] px-4 py-3 justify-center items-center text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50"
                      onClick={handleCBTQuiz}
                    >
                      <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
                        <BrainCircuit className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Isi CBT</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Mulai kuis kesehatan mental
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insight Card: Tengah dan Kanan (col-start-2 col-span-2) */}
            <div className="col-start-1 lg:col-start-2 lg:col-span-2">
              <InsightCard insights={insights} />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <AnxietyGames />
            </div>
          </div>
        </div>
      </Container>

      {/* CBT Quiz modal */}
      <CBTQuiz
        open={isQuizOpen}
        onClose={() => {
          setIsQuizOpen(false);
          loadCBTInsights(); // Refresh insights after quiz submission
        }}
      />

      <ActivityLogger
        open={showActivityLogger}
        onOpenChange={setShowActivityLogger}
        onActivityLogged={() => {
          // Jika ada log activity, bisa ditambahkan kembali jika dibutuhkan
        }}
      />
    </div>
  );
}