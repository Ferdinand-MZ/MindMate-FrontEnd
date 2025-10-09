"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Shield,
  Fingerprint,
  Activity,
  Bot,
  LineChart,
  Wifi,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: <Bot className="w-10 h-10 text-primary" />,
    title: "Teman Curhat AI",
    description:
      "Ngobrol dengan AI yang ramah kapan saja. AI ini dilatih khusus untuk membantumu menjaga kesehatan mental sesuai kebutuhanmu.",
  },
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: "Aman dan Terjamin",
    description:
      "Semua sesi terapi kamu aman dan rahasia. Ceritamu hanya untuk kamu dan tidak akan dibagikan ke siapa pun.",
  },
  {
    icon: <Brain className="w-10 h-10 text-primary" />,
    title: "Analisis Cerdas",
    description:
      "AI pintar kami bisa mengerti perasaanmu dan memberikan saran yang paling pas untuk membantumu merasa lebih baik.",
  },
  {
    icon: <Activity className="w-10 h-10 text-primary" />,
    title: "Bantuan Darurat",
    description:
      "Saat kamu dalam keadaan darurat, sistem kami akan langsung merespons untuk memastikan kamu tetap aman.",
  },
  ///{
  ///  icon: <Wifi className="w-10 h-10 text-primary" />,
  ///  title: "Integrasi IoT",
  ///  description:
  ///    "Terhubung dengan perangkat rumah pintar untuk menciptakan lingkungan terapeutik yang nyaman dan beradaptasi dengan kebutuhan Anda.",
  ///},
  {
    icon: <LineChart className="w-10 h-10 text-primary" />,
    title: "Lihat Perkembanganmu",
    description:
      "Pantau kemajuan kesehatan mentalmu dari waktu ke waktu melalui laporan yang jelas dan mudah dipahami.",
  },
  {
    icon: <Fingerprint className="w-10 h-10 text-primary" />,
    title: "Privasi Terjaga",
    description:
      "Datamu dijamin 100% rahasia. Dengan teknologi enkripsi canggih, hanya kamu yang bisa mengakses informasimu.",
  },
  ///{
  ///  icon: <Heart className="w-10 h-10 text-primary" />,
  ///  title: "Perawatan Holistik",
  ///  description:
  ///    "Integrasi dengan perangkat wearable dan penyedia layanan kesehatan untuk pemantauan kesehatan mental yang komprehensif.",
  ///},
];

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Fitur Unggulan Kami
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Lihat bagaimana aplikasi AI kami mengubah cara mendapatkan dukungan kesehatan mental, dengan teknologi canggih yang selalu menjaga privasimu.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mt-16"
      >
        <h2 className="text-2xl font-semibold mb-4">Siap Memulai?</h2>
        <p className="text-muted-foreground mb-8">
          Ayo gabung dengan ribuan orang lainnya yang sudah merasakan manfaat dukungan kesehatan mental dari AI kami.
        </p>
        <a
          href="/dashboard"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Mulai Sekarang
          <Heart className="ml-2 w-5 h-5" />
        </a>
      </motion.div>
    </div>
  );
}