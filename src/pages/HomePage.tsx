import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  Search,
  Link2,
  Zap,
  Shield,
  Smartphone,
  CheckCircle2,
  ArrowDownToLine,
  Sparkles,
  Loader2,
  Moon,
  Sun,
  Image,
  Globe,
  FileVideo,
  ChevronRight,
  Menu,
  X,
  BarChart3,
  Users,
  Award,
  Layers,
} from "lucide-react";
import { useTheme } from "next-themes";

interface VideoInfo {
  id: string;
  title: string;
  cover: string;
  author: string;
  duration: string;
  noWatermarkUrl: string;
  musicUrl: string;
}

const mockVideos: Record<string, VideoInfo> = {
  default: {
    id: "v_001",
    title: "超有趣的短视频内容分享",
    cover:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=640&h=360&fit=crop",
    author: "@创作者小明",
    duration: "00:32",
    noWatermarkUrl: "#",
    musicUrl: "#",
  },
};

function ParserSection() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [video, setVideo] = useState<VideoInfo | null>(null);

  const handleParse = useCallback(async () => {
    if (!url.trim()) {
      setError("请输入视频链接");
      return;
    }
    if (!url.startsWith("http")) {
      setError("请输入有效的链接地址");
      return;
    }
    setError("");
    setLoading(true);
    setVideo(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setVideo(mockVideos.default);
    setLoading(false);
  }, [url]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleParse();
  };

  const platforms = ["抖音", "快手", "小红书", "TikTok", "微博", "视频号"];

  return (
    <section className="w-full max-w-2xl mx-auto px-4">
      {/* 输入区域 */}
      <Card className="rounded-2xl border bg-card text-card-foreground shadow-lg shadow-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Link2 className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">粘贴链接解析</h3>
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
              <Input
                type="url"
                placeholder="请粘贴视频分享链接，如：https://v.douyin.com/xxxxx/"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                className="h-12 pr-10 text-[15px] pl-10 rounded-xl border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
              />
            </div>
            <Button
              onClick={handleParse}
              disabled={loading}
              size="lg"
              className="h-12 px-7 min-w-[110px] bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Search className="h-4.5 w-4.5 mr-1.5" />
                  解析
                </>
              )}
            </Button>
          </div>
          {error && (
            <div className="flex items-center gap-2 mt-3 text-destructive text-sm">
              <span>{error}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-5 text-xs text-muted-foreground">
            {platforms.map((platform) => (
              <span
                key={platform}
                className="px-2.5 py-1 bg-muted/50 rounded-md transition-colors hover:bg-muted"
              >
                {platform}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 加载状态 */}
      {loading && (
        <Card className="mt-6 rounded-2xl border bg-card text-card-foreground shadow-lg shadow-primary/5">
          <CardContent className="p-10 flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground text-[15px]">正在解析视频，请稍候...</p>
          </CardContent>
        </Card>
      )}

      {/* 解析结果 */}
      {video && !loading && (
        <Card className="mt-6 rounded-2xl border bg-card text-card-foreground shadow-lg shadow-primary/5 overflow-hidden">
          <CardContent className="p-0">
            {/* 封面图 */}
            <div className="relative group">
              <img
                src={video.cover}
                alt={video.title}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[20px] border-l-primary border-y-[12px] border-y-transparent ml-1" />
                </div>
              </div>
              <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-md">
                {video.duration}
              </span>
            </div>

            {/* 视频信息 */}
            <div className="p-6">
              <h3 className="text-[17px] font-semibold text-foreground mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-5">{video.author}</p>

              <div className="flex items-center gap-2 mb-5 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                解析成功
              </div>

              {/* 下载按钮 */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                  <Download className="h-4 w-4" />
                  下载无水印视频
                </Button>
                <Button variant="outline" className="flex-1 gap-2 rounded-xl">
                  <Image className="h-4 w-4" />
                  下载封面
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl">
                  <ArrowDownToLine className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "500万+", label: "累计解析", icon: BarChart3 },
    { value: "50+", label: "支持平台", icon: Layers },
    { value: "99.9%", label: "成功率", icon: Award },
    { value: "10万+", label: "日活用户", icon: Users },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-5 rounded-xl border bg-card/50 hover:bg-card transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-primary">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground mt-1.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "极速解析",
      desc: "毫秒级响应，粘贴链接即刻获取视频",
    },
    {
      icon: Shield,
      title: "安全无水印",
      desc: "去除平台水印，保留原始画质",
    },
    {
      icon: FileVideo,
      title: "多格式下载",
      desc: "支持 MP4、WEBM 等多种视频格式",
    },
    {
      icon: Globe,
      title: "全平台支持",
      desc: "抖音、快手、小红书等主流平台",
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            为什么选择轻解析？
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            专业、快速、安全的视频解析工具
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-7 rounded-2xl border bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2.5">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformsSection() {
  const platforms = [
    "抖音",
    "快手",
    "小红书",
    "微博",
    "视频号",
    "皮皮虾",
    "TikTok",
    "Instagram",
    "YouTube Shorts",
    "Twitter/X",
    "B站",
    "微视",
  ];

  return (
    <section id="platforms" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          支持50+主流平台
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
          支持抖音、快手、TikTok等50+平台，粘贴链接即可快速获取无水印高清视频
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {platforms.map((platform) => (
            <span
              key={platform}
              className="px-5 py-2.5 rounded-full bg-card border text-foreground font-medium text-[15px] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-default"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "复制链接",
      desc: "在短视频App中复制分享链接",
    },
    {
      step: "02",
      title: "粘贴解析",
      desc: "将链接粘贴到输入框，点击解析",
    },
    {
      step: "03",
      title: "下载保存",
      desc: "预览视频信息，一键下载无水印版本",
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            三步完成解析
          </h2>
          <p className="text-muted-foreground text-lg">
            简单操作，即刻获取无水印视频
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <div key={item.step} className="text-center relative">
              <div className="text-6xl font-black text-primary/10 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2.5">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">{item.desc}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-5 text-primary/20">
                  <ChevronRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppDownloadSection() {
  return (
    <section id="download" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-card rounded-2xl border p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 shadow-sm">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              下载App，体验更佳
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              批量解析、历史记录、后台下载，更多功能等你来发现
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                <Download className="h-5 w-5" />
                Android 下载
              </Button>
              <Button size="lg" variant="outline" className="gap-2 rounded-xl">
                <Download className="h-5 w-5" />
                iOS 下载
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-xl bg-primary flex items-center justify-center mb-3">
                  <Download className="h-10 w-10 text-primary-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">扫码下载App</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Download className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">轻解析</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              关于我们
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              使用条款
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              隐私政策
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              联系我们
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 轻解析. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Download className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">轻解析</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#parser"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              在线解析
            </a>
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              功能特点
            </a>
            <a
              href="#platforms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              支持平台
            </a>
            <a
              href="#download"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              下载App
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
              下载App
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-xl">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <a
                href="#parser"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                在线解析
              </a>
              <a
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                功能特点
              </a>
              <a
                href="#platforms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                支持平台
              </a>
              <a
                href="#download"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                下载App
              </a>
              <Button className="sm:hidden bg-primary hover:bg-primary/90 text-primary-foreground mt-2 rounded-xl">
                下载App
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 pt-20 pb-16 relative">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              免费 · 无水印 · 不限次数
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-muted-foreground mb-2">
              短视频无水印
            </h3>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              一键解析下载
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              支持抖音、快手、TikTok等50+平台，粘贴链接即可快速获取无水印高清视频
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <Button
                size="lg"
                className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 h-12 text-[15px]"
                onClick={() => {
                  document.getElementById("parser")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Search className="h-5 w-5" />
                立即解析
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-xl px-8 h-12 text-[15px]"
              >
                <Download className="h-5 w-5" />
                下载App
              </Button>
            </div>
          </div>

          {/* 数据统计 - 前置 */}
          <div className="mb-10">
            <StatsSection />
          </div>

          {/* 解析输入框 - 后置 */}
          <div id="parser">
            <ParserSection />
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* Platforms */}
      <PlatformsSection />

      {/* How it works */}
      <HowItWorksSection />

      {/* Download */}
      <AppDownloadSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
